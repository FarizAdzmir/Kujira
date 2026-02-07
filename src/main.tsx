import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ensure page always starts at the top - AGGRESSIVE approach
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Force scroll to top immediately
window.scrollTo(0, 0)
document.documentElement.scrollTop = 0
document.body.scrollTop = 0

// Additional failsafe - force scroll after a brief moment
setTimeout(() => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
