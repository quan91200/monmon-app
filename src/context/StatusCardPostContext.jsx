import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const StatusCardPostContext = createContext()

/**
 * Context provider for managing the expanded/collapsed state of post cards (StatusCards).
 * Allows global control over post item visibility details.
 */
export const StatusCardPostProvider = ({ children }) => {
  // Default to expanded (true) as previously set in PostItem
  const [isAllExpanded, setIsAllExpanded] = useState(true)

  const toggleAllExpanded = (value) => {
    setIsAllExpanded(value !== undefined ? value : (prev) => !prev)
  }

  const value = {
    isAllExpanded,
    toggleAllExpanded
  }

  return (
    <StatusCardPostContext.Provider value={value}>
      {children}
    </StatusCardPostContext.Provider>
  )
}

StatusCardPostProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Custom hook to consume the StatusCardPostContext.
 */
export const useStatusCardPostContext = () => {
  const context = useContext(StatusCardPostContext)
  if (!context) {
    throw new Error('useStatusCardPostContext must be used within a StatusCardPostProvider')
  }
  return context
}
