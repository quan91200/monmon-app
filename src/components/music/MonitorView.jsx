import { IoVideocam, IoImage, IoText } from "react-icons/io5"
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import postData from '../../api/users.json'
import { MONITOR_TYPES } from '../../constants/music'

/**
 * MonitorView - Displays the content within the monitor modal based on selected type.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.monitorType - The type of content to display ('video', 'image', 'text').
 * @param {Function} props.setMonitorType - Function to change the monitor type.
 * @param {string} props.imageFit - The object-fit mode for images.
 * @param {Function} props.toggleImageFit - Function to cycle through image fit modes.
 * @param {string} props.monitorImage - The source URL for the monitor image.
 * @param {number} props.slideshowIndex - Current index in the video slideshow.
 * @param {Object} props.currentTrack - Currently playing track info.
 * @returns {JSX.Element} The rendered component.
 */
const MonitorView = ({
  monitorType,
  setMonitorType,
  imageFit,
  toggleImageFit,
  monitorImage,
  slideshowIndex,
  currentTrack,
  className,
}) => {
  const { t } = useTranslation('global')

  return (
    <div className={`unit-player-monitor-modal ${className || ''}`}>
      <div className="unit-monitor-controls-overlay">
        <div className="unit-monitor-tabs-vertical">
          <button
            onClick={() => setMonitorType(MONITOR_TYPES.VIDEO)}
            className={monitorType === MONITOR_TYPES.VIDEO ? 'active' : ''}
            title={t('music.video')}
          >
            <IoVideocam size={20} />
          </button>
          <button
            onClick={() => setMonitorType(MONITOR_TYPES.IMAGE)}
            className={monitorType === MONITOR_TYPES.IMAGE ? 'active' : ''}
            title={t('music.image')}
          >
            <IoImage size={20} />
          </button>
          <button
            onClick={() => setMonitorType(MONITOR_TYPES.TEXT)}
            className={monitorType === MONITOR_TYPES.TEXT ? 'active' : ''}
            title={t('music.text')}
          >
            <IoText size={20} />
          </button>
        </div>
      </div>

      <div className={`unit-monitor-content unit-custom-scrollbar ${monitorType !== MONITOR_TYPES.TEXT ? 'unit-monitor-no-scroll' : ''}`}>
        {monitorType === MONITOR_TYPES.VIDEO && (
          <div className="unit-monitor-slideshow-container">
            {postData.posts.map((post, idx) => (
              <div
                key={idx}
                className={`unit-monitor-slideshow-item ${idx === slideshowIndex ? 'active' : ''}`}
              >
                <img src={post.image} alt="" className="unit-monitor-slideshow-img" />
                <div className="unit-monitor-slideshow-overlay">
                  <p>{post.content}</p>
                  <span>{post.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {monitorType === MONITOR_TYPES.IMAGE && (
          <div
            className="unit-monitor-image-container"
            onClick={toggleImageFit}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={monitorImage}
              alt="Monitor"
              className={`unit-monitor-img unit-fit-${imageFit}`}
            />
          </div>
        )}

        {monitorType === MONITOR_TYPES.TEXT && (
          <div className="unit-monitor-text-container">
            <div className="unit-monitor-text-item">
              <span className="unit-label">URL:</span>
              <code>{window.location.href}</code>
            </div>
            <div className="unit-monitor-text-item">
              <span className="unit-label">Path:</span>
              <code>{window.location.pathname}</code>
            </div>
            <div className="unit-monitor-text-item">
              <span className="unit-label">Track:</span>
              <code>{currentTrack?.url}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

MonitorView.propTypes = {
  monitorType: PropTypes.string.isRequired,
  setMonitorType: PropTypes.func.isRequired,
  imageFit: PropTypes.string.isRequired,
  toggleImageFit: PropTypes.func.isRequired,
  monitorImage: PropTypes.string.isRequired,
  slideshowIndex: PropTypes.number.isRequired,
  currentTrack: PropTypes.object,
  className: PropTypes.string,
}

export default MonitorView
