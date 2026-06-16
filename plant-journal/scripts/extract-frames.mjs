#!/usr/bin/env node
/**
 * Extract JPEG training frames from a plant video using local ffmpeg.
 *
 * Usage:
 *   npm run extract-frames -- path/to/plant.mp4
 *   npm run extract-frames -- path/to/plant.mp4 ./my-frames 2
 *
 * Args: <video> [outputDir] [fps]
 * Default output: ./training-frames next to the video file
 * Default fps: 1
 */

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const [videoPathArg, outputDirArg, fpsArg] = process.argv.slice(2)

if (!videoPathArg) {
  console.error('Usage: npm run extract-frames -- <video> [outputDir] [fps]')
  process.exit(1)
}

const videoPath = resolve(videoPathArg)
if (!existsSync(videoPath)) {
  console.error(`Video not found: ${videoPath}`)
  process.exit(1)
}

const fps = fpsArg ?? '1'
const outputDir = resolve(outputDirArg ?? join(dirname(videoPath), 'training-frames'))

mkdirSync(outputDir, { recursive: true })

const outputPattern = join(outputDir, 'frame_%04d.jpg')

console.log(`Input:  ${videoPath}`)
console.log(`Output: ${outputPattern}`)
console.log(`FPS:    ${fps}`)

const result = spawnSync(
  'ffmpeg',
  ['-i', videoPath, '-vf', `fps=${fps}`, '-q:v', '2', outputPattern],
  { stdio: 'inherit' },
)

if (result.error) {
  console.error('\nCould not run ffmpeg. Install it first: https://ffmpeg.org/download.html')
  console.error(result.error.message)
  process.exit(1)
}

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

console.log(`\nDone. Import the images in Plant Journal → Train from video → Import images.`)
