import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Устанавливаем базовый путь как текущий каталог
  plugins: [react()],
})
