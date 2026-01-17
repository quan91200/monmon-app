import {
  IoPlayBack,
  IoPlayForward,
  IoPlay,
  IoPause,
  IoClose,
  IoList,
  IoChevronDown
} from "react-icons/io5"

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import MarqueeText from '../common/MarqueeText'

import postData from '../../api/users.json'

/**
 * MobileMusicModal - Full-screen playback interface for mobile devices.
 * 
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
const MobileMusicModal = ({
  isPlaying,
  currentTrack,
  togglePlay,
  nextTrack,
  prevTrack,
  playTrack,
  playlist,
  setIsMobileModalOpen,
  isMobilePlaylistOpen,
  setIsMobilePlaylistOpen,
  dragData,
  dragHandlers,
}) => {
  const { t } = useTranslation('global')

  if (!currentTrack) return null

  return (
    <div className="unit-mobile-player-modal">
      {/* Header */}
      <div className="unit-modal-header-compact">
        <button onClick={() => setIsMobileModalOpen(false)} className="unit-modal-close-btn" aria-label="Minimize">
          <IoChevronDown size={30} />
        </button>
        <div className="unit-modal-title-stack">
          <span className="unit-modal-subtitle">{t('music.playing_from')}</span>
          <span className="unit-modal-main-title">{postData.appFullName}</span>
        </div>
        <button onClick={() => setIsMobileModalOpen(false)} className="unit-modal-close-btn" aria-label="Close">
          <IoClose size={30} />
        </button>
      </div>

      {/* Body */}
      <div className="unit-modal-body">
        {/* Rotating Large Avatar */}
        <div
          className={`unit-modal-disc-large ${isPlaying ? 'unit-music-playing' : 'unit-music-paused'} ${dragData.isDragging ? 'unit-disc-dragging' : ''}`}
          {...dragHandlers}
        >
          <img src={postData.metadata.logo} alt="Album Art" className="unit-full-img" />
          <div className="unit-disc-groove-large unit-scale-90"></div>
          <div className="unit-disc-groove-large unit-scale-75"></div>
          <div className="unit-disc-groove-large unit-scale-50"></div>
          <div className="unit-disc-center"></div>
        </div>

        {/* Track Info */}
        <div className="unit-modal-track-info">
          <MarqueeText
            text={currentTrack.title}
            containerClassName="unit-modal-marquee-wrapper"
            className="unit-modal-track-name"
          />
          <p className="unit-modal-track-label">{postData.appName} {t('music.radio')}</p>
        </div>

        {/* Controls */}
        <div className="unit-modal-controls">
          <button onClick={prevTrack} className="unit-modal-btn-step" aria-label="Previous">
            <IoPlayBack size={32} />
          </button>

          <button onClick={togglePlay} className="unit-modal-btn-play" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} style={{ transform: 'translateX(3px)' }} />}
          </button>

          <button onClick={nextTrack} className="unit-modal-btn-step" aria-label="Next">
            <IoPlayForward size={32} />
          </button>
        </div>

        {/* Extra Actions */}
        <div className="unit-modal-actions">
          <button onClick={() => setIsMobilePlaylistOpen(true)} className="unit-modal-action-btn" aria-label="Open Playlist">
            <div className="unit-action-icon-wrapper">
              <IoList size={24} />
            </div>
          </button>
        </div>
      </div>

      {/* Sub-modal: Playlist Mobile */}
      {isMobilePlaylistOpen && (
        <div className="unit-mobile-playlist-screen unit-animate-slide-up">
          <div className="unit-playlist-screen-header">
            <div className="unit-playlist-header-text">
              <span className="unit-playlist-subtitle">{t('music.playlist')}</span>
              <span className="unit-playlist-count">{playlist.length} {t('music.tracks')}</span>
            </div>
            <button
              onClick={() => setIsMobilePlaylistOpen(false)}
              className="unit-playlist-close-btn"
              aria-label="Close Playlist"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="unit-playlist-screen-list unit-custom-scrollbar">
            {playlist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  playTrack(index)
                  setIsMobilePlaylistOpen(false)
                }}
                className={`unit-playlist-screen-item ${currentTrack.id === track.id ? 'unit-playlist-screen-item-active' : ''}`}
              >
                <div className="unit-playlist-screen-item-img">
                  <img src={postData.metadata.logo} alt="" className="unit-full-img" />
                  {currentTrack.id === track.id && (
                    <div className="unit-playlist-item-playing-overlay">
                      <div className={`unit-playing-indicator-dot ${isPlaying ? 'unit-animate-pulse' : ''}`}></div>
                    </div>
                  )}
                </div>
                <div className="unit-playlist-screen-item-info">
                  <span className="unit-playlist-screen-item-title">
                    {track.title}
                  </span>
                  <span className="unit-playlist-screen-item-subtitle">{postData.appName} {t('music.archive')}</span>
                </div>
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
  )
}

MobileMusicModal.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  currentTrack: PropTypes.object,
  togglePlay: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  prevTrack: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  playlist: PropTypes.array.isRequired,
  setIsMobileModalOpen: PropTypes.func.isRequired,
  isMobilePlaylistOpen: PropTypes.bool.isRequired,
  setIsMobilePlaylistOpen: PropTypes.func.isRequired,
  dragData: PropTypes.object.isRequired,
  dragHandlers: PropTypes.object.isRequired,
}

export default MobileMusicModal
