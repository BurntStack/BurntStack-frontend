import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Manual chunking keeps the initial bundle small for a better Lighthouse score.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/react-router|react-dom|\/react\//.test(id)) return 'react'
          if (/framer-motion|gsap|lenis/.test(id)) return 'motion'
          if (/swiper/.test(id)) return 'swiper'
          return undefined
        },
      },
    },
  },
})
