import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { STORAGE_KEYS, VIEW_MODES } from '../constants'

const PostContext = createContext()

/**
 * Context provider for managing post-related state (pagination and view mode).
 * Allows persistence across navigation and unified state management.
 * 
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} The PostContext provider.
 */
export const PostProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE)
    return saved ? parseInt(saved) : 1
  })

  const [viewMode, setViewMode] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || VIEW_MODES.LIST
  )

  /**
   * Handles changing the view mode and persists it.
   * @param {string} mode - The new view mode (list or grid).
   */
  const handleViewModeChange = (mode) => {
    if (mode !== viewMode) {
      setViewMode(mode)
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode)
      handlePageChange(1) // Reset to page 1 only on actual change
    }
  }

  /**
   * Handles page changes and persists the current page.
   * @param {number} page - The new page number.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page)
    localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, page.toString())
  }

  const value = {
    currentPage,
    viewMode,
    handleViewModeChange,
    handlePageChange
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
}

PostProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Custom hook to consume the PostContext.
 * @returns {Object} Post state and handlers.
 */
export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}
