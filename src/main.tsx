import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const skipLink = event.target.closest<HTMLAnchorElement>(
    '.skip-link[href="#main-content"]',
  )
  if (!skipLink) return

  window.requestAnimationFrame(() => {
    document.getElementById('main-content')?.focus({ preventScroll: true })
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
