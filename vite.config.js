import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './', // Relative base path for GitHub Pages
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
            },
        },
    }
})
