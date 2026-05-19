let plantsMeta = {}

export async function loadPlantsMeta() {
  try {
    const res = await fetch('/plants.json')
    plantsMeta = await res.json()
  } catch {
    plantsMeta = {}
  }
  return plantsMeta
}

export function getPlantsMeta() {
  return plantsMeta
}

export function findMeta(className) {
  const lower = className.toLowerCase()
  const key = Object.keys(plantsMeta).find(
    (k) =>
      k.toLowerCase() === lower ||
      plantsMeta[k].label?.toLowerCase() === lower ||
      lower.includes(k.toLowerCase()),
  )
  if (key) return { ...plantsMeta[key], _key: key }

  return {
    label: className,
    tip: `Add care info for "${className}" in plants.json for richer tips.`,
    watering: 'Water when the top of the soil feels dry unless your plant likes constant moisture.',
    light: 'Most houseplants prefer bright indirect light. Adjust if leaves bleach or stretch.',
    mistakes: ['Overwatering', 'Not enough light', 'Wrong spot for the season'],
    funFact: 'Every plant is different. Train your model with clear photos for best results.',
    _key: null,
  }
}
