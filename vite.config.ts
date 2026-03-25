import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  // لو هترفع المشروع على GitHub Pages، غير المسار هنا حسب repo
  // لو على Vercel، خليها "/"
  base: '/', 
})