import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: '0.0.0.0',  // 允许从外部访问
    port: 5173,  // 可以选择保持默认端口
  },
})
