import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { gsap } from 'gsap';

import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
