import { useState, useEffect } from 'react'
import { GALLERY, BREAKPOINTS } from '../constants'
import { useGalleryContext } from '../context/GalleryContext'

/**
 * Custom hook to manage gallery logic: view modes, masonry distribution, and lightbox state.
 * Consumes shared state from GalleryContext.
 * 
 * @param {Array} posts - Array of post objects with images.
 * @returns {Object} State and handlers for gallery management.
 */
const useGallery = (posts) => {
  const { galleryViewMode, handleGalleryViewModeChange, galleryAutoplay } = useGalleryContext()

  const [model, setModel] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState('')
  const [visibleCount, setVisibleCount] = useState(GALLERY.INITIAL_COUNT)
  const [numColumns, setNumColumns] = useState(GALLERY.COLUMNS.DESKTOP)

  /**
   * Opens the lightbox with the specified image.
   * @param {string} imgSrc - Source URL of the image.
   */
  const openImage = (imgSrc) => {
    setTempImgSrc(imgSrc)
    setModel(true)
  }

  // Closes the lightbox
  const closeImage = () => {
    setModel(false)
  }

  /**
   * Loads the next batch of images.
   */
  const loadMore = () => {
    if (visibleCount < posts.length) {
      setVisibleCount((prev) => prev + GALLERY.BATCH_SIZE)
    }
  }

  // Responsive Masonry Columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= BREAKPOINTS.LAPTOP) setNumColumns(GALLERY.COLUMNS.DESKTOP)
      else if (window.innerWidth >= BREAKPOINTS.TABLET) setNumColumns(GALLERY.COLUMNS.TABLET)
      else if (window.innerWidth >= BREAKPOINTS.MOBILE) setNumColumns(GALLERY.COLUMNS.MOBILE_L)
      else setNumColumns(GALLERY.COLUMNS.MOBILE_S)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  /**
   * Distributes visible posts into column arrays for masonry layout.
   * @returns {Array[]} Array of column arrays.
   */
  const getMasonryColumns = () => {
    const visiblePosts = posts.slice(0, visibleCount)
    const columns = Array.from({ length: numColumns }, () => [])

    visiblePosts.forEach((post, index) => {
      columns[index % numColumns].push(post)
    })

    return columns
  }

  return {
    model,
    tempImgSrc,
    visibleCount,
    openImage,
    closeImage,
    getMasonryColumns,
    loadMore,
    featuredPosts: posts.slice(0, GALLERY.FEATURED_COUNT),
    hasMore: visibleCount < posts.length,
    galleryViewMode,
    handleGalleryViewModeChange,
    galleryAutoplay
  }
}

export default useGallery
