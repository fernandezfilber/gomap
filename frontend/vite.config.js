import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0', // Permite acceso externo
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Útil para que Docker detecte cambios en Windows
  },
},
})
