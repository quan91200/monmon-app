import { useState, useEffect } from 'react'
import { NAVBAR } from '../constants'

/**
 * Custom hook to manage navbar scroll state.
 * 
 * @returns {Object} Navbar scroll state.
 */
const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    /**
     * Updates the scrolled state based on window scroll position.
     */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > NAVBAR.SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isScrolled }
}

export default useNavbar
