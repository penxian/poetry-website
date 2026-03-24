import { defineConfig } from 'vite'

export default defineConfig({
  base: '/poetry-website/',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
