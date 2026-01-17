import { createContext, useContext, useState, useRef, useEffect } from 'react'
import postData from '../api/users.json'

const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const playlist = postData.metadata.playlist || []

  // Initialize state from localStorage
  const getSavedState = () => {
    try {
      const saved = localStorage.getItem('monmon_music_state')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  }

  const savedState = getSavedState()

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const savedIndex = savedState?.currentTrackIndex || 0
    return savedIndex < playlist.length ? savedIndex : 0
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(savedState?.volume ?? 0.5)
  const [isPlayerVisible, setIsPlayerVisible] = useState(savedState?.isPlayerVisible || false)

  const [isMiniMode, setIsMiniMode] = useState(savedState?.isMiniMode || false)

  const audioRef = useRef(new Audio())
  /* const playlist = postData.metadata.playlist || [] */
  const currentTrack = playlist[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    const onTrackEnd = () => {
      nextTrack()
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', onTrackEnd)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', onTrackEnd)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.url
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback failed:", err))
      }
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    localStorage.setItem('monmon_music_state', JSON.stringify({
      currentTrackIndex,
      volume,
      isPlayerVisible,
      isMiniMode
    }))
  }, [currentTrackIndex, volume, isPlayerVisible, isMiniMode])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  const togglePlay = () => {
    if (!isPlayerVisible) setIsPlayerVisible(true)
    setIsPlaying(!isPlaying)
  }

  const playTrack = (index) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
  }

  const stopPlayer = () => {
    setIsPlaying(false)
    setIsPlayerVisible(false)
    setIsMiniMode(false)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return (
    <MusicContext.Provider value={{
      isPlaying,
      currentTrack,
      currentTime,
      duration,
      volume,
      isPlayerVisible,
      isMiniMode,
      playlist,
      togglePlay,
      nextTrack,
      prevTrack,
      playTrack,
      setVolume,
      stopPlayer,
      setIsPlayerVisible,
      setIsMiniMode
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => useContext(MusicContext)
