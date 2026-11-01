import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/kanit/300.css'
import '@fontsource/kanit/400.css'
import '@fontsource/kanit/500.css'
import '@fontsource/kanit/700.css'
import '@fontsource/kanit/900.css'
import '@fontsource-variable/inter'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
