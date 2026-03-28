import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import init from './init.jsx'

const start = async () => {
  const app = await init()
  createRoot(document.getElementById('app')).render(
    <StrictMode>
      {app}
    </StrictMode>
  )
}

start()