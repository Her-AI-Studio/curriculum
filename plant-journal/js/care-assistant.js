import { currentPlant } from './state.js'
import { findMeta } from './plants-meta.js'
import { checkOllama, ollamaGenerate, getOllamaConfig, saveOllamaConfig } from './ollama.js'

let carePlantName = null
let careMeta = null
let ollamaOnline = false

const $ = (id) => document.getElementById(id)

export function initCareAssistant() {
  $('btn-care-refresh')?.addEventListener('click', () => refreshCareCard(false))
  $('btn-care-llm')?.addEventListener('click', () => refreshCareCard(true))
  $('btn-care-ask')?.addEventListener('click', () => askCareQuestion())
  $('care-question')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') askCareQuestion()
  })

  document.querySelectorAll('[data-care-chip]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.careChip
      if ($('care-question')) $('care-question').value = q
      askCareQuestion(q)
    })
  })

  $('btn-save-ollama')?.addEventListener('click', () => {
    saveOllamaConfig($('ollama-base')?.value, $('ollama-model')?.value)
    updateOllamaStatus()
  })

  window.addEventListener('plant-identified', (e) => {
    syncCareFromPlant(e.detail)
  })

  $('care-plant-select')?.addEventListener('change', () => {
    const name = $('care-plant-select').value
    if (name) syncCareFromPlant({ name, meta: findMeta(name), confidence: 0 })
  })

  updateOllamaStatus()
  if (currentPlant) syncCareFromPlant(currentPlant)
}

export function syncCareFromPlant({ name, meta }) {
  carePlantName = name
  careMeta = meta
  if ($('care-plant-select') && name) $('care-plant-select').value = name
  if ($('care-plant-display')) $('care-plant-display').textContent = name
  renderTemplateCareCard(meta)
  if ($('care-messages')) $('care-messages').innerHTML = ''
  appendCareMessage(
    'assistant',
    `Tips for your ${name}. Ask a question below, or generate a richer care card with Ollama.`,
  )
}

export function populateCarePlantSelect(classNames) {
  const sel = $('care-plant-select')
  if (!sel) return
  const current = sel.value
  sel.innerHTML = '<option value="">Choose a plant…</option>'
  for (const name of classNames) {
    const opt = document.createElement('option')
    opt.value = name
    opt.textContent = name
    sel.append(opt)
  }
  if (current && classNames.includes(current)) sel.value = current
}

function renderTemplateCareCard(meta) {
  const card = $('care-card')
  if (!card) return
  const mistakes = (meta.mistakes || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('')
  card.innerHTML = `
    <p>${escapeHtml(meta.tip || '')}</p>
    <dl class="care-dl">
      <dt>Watering</dt><dd>${escapeHtml(meta.watering || 'See general plant guides.')}</dd>
      <dt>Light</dt><dd>${escapeHtml(meta.light || '')}</dd>
    </dl>
    ${mistakes ? `<p class="care-card__sub">Watch out for:</p><ul>${mistakes}</ul>` : ''}
    ${meta.funFact ? `<p class="care-card__fact">${escapeHtml(meta.funFact)}</p>` : ''}
  `
}

function buildCareCardPrompt(name, meta) {
  return `You are a friendly plant care coach for students grades 6-12.
Write a short care card for a houseplant or garden plant. Use simple sentences. No markdown.

Plant: ${name}
Facts:
- Tip: ${meta.tip}
- Watering: ${meta.watering}
- Light: ${meta.light}
- Common mistakes: ${(meta.mistakes || []).join('; ')}

Format exactly with these headings on their own line:
WATERING:
LIGHT:
WATCH OUT:
FUN FACT:
Keep each section 1-2 sentences.`
}

function parseCareCardResponse(text) {
  const sections = { watering: '', light: '', watchOut: '', funFact: '' }
  const keys = [
    ['WATERING:', 'watering'],
    ['LIGHT:', 'light'],
    ['WATCH OUT:', 'watchOut'],
    ['FUN FACT:', 'funFact'],
  ]
  let rest = text
  for (const [label, key] of keys) {
    const idx = rest.indexOf(label)
    if (idx >= 0) {
      const after = rest.slice(idx + label.length)
      const nextLabel = keys.find(([l]) => after.includes(l))
      const end = nextLabel ? after.indexOf(nextLabel[0]) : after.length
      sections[key] = after.slice(0, end > 0 ? end : undefined).trim()
      rest = after
    }
  }
  if (!sections.watering && !sections.light) return null
  return sections
}

function renderLlmCareCard(sections) {
  const card = $('care-card')
  if (!card) return
  card.innerHTML = `
    <p class="care-card__badge">Generated with local Ollama</p>
    <dl class="care-dl">
      <dt>Watering</dt><dd>${escapeHtml(sections.watering)}</dd>
      <dt>Light</dt><dd>${escapeHtml(sections.light)}</dd>
    </dl>
    ${sections.watchOut ? `<p class="care-card__sub">Watch out for:</p><p>${escapeHtml(sections.watchOut)}</p>` : ''}
    ${sections.funFact ? `<p class="care-card__fact">${escapeHtml(sections.funFact)}</p>` : ''}
  `
}

async function updateOllamaStatus() {
  const el = $('ollama-status')
  if (!el) return
  ollamaOnline = await checkOllama()
  el.textContent = ollamaOnline
    ? 'Ollama connected. You can generate AI care cards.'
    : 'Ollama not detected. Using built-in care cards. Run: ollama serve'
  el.classList.toggle('is-online', ollamaOnline)
  if ($('btn-care-llm')) $('btn-care-llm').disabled = !ollamaOnline
}

export async function refreshCareCard(useLlm = false) {
  if (!carePlantName || !careMeta) {
    appendCareMessage('assistant', 'Identify or select a plant first.')
    return
  }
  if (!useLlm || !ollamaOnline) {
    renderTemplateCareCard(careMeta)
    return
  }
  const btn = $('btn-care-llm')
  if (btn) btn.disabled = true
  appendCareMessage('assistant', 'Writing your care card with Ollama…')
  try {
    const text = await ollamaGenerate(buildCareCardPrompt(carePlantName, careMeta))
    const parsed = parseCareCardResponse(text)
    if (parsed) renderLlmCareCard(parsed)
    else {
      $('care-card').innerHTML = `<p class="care-card__badge">Ollama</p><p>${escapeHtml(text)}</p>`
    }
    appendCareMessage('assistant', 'Care card updated.')
  } catch (err) {
    appendCareMessage('assistant', `Could not reach Ollama: ${err.message}`)
    renderTemplateCareCard(careMeta)
  } finally {
    if (btn) btn.disabled = !ollamaOnline
  }
}

function answerFromTemplate(question, meta, plantName) {
  const q = question.toLowerCase()
  if (q.includes('water')) return meta.watering
  if (q.includes('light') || q.includes('sun')) return meta.light
  if (q.includes('tip') || q.includes('care')) return meta.tip
  if (q.includes('mistake') || q.includes('wrong'))
    return `Common mistakes: ${(meta.mistakes || []).join(', ')}.`
  return `${meta.tip} For watering: ${meta.watering} For light: ${meta.light}`
}

function buildChatPrompt(question, name, meta) {
  return `You are a friendly plant care coach for students. Answer in 2-3 short sentences. No markdown.

Plant: ${name}
Watering: ${meta.watering}
Light: ${meta.light}
Tip: ${meta.tip}

Student question: ${question}`
}

async function askCareQuestion(presetQuestion) {
  const input = $('care-question')
  const question = (presetQuestion || input?.value || '').trim()
  if (!question) return
  if (!carePlantName || !careMeta) {
    appendCareMessage('assistant', 'Pick or identify a plant first.')
    return
  }

  appendCareMessage('user', question)
  if (input) input.value = ''

  if (ollamaOnline) {
    try {
      const reply = await ollamaGenerate(buildChatPrompt(question, carePlantName, careMeta))
      appendCareMessage('assistant', reply)
      return
    } catch {
      /* fall through to template */
    }
  }

  appendCareMessage('assistant', answerFromTemplate(question, careMeta, carePlantName))
}

function appendCareMessage(role, text) {
  const box = $('care-messages')
  if (!box) return
  const div = document.createElement('div')
  div.className = `care-msg care-msg--${role}`
  div.textContent = text
  box.append(div)
  box.scrollTop = box.scrollHeight
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export { updateOllamaStatus }
