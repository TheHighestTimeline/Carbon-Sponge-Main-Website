import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const page = (p) => resolve(import.meta.dirname, p)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js is lazy loaded on the Home hero only.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        home: page('index.html'),
        howWeWork: page('how-we-work/index.html'),
        services: page('services/index.html'),
        about: page('about/index.html'),
        bookACall: page('book-a-call/index.html'),
        privacy: page('privacy/index.html'),
        notFound: page('404.html'),
      },
    },
  },
})
