import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Use root as base so assets work with the custom domain (halfway.one)
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
