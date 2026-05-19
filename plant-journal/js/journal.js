const STORAGE_KEY = 'plant-journal-entries'

/** @typedef {{ id: string, plantName: string, confidence: number, imageDataUrl: string, note: string, createdAt: string }} JournalEntry */

/** @returns {JournalEntry[]} */
export function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** @param {JournalEntry[]} entries */
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

/**
 * @param {{ plantName: string, confidence: number, imageDataUrl: string, note?: string }} data
 */
export function addEntry(data) {
  const entries = loadEntries()
  const entry = {
    id: `entry_${Date.now()}`,
    plantName: data.plantName,
    confidence: data.confidence,
    imageDataUrl: data.imageDataUrl,
    note: (data.note || '').trim(),
    createdAt: new Date().toISOString(),
  }
  entries.unshift(entry)
  saveEntries(entries)
  return entry
}

export function deleteEntry(id) {
  saveEntries(loadEntries().filter((e) => e.id !== id))
}

export function clearAllEntries() {
  saveEntries([])
}

export function getEntry(id) {
  return loadEntries().find((e) => e.id === id) ?? null
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {HTMLElement} container
 * @param {(entry: JournalEntry) => void} onSelect
 * @param {string | null} selectedId
 */
export function renderGallery(container, onSelect, selectedId = null) {
  const entries = loadEntries()
  if (!entries.length) {
    container.innerHTML =
      '<p class="journal-empty">No entries yet. Identify a plant and tap <strong>Save to journal</strong>.</p>'
    return
  }

  container.innerHTML = ''
  const grid = document.createElement('div')
  grid.className = 'journal-grid'
  for (const entry of entries) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'journal-card'
    if (entry.id === selectedId) btn.classList.add('is-selected')
    btn.dataset.entryId = entry.id
    btn.innerHTML = `
      <img src="${entry.imageDataUrl}" alt="${escapeHtml(entry.plantName)}" width="120" height="120" />
      <span class="journal-card__name">${escapeHtml(entry.plantName)}</span>
      <span class="journal-card__date">${escapeHtml(formatDate(entry.createdAt))}</span>
    `
    btn.addEventListener('click', () => onSelect(entry))
    grid.append(btn)
  }
  container.append(grid)
}

/**
 * @param {HTMLElement} container
 * @param {JournalEntry | null} entry
 */
export function renderEntryDetail(container, entry) {
  if (!entry) {
    container.hidden = true
    container.innerHTML = ''
    return
  }
  container.hidden = false
  container.innerHTML = `
    <figure class="journal-detail__photo">
      <img src="${entry.imageDataUrl}" alt="${escapeHtml(entry.plantName)}" />
    </figure>
    <p class="journal-detail__meta">
      <strong>${escapeHtml(entry.plantName)}</strong>
      · ${entry.confidence}% confidence
      · ${escapeHtml(formatDate(entry.createdAt))}
    </p>
    ${entry.note ? `<p class="journal-detail__note">${escapeHtml(entry.note)}</p>` : ''}
  `
}
