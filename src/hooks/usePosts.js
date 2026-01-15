import { usePostContext } from '../context/PostContext'
import { VIEW_MODES, PAGINATION } from '../constants'

/**
 * Custom hook to manage posts state, pagination, and view modes.
 * Consumes shared state from PostContext to ensure consistency.
 * 
 * @param {Array} posts - Array of post objects.
 * @returns {Object} State and handlers for posts management.
 */
const usePosts = (posts) => {
  const {
    currentPage,
    viewMode,
    handleViewModeChange,
    handlePageChange
  } = usePostContext()

  const postsPerPage = viewMode === VIEW_MODES.LIST
    ? PAGINATION.POSTS_PER_PAGE_LIST
    : PAGINATION.POSTS_PER_PAGE_GRID

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return {
    currentPage,
    viewMode,
    postsPerPage,
    currentPosts,
    totalPages,
    handleViewModeChange,
    handlePageChange
  }
}

export default usePosts
