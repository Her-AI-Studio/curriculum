import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const CORE_VERSION = '0.12.6'
const CORE_BASE = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/esm`

/** @type {FFmpeg | null} */
let ffmpeg = null

/**
 * Load ffmpeg.wasm once (downloads ~25 MB on first use).
 * @param {(message: string) => void} [onProgress]
 */
export async function loadFfmpeg(onProgress) {
  if (ffmpeg?.loaded) return ffmpeg

  ffmpeg = new FFmpeg()
  ffmpeg.on('log', ({ message }) => {
    if (onProgress) onProgress(message)
  })

  onProgress?.('Loading ffmpeg…')

  await ffmpeg.load({
    coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, 'application/wasm'),
  })

  onProgress?.('ffmpeg ready.')
  return ffmpeg
}

/**
 * Extract JPEG frames from a video blob at the given fps.
 * @param {Blob} videoBlob
 * @param {{ fps?: number, maxFrames?: number, onProgress?: (message: string) => void }} [options]
 * @returns {Promise<Blob[]>}
 */
export async function extractFrames(videoBlob, options = {}) {
  const { fps = 1, maxFrames = 60, onProgress } = options
  const ff = await loadFfmpeg(onProgress)

  const ext = videoBlob.type.includes('mp4') ? 'mp4' : 'webm'
  const inputName = `input.${ext}`

  for (const entry of await ff.listDir('.')) {
    if (!entry.isDir && entry.name !== '.') {
      await ff.deleteFile(entry.name)
    }
  }

  onProgress?.('Writing video to ffmpeg…')
  await ff.writeFile(inputName, await fetchFile(videoBlob))

  onProgress?.(`Extracting ${fps} frame(s) per second…`)
  await ff.exec([
    '-i',
    inputName,
    '-vf',
    `fps=${fps}`,
    '-frames:v',
    String(maxFrames),
    '-q:v',
    '2',
    'frame_%04d.jpg',
  ])

  const entries = await ff.listDir('.')
  const frameNames = entries
    .filter((e) => !e.isDir && /^frame_\d+\.jpg$/.test(e.name))
    .map((e) => e.name)
    .sort()

  onProgress?.(`Read ${frameNames.length} frame(s).`)

  const frames = []
  for (const name of frameNames) {
    const data = await ff.readFile(name)
    frames.push(new Blob([data], { type: 'image/jpeg' }))
    await ff.deleteFile(name)
  }

  await ff.deleteFile(inputName)
  return frames
}
