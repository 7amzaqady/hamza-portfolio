import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * GitHub Pages serves the site from a sub-path
 * (https://7amzaqady.github.io/hamza-portfolio/), so production builds need a
 * matching `base`. The dev server runs from the root instead, which keeps local
 * and sandbox previews working at "/".
 */
const BASE_PATH = process.env.BASE_PATH ?? '/hamza-portfolio/'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'serve' && !isPreview ? '/' : BASE_PATH,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
}))
