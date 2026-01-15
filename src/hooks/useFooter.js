import { useMemo } from 'react'
import userData from '../api/users.json'

/**
 * Custom hook to calculate footer-related data like anniversary years.
 * 
 * @returns {Object} Calculated years and anniversary info.
 */
const useFooter = () => {
  const years = useMemo(() => {
    const startYear = new Date(userData.metadata.anniversaryDate).getFullYear()
    const currentYear = new Date().getFullYear()
    return { startYear, currentYear }
  }, [])

  return { ...years }
}

export default useFooter
