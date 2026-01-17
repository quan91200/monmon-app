import { useState, useEffect } from 'react'
import { MONITOR_TYPES, SLIDESHOW_INTERVAL, IMAGE_FIT_MODES } from '../constants/music'
import postData from '../api/users.json'

/**
 * Custom hook to manage the local UI state and logic of the Music Player.
 * 
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isMiniMode - The current mini mode state from context.
 * @param {Array} params.playlist - The current playlist.
 * @param {Object} params.currentTrack - The currently playing track.
 * @returns {Object} The local state and handlers for the Music Player.
 */
export const useMusicPlayerState = ({ isMiniMode, playlist, currentTrack }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMonitorOpen, setIsMonitorOpen] = useState(false)
  const [monitorType, setMonitorType] = useState(MONITOR_TYPES.VIDEO)
  const [imageFit, setImageFit] = useState(IMAGE_FIT_MODES[0])
  const [slideshowIndex, setSlideshowIndex] = useState(0)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(false)

  // Slideshow logic
  useEffect(() => {
    let interval
    if (isMonitorOpen && monitorType === MONITOR_TYPES.VIDEO) {
      interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % postData.posts.length)
      }, SLIDESHOW_INTERVAL)
    }
    return () => clearInterval(interval)
  }, [isMonitorOpen, monitorType])

  // Handle body scroll lock
  useEffect(() => {
    const isLocked = isMonitorOpen || isMobileModalOpen || isMobilePlaylistOpen

    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMonitorOpen, isMobileModalOpen, isMobilePlaylistOpen])

  // Close overlays when switching to mini mode
  useEffect(() => {
    if (isMiniMode) {
      setIsMonitorOpen(false)
      setIsDropdownOpen(false)
    }
  }, [isMiniMode])

  // Sync image with track index
  const currentTrackIndex = playlist.findIndex(t => t.id === currentTrack?.id)
  const monitorImage = postData.posts[currentTrackIndex % postData.posts.length]?.image || postData.metadata.logo

  const toggleImageFit = () => {
    const nextIndex = (IMAGE_FIT_MODES.indexOf(imageFit) + 1) % IMAGE_FIT_MODES.length
    setImageFit(IMAGE_FIT_MODES[nextIndex])
  }

  return {
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
  }
}
