/** @typedef {{ label: string, tip: string, watering?: string, light?: string, mistakes?: string[], funFact?: string }} PlantMeta */

/** @type {{ name: string, meta: PlantMeta, confidence: number } | null} */
export let currentPlant = null

export function setCurrentPlant(name, meta, confidence = 0) {
  currentPlant = { name, meta, confidence }
  window.dispatchEvent(new CustomEvent('plant-identified', { detail: currentPlant }))
}

export function clearCurrentPlant() {
  currentPlant = null
}
