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
      className={`unit-couple-card ${delay}`}
    >
      <div className="unit-card-media-group">
        {/* Border Glow */}
        <div className={`unit-card-glow ${gradient}`} />

        {/* Avatar Container */}
        <div
          onClick={toggleMenu}
          className="unit-card-avatar-container"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className={`unit-card-avatar ${isMenuOpen ? 'unit-avatar-active' : ''}`}
          />

          {/* Overlay when menu is open */}
          <div className={`unit-card-overlay ${isMenuOpen ? 'unit-overlay-visible' : ''}`} />
        </div>

        {/* Radial Menu Items */}
        {socialIcons.map((item, index) => {
          const totalItems = socialIcons.length
          const angle = (index * (360 / totalItems)) - 90
          const radius = 100
          const radiusMobile = 70

          return (
            <a
              key={item.key}
              href={user.profiles[item.key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`unit-social-item ${isMenuOpen ? 'unit-item-visible' : 'unit-item-hidden'}`}
              style={{
                '--menu-color': item.key === 'facebook' ? '#1877F2' : item.key === 'linkedin' ? '#0A66C2' : '#24292E',
                transform: isMenuOpen
                  ? `translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))`
                  : 'translate(-50%, -50%) scale(0)',
                '--tx': `${Math.cos(angle * Math.PI / 180) * (window.innerWidth < 640 ? radiusMobile : radius)}px`,
                '--ty': `${Math.sin(angle * Math.PI / 180) * (window.innerWidth < 640 ? radiusMobile : radius)}px`
              }}
            >
              <span className="unit-social-icon">{item.icon}</span>
            </a>
          )
        })}
      </div>

      <div className="unit-card-info">
        <h3 className="unit-card-name">
          {user.name}
        </h3>
        <p className="unit-card-nickname">
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
