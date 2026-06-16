import * as tf from '@tensorflow/tfjs'

/**
 * Load a Blob as an HTMLImageElement.
 * @param {Blob} blob
 */
export function loadImageFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load image.'))
    }
    img.src = url
  })
}

/**
 * Resize pixel data to a 224×224 batch tensor for MobileNet.
 * @param {HTMLVideoElement | HTMLImageElement | HTMLCanvasElement} source
 */
export function sourceToFrameTensor(source) {
  return tf.tidy(() => {
    const img = tf.browser.fromPixels(source)
    const resized = tf.image.resizeBilinear(img, [224, 224])
    return resized.expandDims(0)
  })
}

/**
 * @param {Blob} blob
 */
export async function blobToFrameTensor(blob) {
  const img = await loadImageFromBlob(blob)
  return sourceToFrameTensor(img)
}

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
