import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
      host: '0.0.0.0',  // 允许从外部访问
    port: 5173,  // 可以选择保持默认端口
  },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  
})
