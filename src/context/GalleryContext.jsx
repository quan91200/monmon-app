import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { STORAGE_KEYS, GALLERY_VIEW_MODES } from '../constants'

const GalleryContext = createContext()

/**
 * Context provider for managing gallery-specific state like view mode.
 * 
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} The GalleryContext provider.
 */
export const GalleryProvider = ({ children }) => {
  const [galleryViewMode, setGalleryViewMode] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.GALLERY_VIEW_MODE) || GALLERY_VIEW_MODES.GRID
  )

  const [galleryAutoplay, setGalleryAutoplay] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY_AUTOPLAY)
    return saved !== null ? JSON.parse(saved) : true
  })

  /**
   * Handles changing the gallery view mode and persists it.
   * @param {string} mode - The new gallery view mode.
   */
  const handleGalleryViewModeChange = (mode) => {
    setGalleryViewMode(mode)
    localStorage.setItem(STORAGE_KEYS.GALLERY_VIEW_MODE, mode)
  }

  /**
   * Toggles the gallery autoplay setting and persists it.
   */
  const toggleGalleryAutoplay = () => {
    setGalleryAutoplay(prev => {
      const newValue = !prev
      localStorage.setItem(STORAGE_KEYS.GALLERY_AUTOPLAY, JSON.stringify(newValue))
      return newValue
    })
  }

  const value = {
    galleryViewMode,
    handleGalleryViewModeChange,
    galleryAutoplay,
    toggleGalleryAutoplay
  }

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  )
}

GalleryProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Custom hook to consume the GalleryContext.
 * @returns {Object} Gallery state and handlers.
 */
export const useGalleryContext = () => {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider')
  }
  return context
}
