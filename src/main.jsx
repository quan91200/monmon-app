import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/animations.css'
import './assets/css/index.css'
import './assets/css/layouts.css'
import './assets/css/components.css'
import './assets/css/pages.css'

import App from './App'
import { AppProviders } from './context/AppProviders'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
