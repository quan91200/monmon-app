import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useMusic } from '../context/MusicContext'
import { useDiscDrag } from '../hooks/useDiscDrag'
import { useMusicPlayerState } from '../hooks/useMusicPlayerState'

import DiscDragOverlay from './DiscDragOverlay'
import DesktopPlayerBar from './music/DesktopPlayerBar'
import MiniDiscPlayer from './music/MiniDiscPlayer'
import MobileMusicModal from './music/MobileMusicModal'

import postData from '../api/users.json'

/**
 * MusicPlayer - Orchestrator component for the music playback system.
 * It manages the different display modes (Desktop Bar, Mini Disc, Mobile Modal)
 * and connects the global music context with local UI state.
 * 
 * @returns {JSX.Element|null} The rendered component or null if no track is selected.
 */
const MusicPlayer = () => {
  const { t } = useTranslation('global')

  // Global Music State
  const {
    isPlaying,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    playTrack,
    stopPlayer,
    isPlayerVisible,
    isMiniMode,
    setIsMiniMode,
    playlist
  } = useMusic()

  // Local UI State & Logic
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    isMonitorOpen,
    setIsMonitorOpen,
    monitorType,
    setMonitorType,
    imageFit,
    toggleImageFit,
    slideshowIndex,
    isMobileModalOpen,
    setIsMobileModalOpen,
    isMobilePlaylistOpen,
    setIsMobilePlaylistOpen,
    monitorImage,
  } = useMusicPlayerState({ isMiniMode, playlist, currentTrack })

  // Drag & Drop Logic
  const {
    dragData,
    isHovering: isHoveringDisc,
    dropZoneRef,
    handlers: dragHandlers
  } = useDiscDrag({
    onDropSuccess: stopPlayer,
    enabled: true
  })

  // State to manage disc hovering specifically for drag visuals
  const [isHoveringForVisuals, setIsHoveringForVisuals] = useState(false)

  if (!isPlayerVisible || !currentTrack) return null

  const dropZoneText = t('music.drop_to_stop') || 'Drop here to stop'

  return (
    <>
      {/* Backdrop for Monitor/Mobile Modal */}
      <div
        className={`unit-player-monitor-backdrop ${isMonitorOpen ? 'active' : ''}`}
        onClick={() => setIsMonitorOpen(false)}
      />

      {/* Drag & Drop Visuals Layer */}
      <DiscDragOverlay
        dragData={dragData}
        isHovering={isHoveringDisc || isHoveringForVisuals}
        dropZoneRef={dropZoneRef}
        dropZoneText={dropZoneText}
        logo={postData.metadata.logo}
        isMiniMode={isMiniMode}
      />

      {/* Desktop Interface */}
      <DesktopPlayerBar
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        togglePlay={togglePlay}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
        playTrack={playTrack}
        stopPlayer={stopPlayer}
        isMiniMode={isMiniMode}
        setIsMiniMode={setIsMiniMode}
        playlist={playlist}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isMonitorOpen={isMonitorOpen}
        setIsMonitorOpen={setIsMonitorOpen}
        monitorType={monitorType}
        setMonitorType={setMonitorType}
        imageFit={imageFit}
        toggleImageFit={toggleImageFit}
        monitorImage={monitorImage}
        slideshowIndex={slideshowIndex}
        dragData={dragData}
        isHoveringDisc={isHoveringDisc}
        setIsHoveringDisc={setIsHoveringForVisuals}
        dragHandlers={dragHandlers}
      />

      {/* Mini Mode Discs (Desktop & Mobile) */}
      <MiniDiscPlayer
        isMiniMode={isMiniMode}
        setIsMiniMode={setIsMiniMode}
        isPlaying={isPlaying}
        stopPlayer={stopPlayer}
        dragData={dragData}
        dragHandlers={dragHandlers}
        setIsMobileModalOpen={setIsMobileModalOpen}
      />

      {/* Mobile Modal View */}
      {isMobileModalOpen && (
        <MobileMusicModal
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          togglePlay={togglePlay}
          nextTrack={nextTrack}
          prevTrack={prevTrack}
          playTrack={playTrack}
          playlist={playlist}
          setIsMobileModalOpen={setIsMobileModalOpen}
          isMobilePlaylistOpen={isMobilePlaylistOpen}
          setIsMobilePlaylistOpen={setIsMobilePlaylistOpen}
          dragData={dragData}
          dragHandlers={dragHandlers}
        />
      )}
    </>
  )
}

export default MusicPlayer
