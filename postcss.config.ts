import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
})
