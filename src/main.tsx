import './style.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')!
createRoot(container).render(<App />)
