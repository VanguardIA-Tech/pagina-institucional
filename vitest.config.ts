import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const publicProofPath = fileURLToPath(
  new URL('./public/data/public-proof.json', import.meta.url),
)
const publicProof = JSON.parse(readFileSync(publicProofPath, 'utf8')) as unknown

export default defineConfig({
  define: {
    __PUBLIC_PROOF__: JSON.stringify(publicProof),
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
})
