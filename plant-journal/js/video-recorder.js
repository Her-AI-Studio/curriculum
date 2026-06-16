/**
 * Record video from a MediaStream using MediaRecorder.
 */
export class VideoRecorder {
  /** @type {MediaRecorder | null} */
  #recorder = null
  /** @type {Blob[]} */
  #chunks = []
  /** @type {Promise<Blob> | null} */
  #stopPromise = null

  /** @param {MediaStream} stream */
  start(stream) {
    if (this.#recorder?.state === 'recording') {
      throw new Error('Already recording.')
    }

    this.#chunks = []
    const mimeType = pickMimeType()
    this.#recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)

    this.#stopPromise = new Promise((resolve, reject) => {
      this.#recorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.#chunks.push(e.data)
      }
      this.#recorder.onerror = () => reject(new Error('Recording failed.'))
      this.#recorder.onstop = () => {
        const type = this.#recorder?.mimeType || 'video/webm'
        resolve(new Blob(this.#chunks, { type }))
      }
    })

    this.#recorder.start(250)
  }

  stop() {
    if (!this.#recorder || this.#recorder.state !== 'recording') {
      throw new Error('Not recording.')
    }
    this.#recorder.stop()
    return this.#stopPromise
  }

  get isRecording() {
    return this.#recorder?.state === 'recording'
  }
}

function pickMimeType() {
  const candidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4',
  ]
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) ?? ''
}
