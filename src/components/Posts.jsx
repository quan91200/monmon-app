import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import { HiOutlineViewGrid, HiOutlineViewList, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

import postData from '../api/users.json'
import { VIEW_MODES } from '../constants'
import usePosts from '../hooks/usePosts'
import Pagination from './Pagination'
import Search from './Search'
import { useStatusCardPostContext } from '../context/StatusCardPostContext'

/**
 * Posts Component - Orchestrates the display of user posts in List or Grid view.
 * Adheres to the Container/Presentational design pattern.
 *
 * @returns {JSX.Element} The rendered Posts component.
 */
const Posts = () => {
    const { posts, users } = postData
    const { t, i18n } = useTranslation("global")
    const { isAllExpanded, toggleAllExpanded } = useStatusCardPostContext()
    const [expandTrigger, setExpandTrigger] = useState(0)
    const [searchLocal, setSearchLocal] = useState('')
    const [filteredPosts, setFilteredPosts] = useState(posts)

    const handleToggleAll = (val) => {
        toggleAllExpanded(val)
        setExpandTrigger(prev => prev + 1)
    }

    useEffect(() => {
        const query = searchLocal.toLowerCase()
        const filtered = posts.filter(post => {
            const user = users[post.user_id]
            return (
                post.content.toLowerCase().includes(query) ||
                (user && user.name.toLowerCase().includes(query)) ||
                (user && user.nickname.toLowerCase().includes(query))
            )
        })
        setFilteredPosts(filtered)
        handlePageChange(1)
    }, [searchLocal, posts, users])

    const {
        currentPage,
        viewMode,
        currentPosts,
        totalPages,
        handleViewModeChange,
        handlePageChange
    } = usePosts(filteredPosts)

    const handleSearch = (query) => {
        setSearchLocal(query)
    }

    const handleClear = () => {
        setSearchLocal('')
    }

    /**
     * Formats a date string based on the current application language.
     * Handles the custom format: "Friday, 03-01-2025 15:32"
     *
     * @param {string} dateString - The date string from the API.
     * @returns {string} The localized date string.
     */
    const formatDate = (dateString) => {
        try {
            // Check if it's the custom format: "Name, DD-MM-YYYY HH:mm"
            const customFormatRegex = /^.*, (\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/
            const match = dateString.match(customFormatRegex)

            let date
            if (match) {
                const [, day, month, year, hour, minute] = match
                // Month is 0-indexed
                date = new Date(year, month - 1, day, hour, minute)
            } else {
                date = new Date(dateString)
            }

            // Fallback for real invalid dates
            if (isNaN(date.getTime())) {
                return dateString
            }

            return date.toLocaleString(i18n.language, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        } catch (error) {
            console.error("Date parsing error:", error)
            return dateString
        }
    }

    return (
        <div className="unit-container unit-page-posts">
            {/* View Mode and Expand Controls */}
            <div className="unit-posts-controls">
                <Search onSearch={handleSearch} onClear={handleClear} />

                <div className="unit-posts-actions">
                    {/* View Mode Toggle */}
                    <div className="unit-view-mode-toggle">
                        <button
                            onClick={() => handleViewModeChange(VIEW_MODES.LIST)}
                            className={`unit-toggle-btn ${viewMode === VIEW_MODES.LIST ? 'unit-toggle-btn-active' : ''}`}
                            title={t('post_view.list')}
                        >
                            <HiOutlineViewList size={20} />
                            <span className="unit-toggle-label unit-hide-mobile">{t('post_view.list')}</span>
                        </button>
                        <button
                            onClick={() => handleViewModeChange(VIEW_MODES.GRID)}
                            className={`unit-toggle-btn ${viewMode === VIEW_MODES.GRID ? 'unit-toggle-btn-active' : ''}`}
                            title={t('post_view.grid')}
                        >
                            <HiOutlineViewGrid size={20} />
                            <span className="unit-toggle-label unit-hide-mobile">{t('post_view.grid')}</span>
                        </button>
                    </div>

                    {/* Combined Expand/Collapse All Toggle (Desktop Only) */}
                    {viewMode === VIEW_MODES.LIST && (
                        <div className="unit-expand-all-toggle unit-hide-mobile">
                            <button
                                onClick={() => handleToggleAll(!isAllExpanded)}
                                className={`unit-toggle-btn unit-expand-toggle ${isAllExpanded ? 'unit-active' : ''}`}
                                title={isAllExpanded ? "Collapse All" : "Expand All"}
                            >
                                {isAllExpanded ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {viewMode === VIEW_MODES.LIST ? (
                <ListView
                    posts={currentPosts}
                    users={users}
                    formatDate={formatDate}
                    t={t}
                    expandTrigger={expandTrigger}
                />
            ) : (
                <GridView posts={currentPosts} users={users} t={t} />
            )}

            {/* Pagination Component */}
            <div className="unit-pagination-wrap">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

/**
 * List View Presentational Component
 */
const ListView = ({ posts, users, formatDate, t, expandTrigger }) => (
    <div className="unit-list-view">
        {posts.map((post) => (
            <StatusCard
                key={`${post.created_at}-${post.user_id}`}
                post={post}
                user={users[post.user_id]}
                formatDate={formatDate}
                t={t}
                expandTrigger={expandTrigger}
            />
        ))}
    </div>
)

/**
 * StatusCard Component - Individual Post Item with Collapse/Expand functionality
 */
const StatusCard = ({ post, user, formatDate, t, expandTrigger }) => {
    const { isAllExpanded } = useStatusCardPostContext()
    const [isExpanded, setIsExpanded] = useState(isAllExpanded)

    // Sync with global state changes via trigger
    useEffect(() => {
        setIsExpanded(isAllExpanded)
    }, [isAllExpanded, expandTrigger])

    if (!user) return null

    const isMon = user.nickname === 'Mon'

    return (
        <article
            className={`unit-status-card ${isMon ? 'unit-status-mon' : 'unit-status-other'}`}
        >
            <div className={`unit-status-card-inner ${isExpanded ? 'unit-expanded' : 'unit-collapsed'}`}>
                {/* Header Section */}
                <div
                    className="unit-status-header"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="unit-status-user-info">
                        <div className="unit-status-avatar-wrap">
                            <div className="unit-status-avatar-glow"></div>
                            <LazyLoad height={isExpanded ? 64 : 48} offset={100} once>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="unit-status-avatar"
                                />
                            </LazyLoad>
                            <div className="unit-status-indicator"></div>
                        </div>

                        <div className="unit-status-name-stack">
                            <div className="unit-status-names">
                                <h3 className="unit-status-display-name">
                                    {user.name}
                                </h3>
                                <div className="unit-status-handle">
                                    <span>@{user.nickname}</span>
                                </div>
                            </div>

                            <div className="unit-status-meta">
                                <span className={`unit-status-dot ${post.status === 'public' ? 'unit-bg-green' : 'unit-bg-amber'}`}></span>
                                <time className="unit-status-time">
                                    {formatDate(post.created_at)}
                                </time>
                                {!isExpanded && (
                                    <span className={`unit-status-badge ${post.status === 'public' ? 'unit-badge-green' : 'unit-badge-amber'}`}>
                                        {t(post.status)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="unit-status-header-actions">
                        {isExpanded && (
                            <span className={`unit-status-badge-lg unit-hide-mobile ${post.status === 'public' ? 'unit-bg-green-text-white' : 'unit-bg-amber-text-white'}`}>
                                {t(post.status)}
                            </span>
                        )}
                        <div className="unit-status-expand-icon unit-hide-expand-icon">
                            {isExpanded ? <HiOutlineChevronUp size={24} /> : <HiOutlineChevronDown size={24} />}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div
                    className={`unit-status-content-wrap ${!isExpanded ? 'unit-clickable' : ''}`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    <div className="unit-status-text-box">
                        <p className={`unit-status-text ${isExpanded ? 'unit-text-large' : 'unit-text-collapsed'}`}>
                            {post.content}
                        </p>
                        {!isExpanded && (
                            <div className="unit-status-expand-hint">
                                {t('music.expand')} →
                            </div>
                        )}
                    </div>
                </div>

                {/* Media Section */}
                {isExpanded && (
                    <div className="unit-status-media">
                        {post.image && (
                            <div className="unit-status-image-wrap">
                                <LazyLoad height={400} offset={100} once>
                                    <img
                                        src={post.image}
                                        alt="Post visual"
                                    />
                                </LazyLoad>
                                <div className="unit-status-image-overlay"></div>
                            </div>
                        )}

                        <div className="unit-status-footer-mobile unit-show-mobile">
                            <span className={`unit-status-badge ${post.status === 'public' ? 'unit-bg-green-text-white' : 'unit-bg-amber-text-white'}`}>
                                {t(post.status)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

StatusCard.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    formatDate: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    expandTrigger: PropTypes.number
}

/**
 * Grid View Presentational Component
 */
const GridView = ({ posts, users, t }) => (
    <div className="unit-grid-view">
        {posts.map((post) => {
            const user = users[post.user_id]
            if (!user) return null

            return (
                <div
                    key={`${post.created_at}-${post.user_id}`}
                    className="unit-grid-post"
                >
                    {post.image ? (
                        <LazyLoad height={300} offset={100} once>
                            <img
                                src={post.image}
                                alt="Post"
                                className="unit-grid-image"
                            />
                        </LazyLoad>
                    ) : (
                        <div className="unit-grid-text-only">
                            <p>
                                {post.content}
                            </p>
                        </div>
                    )}

                    <div className="unit-grid-overlay">
                        <div className="unit-grid-user">
                            <div className="unit-grid-avatar-wrap">
                                <LazyLoad height={56} offset={100} once>
                                    <img
                                        src={user.avatar}
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="unit-grid-user-info">
                                <span className="unit-grid-handle">@{user.nickname}</span>
                                <span className="unit-grid-premium">{t('post_view.premium')}</span>
                            </div>
                        </div>
                        <p className="unit-grid-content-snippet">
                            {post.content}
                        </p>
                    </div>
                </div>
            )
        })}
    </div>
)

ListView.propTypes = {
    posts: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    formatDate: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    expandTrigger: PropTypes.number
}

GridView.propTypes = {
    posts: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
}

export default Posts
