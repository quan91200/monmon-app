import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '../translation/i18n-config'

import { ThemeProvider } from './ThemeContext'
import { SettingsProvider } from './SettingsContext'
import { ToastProvider } from './ToastContext'
import { PostProvider } from './PostContext'
import { StatusCardPostProvider } from './StatusCardPostContext'
import { GalleryProvider } from './GalleryContext'
import { MusicProvider } from './MusicContext'

/**
 * AppProviders Component
 * Centralizes all application context providers to declutter main entry point.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export const AppProviders = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
        <SettingsProvider>
          <ToastProvider>
            <PostProvider>
              <StatusCardPostProvider>
                <GalleryProvider>
                  <MusicProvider>
                    {children}
                  </MusicProvider>
                </GalleryProvider>
              </StatusCardPostProvider>
            </PostProvider>
          </ToastProvider>
        </SettingsProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
}
