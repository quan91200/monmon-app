import { IoPlayBack, IoPlayForward, IoPlay, IoPause, IoClose, IoList, IoDesktopOutline } from "react-icons/io5"
import { TbMinimize } from "react-icons/tb"
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import MarqueeText from '../common/MarqueeText'
import MonitorNavbar from './MonitorNavbar'
import MonitorView from './MonitorView'
import postData from '../../api/users.json'
import { BREAKPOINT_DESKTOP } from '../../constants/music'

/**
 * DesktopPlayerBar - The main desktop playback interface.
 * 
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
const DesktopPlayerBar = ({
  isPlaying,
  currentTrack,
  togglePlay,
  nextTrack,
  prevTrack,
  playTrack,
  stopPlayer,
  isMiniMode,
  setIsMiniMode,
  playlist,
  isDropdownOpen,
  setIsDropdownOpen,
  isMonitorOpen,
  setIsMonitorOpen,
  monitorType,
  setMonitorType,
  imageFit,
  toggleImageFit,
  monitorImage,
  slideshowIndex,
  dragData,
  isHoveringDisc,
  setIsHoveringDisc,
  dragHandlers,
}) => {
  const { t } = useTranslation('global')

  const handleMonitorToggle = () => {
    const nextVal = !isMonitorOpen
    setIsMonitorOpen(nextVal)
    if (window.innerWidth < BREAKPOINT_DESKTOP && nextVal) {
      setIsDropdownOpen(false)
    }
  }

  const handlePlaylistToggle = () => {
    const nextVal = !isDropdownOpen
    setIsDropdownOpen(nextVal)
    if (window.innerWidth < BREAKPOINT_DESKTOP && nextVal) {
      setIsMonitorOpen(false)
    }
  }

  return (
    <div className={`unit-music-player-bar ${isMiniMode ? 'unit-animate-fade-left-to-right unit-pointer-events-none' : 'unit-animate-fade-right-to-left'} ${isMonitorOpen ? 'unit-monitor-active' : ''}`}>
      <div className="unit-container">
        <div className="unit-player-inner">
          {isMonitorOpen && <MonitorNavbar isWithPlaylist={isDropdownOpen} />}

          {isMonitorOpen && (
            <MonitorView
              monitorType={monitorType}
              setMonitorType={setMonitorType}
              imageFit={imageFit}
              toggleImageFit={toggleImageFit}
              monitorImage={monitorImage}
              slideshowIndex={slideshowIndex}
              currentTrack={currentTrack}
              className={isDropdownOpen ? 'unit-monitor-with-playlist' : ''}
            />
          )}

          {/* Track Info */}
          <div
            className="unit-player-info-container"
            onClick={() => setIsMiniMode(true)}
            title={t('music.minimize')}
            onMouseEnter={() => setIsHoveringDisc(true)}
            onMouseLeave={() => !dragData.isDragging && setIsHoveringDisc(false)}
          >
            <div
              className={`unit-player-disc-small ${isPlaying ? 'unit-music-playing' : 'unit-music-paused'} ${dragData.isDragging ? 'unit-disc-dragging' : ''}`}
              {...dragHandlers}
            >
              <img src={postData.metadata.logo} alt={currentTrack.title} className="unit-full-img" />
              <div className="unit-player-minimize-overlay">
                <TbMinimize size={20} />
              </div>
            </div>
            <MarqueeText
              text={currentTrack.title}
              containerClassName="unit-player-marquee"
              className="unit-player-track-title"
            />
          </div>

          {/* Controls */}
          <div className="unit-player-controls">
            <button onClick={prevTrack} className="unit-player-btn-secondary" aria-label="Previous track">
              <IoPlayBack size={24} />
            </button>
            <button onClick={togglePlay} className="unit-player-btn-primary" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} style={{ transform: 'translateX(2px)' }} />}
            </button>
            <button onClick={nextTrack} className="unit-player-btn-secondary" aria-label="Next track">
              <IoPlayForward size={24} />
            </button>
          </div>

          {/* Actions */}
          <div className="unit-player-actions">
            <div className="unit-relative">
              <button
                onClick={handleMonitorToggle}
                className={`unit-player-btn-icon ${isMonitorOpen ? 'unit-player-btn-icon-active' : ''}`}
                title={t('music.monitor')}
              >
                <IoDesktopOutline size={22} />
              </button>
            </div>

            <div className="unit-relative">
              <button
                onClick={handlePlaylistToggle}
                className={`unit-player-btn-icon ${isDropdownOpen ? 'unit-player-btn-icon-active' : ''}`}
                title={t('music.playlist')}
              >
                <IoList size={22} />
              </button>

              {isDropdownOpen && (
                <div className={`unit-player-playlist-dropdown ${isMonitorOpen ? 'unit-playlist-with-monitor' : ''}`}>
                  <div className="unit-playlist-header">
                    <span>{t('music.playlist')}</span>
                    <button onClick={() => setIsDropdownOpen(false)} aria-label="Close playlist"><IoClose size={22} /></button>
                  </div>
                  <div className="unit-playlist-list unit-custom-scrollbar">
                    {playlist.map((track, index) => (
                      <button
                        key={track.id}
                        onClick={() => {
                          playTrack(index)
                          if (!isMonitorOpen) {
                            setIsDropdownOpen(false)
                          }
                        }}
                        className={`unit-playlist-item ${currentTrack.id === track.id ? 'unit-playlist-item-active' : ''}`}
                      >
                        <div className="unit-playlist-item-img">
                          <img src={postData.metadata.logo} alt="" className="unit-full-img" />
                        </div>
                        <MarqueeText
                          text={track.title}
                          hoverOnly={true}
                          containerClassName="unit-flex-grow"
                          className="unit-playlist-item-title"
                        />
                        {currentTrack.id === track.id && isPlaying && (
                          <div className="unit-music-bars">
                            <div className="unit-music-bar-1"></div>
                            <div className="unit-music-bar-2"></div>
                            <div className="unit-music-bar-3"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={stopPlayer}
              className="unit-player-btn-icon"
              title={t('music.turn_off')}
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

DesktopPlayerBar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  currentTrack: PropTypes.object.isRequired,
  togglePlay: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  prevTrack: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  stopPlayer: PropTypes.func.isRequired,
  isMiniMode: PropTypes.bool.isRequired,
  setIsMiniMode: PropTypes.func.isRequired,
  playlist: PropTypes.array.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
  isMonitorOpen: PropTypes.bool.isRequired,
  setIsMonitorOpen: PropTypes.func.isRequired,
  monitorType: PropTypes.string.isRequired,
  setMonitorType: PropTypes.func.isRequired,
  imageFit: PropTypes.string.isRequired,
  toggleImageFit: PropTypes.func.isRequired,
  monitorImage: PropTypes.string.isRequired,
  slideshowIndex: PropTypes.number.isRequired,
  dragData: PropTypes.object.isRequired,
  isHoveringDisc: PropTypes.bool.isRequired,
  setIsHoveringDisc: PropTypes.func.isRequired,
  dragHandlers: PropTypes.object.isRequired,
}

export default DesktopPlayerBar
