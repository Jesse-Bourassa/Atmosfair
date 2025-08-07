import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to all network interfaces
    port: 5173,
    hmr: {
      host: 'atmosfairs.com',
      protocol: 'wss',
    },
    allowedHosts: ['atmosfairs.com', 'www.atmosfairs.com'],
    proxy: {
      '/api': {
        target: 'http://192.168.2.139:5001', // Your backend server IP and port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }       // Ensure it's the same port you're mapping
  },
});
