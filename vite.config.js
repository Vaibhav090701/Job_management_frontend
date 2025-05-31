import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() ],
  server: {
    port: 3000, // Set the port to 3000 for consistency
    watch: {
      usePolling: true, // Enable polling for file changes (useful for WSL or network drives)
      interval: 100, // Check for changes every 100ms
    },
    hmr: true, // Ensure hot module replacement is enabled
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
