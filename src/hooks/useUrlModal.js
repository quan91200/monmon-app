import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * useUrlModal - A hook to manage modal state driven by URL navigation.
 * 
 * @param {string} modalPath - The URL path that represents the open modal state (e.g., '/musics').
 * @param {string} [defaultBackPath='/'] - The fallback path to navigate to when closing if no previous path exists.
 * @returns {Object} Object containing isOpen state and open/close handlers.
 * @property {boolean} isOpen - Whether the modal is currently open based on the URL.
 * @property {Function} open - Function to open the modal (navigates to modalPath).
 * @property {Function} close - Function to close the modal (navigates back to previous path).
 * @property {Function} toggle - Function to toggle the modal state.
 */
const useUrlModal = (modalPath, defaultBackPath = '/') => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(location.pathname === modalPath)
  // Initialize prevPath: if we land directly on modalPath, fallback to default; otherwise use current.
  const [prevPath, setPrevPath] = useState(location.pathname === modalPath ? defaultBackPath : location.pathname)

  // Sync internal state with URL changes
  useEffect(() => {
    setIsOpen(location.pathname === modalPath)
  }, [location.pathname, modalPath])

  // Update prevPath when location changes, but ONLY if we are NOT on the modal path.
  // This effectively "remembers" the last non-modal page visited.
  useEffect(() => {
    if (location.pathname !== modalPath) {
      setPrevPath(location.pathname)
    }
  }, [location.pathname, modalPath])

  const open = useCallback(() => {
    if (location.pathname !== modalPath) {
      // No need to setPrevPath here explicitly because the effect above handles it
      // before we navigate away (or we use the current valid non-modal path).
      // Actually, if we are on Page A, and click Open, we want to return to Page A.
      // The effect above creates a bit of a lag/race or might be cleaner.
      // Let's stick to the manual logic from previous implementation for robustness 
      // regarding "what was the path *right before* we clicked open".
      setPrevPath(location.pathname)
      navigate(modalPath)
    }
  }, [location.pathname, modalPath, navigate])

  const close = useCallback(() => {
    if (location.pathname === modalPath) {
      navigate(prevPath || defaultBackPath)
    }
  }, [location.pathname, modalPath, navigate, prevPath, defaultBackPath])

  const toggle = useCallback((forceState) => {
    if (typeof forceState === 'boolean') {
      forceState ? open() : close()
    } else {
      // Standard toggle
      isOpen ? close() : open()
    }
  }, [isOpen, open, close])

  return {
    isOpen,
    open,
    close,
    toggle
  }
}

export default useUrlModal
