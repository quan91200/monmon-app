import PropTypes from 'prop-types'
import ThemeToggle from '../ThemeToggle'
import useLanguage from '../../hooks/useLanguage'
import { NAVBAR } from '../../constants'
import postData from '../../api/users.json'

/**
 * MonitorNavbar - A minimalist navigation bar for the monitor view.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isWithPlaylist - Whether the playlist sidebar is currently open.
 * @returns {JSX.Element} The rendered component.
 */
const MonitorNavbar = ({ isWithPlaylist }) => {
  const { currentLanguage, changeLanguage } = useLanguage()

  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <nav
      className={`unit-monitor-navbar unit-animate-fade-in ${isWithPlaylist ? 'unit-monitor-with-playlist' : ''}`}
      onClick={handleStopPropagation}
    >
      <div className="unit-monitor-navbar-inner">
        <div className="unit-monitor-navbar-logo">
          <img src={postData.metadata.logo} alt="Logo" />
          <span>{postData.metadata.appName}</span>
        </div>
        <div className="unit-monitor-navbar-actions">
          <div className="unit-monitor-language-selector">
            {Object.entries(NAVBAR.FLAGS).map(([code, src]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`unit-monitor-flag-btn ${currentLanguage === code ? 'active' : ''}`}
                aria-label={`Switch to ${code}`}
              >
                <img src={src} alt={code} />
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

MonitorNavbar.propTypes = {
  isWithPlaylist: PropTypes.bool.isRequired,
}

export default MonitorNavbar
