import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { STORAGE_KEYS } from '../constants'

const SettingsContext = createContext()

/**
 * Custom hook to consume common application settings.
 * @returns {SettingsContextValue} The settings state and handlers.
 */
export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider')
  }
  return context
}

/**
 * SettingsProvider component to manage and persist global app configurations.
 */
export const SettingsProvider = ({ children }) => {
  const [snowEffectEnabled, setSnowEffectEnabled] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.SNOW_EFFECT) !== 'false'
  })

  const [backToTopConfig, setBackToTopConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BACK_TO_TOP_CONFIG)
      return saved ? JSON.parse(saved) : { enabled: false, activePages: [] }
    } catch (e) {
      return { enabled: false, activePages: [] }
    }
  })

  const [toastPosition, setToastPosition] = useState('top-right')

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SNOW_EFFECT, snowEffectEnabled ? 'true' : 'false')
    // Dispatch event for components that might not be under this context (if any)
    window.dispatchEvent(new Event('snowEffectChanged'))
  }, [snowEffectEnabled])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BACK_TO_TOP_CONFIG, JSON.stringify(backToTopConfig))
    window.dispatchEvent(new Event('backToTopChanged'))
  }, [backToTopConfig])

  const toggleSnowEffect = () => setSnowEffectEnabled(prev => !prev)

  const toggleBackToTop = (enabled) => {
    setBackToTopConfig(prev => ({ ...prev, enabled: enabled ?? !prev.enabled }))
  }

  const toggleBackToTopPage = (path) => {
    setBackToTopConfig(prev => {
      const activePages = prev.activePages.includes(path)
        ? prev.activePages.filter(p => p !== path)
        : [...prev.activePages, path]
      return { ...prev, activePages }
    })
  }

  const value = {
    snowEffectEnabled,
    toggleSnowEffect,
    backToTopConfig,
    toggleBackToTop,
    toggleBackToTopPage,
    toastPosition,
    setToastPosition
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
}
