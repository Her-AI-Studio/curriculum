const DEFAULT_BASE = 'http://localhost:11434'
const DEFAULT_MODEL = 'qwen2.5'

export function getOllamaConfig() {
  return {
    baseUrl: localStorage.getItem('ollama-base') || DEFAULT_BASE,
    model: localStorage.getItem('ollama-model') || DEFAULT_MODEL,
  }
}

export function saveOllamaConfig(baseUrl, model) {
  if (baseUrl) localStorage.setItem('ollama-base', baseUrl.replace(/\/$/, ''))
  if (model) localStorage.setItem('ollama-model', model)
}

export async function checkOllama(baseUrl = getOllamaConfig().baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(2500),
    })
    return res.ok
  } catch {
    return false
  }
}

/**
 * @param {string} prompt
 * @param {{ baseUrl?: string, model?: string }} opts
 */
export async function ollamaGenerate(prompt, opts = {}) {
  const { baseUrl, model } = { ...getOllamaConfig(), ...opts }
  const res = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { temperature: 0.6, num_predict: 280 },
    }),
  })
  if (!res.ok) {
    throw new Error(`Ollama error ${res.status}. Is Ollama running? Try a model you have pulled.`)
  }
  const data = await res.json()
  return (data.response || '').trim()
}
