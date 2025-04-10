import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    watch: {
      ignored: ['**/public/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
