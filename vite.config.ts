/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    // NB : le fuseau des tests (Europe/Paris) est fixé via la variable
    // d'environnement TZ au niveau du job CI (.github/workflows/ci.yml) :
    // ICU fige le fuseau au démarrage de Node, un env injecté ici est trop tard.
  },
})
