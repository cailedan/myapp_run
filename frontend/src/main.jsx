import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HelloWorld from './components/helloworld'
import RunningCharacter from './components/character'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RunningCharacter/>
  </StrictMode>,
)
