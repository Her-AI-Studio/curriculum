import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { loadPlantsMeta, findMeta } from './plants-meta.js'
import { setCurrentPlant, clearCurrentPlant } from './state.js'
import { captureVideoFrameDataUrl, sourceToFrameTensor, blobToFrameTensor } from './capture.js'
import { VideoRecorder } from './video-recorder.js'
import {
  addEntry,
  clearAllEntries,
  deleteEntry,
  renderGallery,
  renderEntryDetail,
  getEntry,
} from './journal.js'
import { initCareAssistant, populateCarePlantSelect, updateOllamaStatus, syncCareFromPlant } from './care-assistant.js'
import { getOllamaConfig } from './ollama.js'

const $ = (id) => document.getElementById(id)

const video = $('video')
const statusEl = $('status')
const identifyStatusEl = $('identify-status')
const classNameInput = $('class-name')
const classSelect = $('class-select')
const sampleCountsEl = $('sample-counts')
const resultEl = $('result')
const resultLabel = $('result-label')
const resultConf = $('result-conf')

let mobileNetModel = null
let classifier = null
let classIndexMap = []
let liveLoopId = null
let lastIdentification = null
let selectedJournalId = null
const videoRecorder = new VideoRecorder()
/** @type {Blob | null} */
let recordedVideoBlob = null

const classes = []
const samples = []

async function initCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment', width: 280, height: 280 },
    audio: false,
  })
  video.srcObject = stream
  await video.play()
}

async function loadMobileNet() {
  statusEl.textContent = 'Loading MobileNet…'
  mobileNetModel = await mobilenet.load({ version: 2, alpha: 0.5 })
  statusEl.textContent = 'Ready. Add classes, capture samples, then train.'
  $('btn-capture').disabled = false
}

function getFrameTensor() {
  return sourceToFrameTensor(video)
}

function addEmbeddingSample(classId, embedding) {
  samples.push({ classId, embedding: embedding.clone() })
}

async function importFrameBlobs(frameBlobs, classId, onProgress) {
  if (!mobileNetModel || !classId) return 0

  let added = 0
  for (let i = 0; i < frameBlobs.length; i++) {
    onProgress?.(`Embedding frame ${i + 1} / ${frameBlobs.length}…`)
    const frame = await blobToFrameTensor(frameBlobs[i])
    const embedding = mobileNetModel.infer(frame, true)
    frame.dispose()
    addEmbeddingSample(classId, embedding)
    embedding.dispose()
    added++
  }
  updateCounts()
  return added
}

function syncCarePlantList() {
  populateCarePlantSelect(classes.map((c) => c.name))
}

function updateClassSelect() {
  classSelect.innerHTML = ''
  if (classes.length === 0) {
    classSelect.disabled = true
    const opt = document.createElement('option')
    opt.value = ''
    opt.textContent = 'Add a class first'
    classSelect.append(opt)
    syncCarePlantList()
    updateVideoUi()
    return
  }
  classSelect.disabled = false
  for (const c of classes) {
    const opt = document.createElement('option')
    opt.value = c.classId
    opt.textContent = c.name
    classSelect.append(opt)
  }
  syncCarePlantList()
  updateVideoUi()
}

function updateCounts() {
  if (classes.length === 0) {
    sampleCountsEl.textContent = 'No classes yet.'
    $('btn-train').disabled = true
    return
  }
  const ul = document.createElement('ul')
  for (const c of classes) {
    const count = samples.filter((s) => s.classId === c.classId).length
    const li = document.createElement('li')
    li.textContent = `${c.name}: ${count} samples`
    ul.append(li)
  }
  sampleCountsEl.innerHTML = ''
  sampleCountsEl.append(ul)

  const canTrain =
    classes.length >= 2 &&
    classes.every((c) => samples.filter((s) => s.classId === c.classId).length >= 3)
  $('btn-train').disabled = !canTrain
}

function addClass() {
  const name = classNameInput.value.trim()
  if (!name) return
  const classId = `class_${Date.now()}`
  classes.push({ classId, name })
  classNameInput.value = ''
  updateClassSelect()
  classSelect.value = classId
  updateCounts()
}

function captureSample() {
  if (!mobileNetModel || !classSelect.value) return
  const frame = getFrameTensor()
  const embedding = mobileNetModel.infer(frame, true)
  frame.dispose()
  addEmbeddingSample(classSelect.value, embedding)
  embedding.dispose()
  updateCounts()
  statusEl.textContent = `Captured sample for "${classes.find((c) => c.classId === classSelect.value)?.name}".`
}

function updateVideoUi() {
  const hasVideo = Boolean(recordedVideoBlob)
  $('btn-extract-frames').disabled = !hasVideo || !classSelect.value || !mobileNetModel
  $('video-preview-wrap').hidden = !hasVideo
  if (hasVideo && recordedVideoBlob) {
    const preview = $('video-preview')
    if (preview.src && preview.src.startsWith('blob:')) {
      URL.revokeObjectURL(preview.src)
    }
    preview.src = URL.createObjectURL(recordedVideoBlob)
  }
}

async function toggleRecordVideo() {
  const btn = $('btn-record-video')
  if (videoRecorder.isRecording) {
    btn.disabled = true
    statusEl.textContent = 'Stopping recording…'
    try {
      recordedVideoBlob = await videoRecorder.stop()
      btn.textContent = 'Record video'
      btn.classList.remove('btn--danger')
      statusEl.textContent = `Recorded ${Math.round(recordedVideoBlob.size / 1024)} KB. Extract frames to add training samples.`
      updateVideoUi()
    } catch (err) {
      statusEl.textContent = `Recording failed: ${err.message}`
    } finally {
      btn.disabled = false
    }
    return
  }

  if (!video.srcObject) {
    statusEl.textContent = 'Camera is not ready.'
    return
  }

  try {
    videoRecorder.start(video.srcObject)
    btn.textContent = 'Stop recording'
    btn.classList.add('btn--danger')
    statusEl.textContent = 'Recording… Move slowly around your potted plant, then stop.'
  } catch (err) {
    statusEl.textContent = `Could not start recording: ${err.message}`
  }
}

async function handleVideoUpload(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return

  recordedVideoBlob = file
  statusEl.textContent = `Loaded "${file.name}". Extract frames to add training samples.`
  updateVideoUi()
}

async function extractAndImportFrames() {
  if (!recordedVideoBlob || !classSelect.value || !mobileNetModel) return

  const fps = Math.max(0.25, Number($('frame-fps').value) || 1)
  const maxFrames = Math.min(120, Math.max(3, Number($('frame-max').value) || 30))
  const classId = classSelect.value
  const className = classes.find((c) => c.classId === classId)?.name ?? 'class'

  $('btn-extract-frames').disabled = true
  $('btn-record-video').disabled = true
  $('btn-import-images').disabled = true

  try {
    statusEl.textContent = 'Loading ffmpeg and extracting frames…'
    const { extractFrames } = await import('./ffmpeg-frames.js')
    const frames = await extractFrames(recordedVideoBlob, {
      fps,
      maxFrames,
      onProgress: (msg) => {
        statusEl.textContent = msg
      },
    })

    if (frames.length === 0) {
      statusEl.textContent = 'No frames extracted. Try a longer video or lower fps.'
      return
    }

    const added = await importFrameBlobs(frames, classId, (msg) => {
      statusEl.textContent = msg
    })
    statusEl.textContent = `Added ${added} sample(s) for "${className}" from video frames.`
  } catch (err) {
    statusEl.textContent = `Frame extraction failed: ${err.message}`
    console.error(err)
  } finally {
    $('btn-record-video').disabled = false
    $('btn-import-images').disabled = false
    updateVideoUi()
  }
}

async function handleImageUpload(event) {
  const files = [...(event.target.files ?? [])].filter((f) => f.type.startsWith('image/'))
  event.target.value = ''
  if (files.length === 0 || !classSelect.value || !mobileNetModel) return

  const classId = classSelect.value
  const className = classes.find((c) => c.classId === classId)?.name ?? 'class'

  $('btn-import-images').disabled = true
  try {
    const added = await importFrameBlobs(files, classId, (msg) => {
      statusEl.textContent = msg
    })
    statusEl.textContent = `Added ${added} sample(s) for "${className}" from uploaded images.`
  } catch (err) {
    statusEl.textContent = `Image import failed: ${err.message}`
    console.error(err)
  } finally {
    $('btn-import-images').disabled = false
  }
}

function clearSamples() {
  for (const s of samples) s.embedding.dispose()
  samples.length = 0
  if (classifier) {
    classifier.dispose()
    classifier = null
  }
  classIndexMap = []
  lastIdentification = null
  clearCurrentPlant()
  $('btn-identify').disabled = true
  $('btn-identify-loop').disabled = true
  $('btn-save-journal').disabled = true
  updateCounts()
  statusEl.textContent = 'Samples cleared.'
  updateVideoUi()
}

async function trainModel() {
  if (classes.length < 2) return

  $('btn-train').disabled = true
  statusEl.textContent = 'Training…'

  classIndexMap = classes.map((c) => c.classId)
  const numClasses = classIndexMap.length
  const xsList = []
  const ysList = []

  for (const s of samples) {
    const idx = classIndexMap.indexOf(s.classId)
    if (idx < 0) continue
    xsList.push(s.embedding.squeeze([0]))
    ysList.push(idx)
  }

  const xs = tf.stack(xsList)
  const ys = tf.oneHot(tf.tensor1d(ysList, 'int32'), numClasses)

  if (classifier) classifier.dispose()

  classifier = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [xs.shape[1]], units: 64, activation: 'relu' }),
      tf.layers.dropout({ rate: 0.2 }),
      tf.layers.dense({ units: numClasses, activation: 'softmax' }),
    ],
  })

  classifier.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'categoricalCrossentropy',
  })

  await classifier.fit(xs, ys, {
    epochs: 25,
    batchSize: Math.min(16, xs.shape[0]),
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch) => {
        statusEl.textContent = `Training… epoch ${epoch + 1} / 25`
      },
    },
  })

  xs.dispose()
  ys.dispose()

  statusEl.textContent = 'Model trained. Go to Identify.'
  $('btn-identify').disabled = false
  $('btn-identify-loop').disabled = false
  updateCounts()
}

async function identifyOnce() {
  if (!classifier || !mobileNetModel) return null

  const frame = getFrameTensor()
  const embedding = mobileNetModel.infer(frame, true)
  frame.dispose()

  const pred = classifier.predict(embedding)
  const probs = await pred.data()
  pred.dispose()
  embedding.dispose()

  let bestIdx = 0
  let bestProb = probs[0]
  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > bestProb) {
      bestProb = probs[i]
      bestIdx = i
    }
  }

  const className = classes.find((c) => c.classId === classIndexMap[bestIdx])?.name ?? 'Unknown'
  const pct = Math.round(bestProb * 100)

  resultEl.hidden = false
  resultLabel.textContent = className
  resultConf.textContent = `${pct}% confidence`

  const meta = findMeta(className)

  lastIdentification = { className, pct, meta }
  setCurrentPlant(className, meta, pct)
  $('btn-save-journal').disabled = false

  return lastIdentification
}

function refreshJournalUi() {
  const gallery = $('journal-gallery')
  if (!gallery) return
  renderGallery(gallery, selectJournalEntry, selectedJournalId)
  const entry = selectedJournalId ? getEntry(selectedJournalId) : null
  renderEntryDetail($('journal-detail'), entry)
  if ($('btn-delete-entry')) $('btn-delete-entry').disabled = !entry
}

function selectJournalEntry(entry) {
  selectedJournalId = entry.id
  refreshJournalUi()
  const meta = findMeta(entry.plantName)
  syncCareFromPlant({ name: entry.plantName, meta, confidence: entry.confidence })
}

async function saveToJournal() {
  if (!lastIdentification) {
    identifyStatusEl.textContent = 'Identify a plant first.'
    return
  }
  $('btn-save-journal').disabled = true
  try {
    const imageDataUrl = captureVideoFrameDataUrl(video)
    const note = $('journal-note')?.value ?? ''
    const entry = addEntry({
      plantName: lastIdentification.className,
      confidence: lastIdentification.pct,
      imageDataUrl,
      note,
    })
    if ($('journal-note')) $('journal-note').value = ''
    identifyStatusEl.textContent = `Saved "${entry.plantName}" to your journal.`
    selectedJournalId = entry.id
    refreshJournalUi()
    syncCareFromPlant({
      name: entry.plantName,
      meta: lastIdentification.meta,
      confidence: entry.confidence,
    })
  } catch (err) {
    identifyStatusEl.textContent = `Could not save: ${err.message}`
    console.error(err)
  } finally {
    $('btn-save-journal').disabled = false
  }
}

function deleteSelectedEntry() {
  if (!selectedJournalId) return
  if (!confirm('Delete this journal entry?')) return
  deleteEntry(selectedJournalId)
  selectedJournalId = null
  refreshJournalUi()
  $('care-card').textContent = 'Select a journal entry or plant to see care tips.'
  $('care-plant-display').textContent = '—'
}

function clearJournal() {
  if (!confirm('Clear all journal entries? This cannot be undone.')) return
  clearAllEntries()
  selectedJournalId = null
  refreshJournalUi()
  $('care-card').textContent = 'Select a journal entry or plant to see care tips.'
  $('care-plant-display').textContent = '—'
}

function stopLiveLoop() {
  if (liveLoopId != null) {
    cancelAnimationFrame(liveLoopId)
    liveLoopId = null
  }
  $('btn-identify-loop').textContent = 'Live identify'
}

function toggleLiveIdentify() {
  if (liveLoopId != null) {
    stopLiveLoop()
    return
  }
  $('btn-identify-loop').textContent = 'Stop live'
  let lastRun = 0
  const tick = async (t) => {
    if (liveLoopId == null) return
    if (t - lastRun > 500) {
      lastRun = t
      await identifyOnce()
    }
    liveLoopId = requestAnimationFrame(tick)
  }
  liveLoopId = requestAnimationFrame(tick)
}

function setupTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const name = tab.dataset.tab
      document.querySelectorAll('.tab').forEach((t) => {
        t.classList.toggle('is-active', t === tab)
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false')
      })
      $('panel-train').hidden = name !== 'train'
      $('panel-identify').hidden = name !== 'identify'
      $('panel-journal').hidden = name !== 'journal'
      if (name !== 'identify') stopLiveLoop()
      if (name === 'journal') {
        updateOllamaStatus()
        refreshJournalUi()
      }
    })
  })
}

function initOllamaInputs() {
  const { baseUrl, model } = getOllamaConfig()
  const baseEl = $('ollama-base')
  const modelEl = $('ollama-model')
  if (baseEl) baseEl.value = baseUrl
  if (modelEl) modelEl.value = model
}

$('btn-add-class').addEventListener('click', addClass)
classNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addClass()
})
$('btn-capture').addEventListener('click', captureSample)
$('btn-train').addEventListener('click', () =>
  trainModel().catch((err) => {
    statusEl.textContent = `Training failed: ${err.message}`
    console.error(err)
  }),
)
$('btn-clear').addEventListener('click', clearSamples)
$('btn-record-video')?.addEventListener('click', () => toggleRecordVideo().catch(console.error))
$('btn-extract-frames')?.addEventListener('click', () => extractAndImportFrames().catch(console.error))
$('video-upload')?.addEventListener('change', (e) => handleVideoUpload(e).catch(console.error))
$('image-upload')?.addEventListener('change', (e) => handleImageUpload(e).catch(console.error))
classSelect.addEventListener('change', updateVideoUi)
$('btn-identify').addEventListener('click', () => identifyOnce().catch(console.error))
$('btn-identify-loop').addEventListener('click', toggleLiveIdentify)
$('btn-save-journal').addEventListener('click', () => saveToJournal())
$('btn-delete-entry')?.addEventListener('click', deleteSelectedEntry)
$('btn-clear-journal')?.addEventListener('click', clearJournal)

setupTabs()
initCareAssistant()
initOllamaInputs()

;(async () => {
  try {
    await loadPlantsMeta()
    await initCamera()
    await loadMobileNet()
    updateCounts()
    refreshJournalUi()
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}. Camera access is required.`
    console.error(err)
  }
})()
