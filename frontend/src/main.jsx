import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import APP from './components/app.jsx'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <APP/>
  </React.Fragment>
)
