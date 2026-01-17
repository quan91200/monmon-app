import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { STORAGE_KEYS } from '../constants'
import Toast from '../components/Toast'
import { useSettingsContext } from './SettingsContext'

const ToastContext = createContext()

/**
 * Custom hook to consume the global ToastContext.
 * Allows triggering notifications from any component.
 * 
 * @returns {ToastContextValue} The toast state and trigger function.
 */
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

/**
 * ToastProvider Component - Manages global notification state and persistence.
 * Renders the active Toast component and handles history.
 */
export const ToastProvider = ({ children }) => {
  const { toastPosition } = useSettingsContext()
  const [activeToast, setActiveToast] = useState(null)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOAST_PERSISTENCE)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Persistence Effect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOAST_PERSISTENCE, JSON.stringify(history.slice(0, 50)))
  }, [history])

  /**
   * Triggers a new toast notification.
   * 
   * @param {string} message - Content of the notification.
   * @param {string} type - 'success' | 'primary' | 'info' | 'warning'.
   * @param {number} duration - Visibility time in ms.
   */
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    const newToast = { id, message, type, duration, timestamp: new Date().toISOString() }

    setActiveToast(newToast)
    setHistory(prev => [newToast, ...prev])
  }, [])

  const hideToast = useCallback(() => {
    setActiveToast(null)
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const value = {
    activeToast,
    showToast,
    hideToast,
    history,
    clearHistory
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {activeToast && (
        <Toast
          open={true}
          onClose={hideToast}
          message={activeToast.message}
          type={activeToast.type}
          duration={activeToast.duration}
          pos={toastPosition}
        />
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
}
