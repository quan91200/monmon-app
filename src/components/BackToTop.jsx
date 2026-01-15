import { useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useSettingsContext } from '../context/SettingsContext'

/**
 * BackToTop Component - A floating button that returns the user to the top of the page.
 * Responsiveness: Moves higher on mobile to avoid overlapping the navigation bar.
 * Persistence: Syncs visibility preference with the global SettingsContext.
 * 
 * @returns {JSX.Element|null} The rendered scroll-to-top button.
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const { backToTopConfig } = useSettingsContext()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const shouldShow = backToTopConfig.enabled
    && backToTopConfig.activePages.includes(location.pathname)

  if (!shouldShow) return null

  return (
    <>
      {/* Mobile Button - Standard */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-28 right-5 ipad-v:hidden z-[60] p-4 rounded-full 
                  bg-pink-500 dark:bg-pink-600
                  text-white shadow-xl transition-all duration-500 hover:scale-110 active:scale-90 
                  hover:shadow-pink-500/40 dark:hover:shadow-pink-900/40 backdrop-blur-md
                  focus:outline-none ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        <FaChevronUp size={20} />
      </button>

      {/* Desktop Button - Premium Effect */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`back-to-top-premium ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        <svg className="svgIcon" viewBox="0 0 384 512">
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          ></path>
        </svg>
      </button>
    </>
  )
}

export default BackToTop
