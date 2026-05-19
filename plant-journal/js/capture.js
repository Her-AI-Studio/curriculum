/**
 * Capture the current video frame as a JPEG data URL.
 * @param {HTMLVideoElement} video
 * @param {number} maxSize
 */
export function captureVideoFrameDataUrl(video, maxSize = 480) {
  const w = video.videoWidth
  const h = video.videoHeight
  if (!w || !h) {
    throw new Error('Camera is not ready yet. Wait for the video preview, then try again.')
  }
  const scale = Math.min(1, maxSize / Math.max(w, h))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(w * scale)
  canvas.height = Math.round(h * scale)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.85)
}
