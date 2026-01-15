/**
 * Application-wide constants
 */

export const STORAGE_KEYS = {
  VIEW_MODE: 'viewMode',
  CURRENT_PAGE: 'currentPage',
  SNOW_EFFECT: 'snowEffect',
  BACK_TO_TOP_CONFIG: 'backToTopConfig',
  THEME: 'theme',
  TOAST_PERSISTENCE: 'toastPersistence',
  GALLERY_VIEW_MODE: 'galleryViewMode',
  GALLERY_AUTOPLAY: 'galleryAutoplay',
}

export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
}

export const GALLERY_VIEW_MODES = {
  CAROUSEL: 'carousel',
  GRID: 'grid',
  LIGHTBOX: 'lightbox',
}

export const PAGINATION = {
  POSTS_PER_PAGE_LIST: 5,
  POSTS_PER_PAGE_GRID: 12,
  MAX_DISPLAY_DESKTOP: 5,
  MAX_DISPLAY_MOBILE: 3,
}

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
}

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  INLOVE: '/inlove',
  COUNTDOWN: '/countdown',
  SETTINGS: '/settings',
}

export const LANGUAGES = {
  VN: 'vn',
  EN: 'en',
  CN: 'cn',
}

export const GALLERY = {
  INITIAL_COUNT: 12,
  BATCH_SIZE: 12,
  FEATURED_COUNT: 8,
  COLUMNS: {
    DESKTOP: 4,
    TABLET: 3,
    MOBILE_L: 2,
    MOBILE_S: 1,
  }
}
export const NAVBAR = {
  SCROLL_THRESHOLD: 20,
  FLAGS: {
    vn: "https://flagcdn.com/w40/vn.png",
    en: "https://flagcdn.com/w40/us.png",
    cn: "https://flagcdn.com/w40/cn.png"
  }
}
