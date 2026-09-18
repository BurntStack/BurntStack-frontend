import { defineConfig, loadEnv } from 'vite'
import { localApi } from './server/local-api.js'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['GROQ_API_KEY', 'GROQ_MODEL', 'RESEND_API_KEY', 'RESEND_FROM']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }
  return {
    plugins: [react(), tailwindcss(), localApi({ blogApiUrl: env.VITE_BLOG_API_URL })],
    server: {
      proxy: {
        // The public portal allows the deployed site origin. Keep local
        // reads same-origin without weakening the portal's CORS policy.
        '/portal-api': {
          target: env.VITE_BLOG_API_URL || 'https://backend-wine-one-95.vercel.app/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/portal-api/, ''),
        },
      },
    },
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
  }
})
