import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa"

/**
 * CoupleCard Component - Displays an individual's member card with a radial 
 * social media menu triggered by clicking the avatar.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.user - User data from users.json.
 * @param {string} props.fallbackImg - Fallback image if avatar is missing.
 * @param {string} props.gradient - Border gradient classes.
 * @param {string} props.delay - Animation delay class.
 * @returns {JSX.Element} The rendered CoupleCard component.
 */
const CoupleCard = ({ user, gradient, delay }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cardRef = useRef(null)

  // Filter available social profiles
  const socialIcons = [
    { key: 'facebook', icon: <FaFacebook />, color: 'bg-[#1877F2]' },
    { key: 'linkedin', icon: <FaLinkedin />, color: 'bg-[#0A66C2]' },
    { key: 'github', icon: <FaGithub />, color: 'bg-[#24292E]' }
  ].filter(item => user.profiles && user.profiles[item.key] && user.profiles[item.key] !== "")

  /**
   * Toggles the radial menu visibility.
   */
  const toggleMenu = (e) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  /**
   * Closes the menu when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center space-y-4 animate-float ${delay}`}
    >
      <div className="relative group">
        {/* Border Glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000`} />

        {/* Avatar Container */}
        <div
          onClick={toggleMenu}
          className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-2xl cursor-pointer active:scale-95 transition-transform duration-300"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isMenuOpen ? 'scale-110 blur-[2px]' : 'group-hover:scale-110'}`}
          />

          {/* Overlay when menu is open */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Radial Menu Items */}
        {socialIcons.map((item, index) => {
          const totalItems = socialIcons.length
          // Positioning: spread items in a semi-circle or full circle based on count
          // For couple cards, a 180-degree spread at the top or bottom usually looks best
          const angle = (index * (360 / totalItems)) - 90 // Adjust offset to start from top
          const radius = 100 // Distance from center in pixels for desktop
          const radiusMobile = 70 // Distance for mobile

          return (
            <a
              key={item.key}
              href={user.profiles[item.key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                w-10 h-10 sm:w-12 sm:h-12 rounded-full ${item.color} text-white 
                                flex items-center justify-center shadow-lg transition-all duration-500
                                hover:scale-110 hover:brightness-110
                                ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
              style={{
                transform: isMenuOpen
                  ? `translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))`
                  : 'translate(-50%, -50%) scale(0)',
                '--tx': `${Math.cos(angle * Math.PI / 180) * (window.innerWidth < 640 ? radiusMobile : radius)}px`,
                '--ty': `${Math.sin(angle * Math.PI / 180) * (window.innerWidth < 640 ? radiusMobile : radius)}px`
              }}
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
            </a>
          )
        })}
      </div>

      <div className="text-center">
        <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
          {user.name}
        </h3>
        <p className="font-inter text-sm sm:text-base text-gray-500 dark:text-gray-400 italic font-medium">
          ({user.nickname})
        </p>
      </div>
    </div>
  )
}

CoupleCard.propTypes = {
  user: PropTypes.object.isRequired,
  gradient: PropTypes.string.isRequired,
  delay: PropTypes.string.isRequired,
}

export default CoupleCard
