import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: { port: 5174, open: true },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
})
