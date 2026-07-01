import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

function scanContentPlugin() {
  return {
    name: 'scan-content',
    buildStart() {
      console.log('[scan-content] Scanning content folder...')
      execSync('node scripts/scanContent.js', { stdio: 'inherit' })
      console.log('[scan-content] Done.')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    scanContentPlugin()
  ],
})
