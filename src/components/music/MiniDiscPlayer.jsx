import { IoPlay, IoClose } from "react-icons/io5"
import { BiExpand } from "react-icons/bi"
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import postData from '../../api/users.json'

/**
 * MiniDiscPlayer - Compact disc-style player for desktop and mobile views.
 * 
 * @param {Object} props - Component props.
 * @param {boolean} props.isMiniMode - Current mini mode state.
 * @param {Function} props.setIsMiniMode - Function to toggle mini mode.
 * @param {boolean} props.isPlaying - Current playback status.
 * @param {Function} props.stopPlayer - Function to stop playback.
 * @param {Object} props.dragData - Drag and drop state.
 * @param {Object} props.dragHandlers - Drag event handlers.
 * @param {Function} props.setIsMobileModalOpen - Function to open the mobile player modal.
 * @returns {JSX.Element} The rendered component.
 */
const MiniDiscPlayer = ({
  isMiniMode,
  setIsMiniMode,
  isPlaying,
  stopPlayer,
  dragData,
  dragHandlers,
  setIsMobileModalOpen,
}) => {
  const { t } = useTranslation('global')

  return (
    <>
      {/* Desktop Mini Mode Disc */}
      {isMiniMode && (
        <div className="unit-desktop-mini-player">
          <div className="unit-relative">
            <div
              className={`unit-player-mini-disc ${isPlaying ? 'unit-music-playing' : 'unit-music-paused'} ${dragData.isDragging ? 'unit-disc-dragging' : ''}`}
              onClick={() => setIsMiniMode(false)}
              {...dragHandlers}
              title={t('music.expand')}
            >
              <img src={postData.metadata.logo} alt="disc" className="unit-mini-disc-img" />
              <div className="unit-mini-disc-overlay">
                <BiExpand size={24} className="unit-mini-disc-expand-icon" />
              </div>
              <div className="unit-mini-disc-groove unit-scale-75"></div>
              <div className="unit-mini-disc-groove unit-scale-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Disc Player */}
      <div className="unit-mobile-mini-player">
        <div className="unit-relative">
          <div
            onClick={() => setIsMobileModalOpen(true)}
            className={`unit-player-mini-disc-mobile ${isPlaying ? 'unit-music-playing' : 'unit-music-paused'}`}
            aria-label="Open mobile player"
          >
            <img src={postData.metadata.logo} alt="disc" className="unit-mini-disc-img" />
            <div className="unit-mini-disc-mobile-overlay">
              {!isPlaying && <IoPlay size={24} style={{ transform: 'translateX(2px)' }} />}
              {isPlaying && <div className="unit-mini-disc-playing-indicator"></div>}
            </div>
            {/* Vinyl grooves effect */}
            <div className="unit-mini-disc-groove unit-scale-75"></div>
            <div className="unit-mini-disc-groove unit-scale-50"></div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              stopPlayer()
            }}
            className="unit-mobile-player-close"
            title={t('music.turn_off')}
            aria-label="Turn off music"
          >
            <IoClose size={16} />
          </button>
        </div>
      </div>
    </>
  )
}

MiniDiscPlayer.propTypes = {
  isMiniMode: PropTypes.bool.isRequired,
  setIsMiniMode: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  stopPlayer: PropTypes.func.isRequired,
  dragData: PropTypes.object.isRequired,
  dragHandlers: PropTypes.object.isRequired,
  setIsMobileModalOpen: PropTypes.func.isRequired,
}

export default MiniDiscPlayer
