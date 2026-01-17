/**
 * Constants related to the Music Player feature.
 */

export const MONITOR_TYPES = {
  VIDEO: 'video',
  IMAGE: 'image',
  TEXT: 'text',
}

export const IMAGE_FIT_MODES = ['cover', 'contain', 'top', 'bottom']

export const SLIDESHOW_INTERVAL = 10000

export const BREAKPOINT_DESKTOP = 1024

export const MONITOR_TABS = [
  { id: MONITOR_TYPES.VIDEO, icon: 'IoVideocam', label: 'music.video' },
  { id: MONITOR_TYPES.IMAGE, icon: 'IoImage', label: 'music.image' },
  { id: MONITOR_TYPES.TEXT, icon: 'IoText', label: 'music.text' },
]
