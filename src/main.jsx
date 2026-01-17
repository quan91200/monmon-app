import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/index.css'
import './assets/css/layouts.css'
import './assets/css/components.css'
import './assets/css/pages.css'

import App from './App'

import {
  EN,
  VN,
  CN,
} from './translation'
import i18next from "i18next"
import {
  I18nextProvider
} from 'react-i18next'

import {
  ThemeProvider
} from './context/ThemeContext'
import {
  SettingsProvider
} from './context/SettingsContext'
import {
  ToastProvider
} from './context/ToastContext'
import {
  PostProvider
} from './context/PostContext'
import {
  StatusCardPostProvider
} from './context/StatusCardPostContext'
import {
  GalleryProvider
} from './context/GalleryContext'
import {
  MusicProvider
} from './context/MusicContext'

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: "vn",
  resources: {
    en: {
      global: EN,
    },
    vn: {
      global: VN,
    },
    cn: {
      global: CN,
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
        <SettingsProvider>
          <ToastProvider>
            <PostProvider>
              <StatusCardPostProvider>
                <GalleryProvider>
                  <MusicProvider>
                    <App />
                  </MusicProvider>
                </GalleryProvider>
              </StatusCardPostProvider>
            </PostProvider>
          </ToastProvider>
        </SettingsProvider>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
)
