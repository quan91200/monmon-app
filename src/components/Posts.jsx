import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { HiOutlineViewGrid, HiOutlineViewList, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

import postData from '../api/users.json'
import { VIEW_MODES } from '../constants'
import usePosts from '../hooks/usePosts'
import Pagination from './Pagination'
import Search from './Search'
import { useStatusCardPostContext } from '../context/StatusCardPostContext'
import { useEffect } from 'react'

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
    const [searchQuery, setSearchQuery] = useState('')
    const [expandTrigger, setExpandTrigger] = useState(0)

    const handleToggleAll = (val) => {
        toggleAllExpanded(val)
        setExpandTrigger(prev => prev + 1)
    }

    const filteredPosts = posts.filter(post => {
        const user = users[post.user_id]
        const searchLower = searchQuery.toLowerCase()
        return (
            post.content.toLowerCase().includes(searchLower) ||
            (user && user.name.toLowerCase().includes(searchLower)) ||
            (user && user.nickname.toLowerCase().includes(searchLower))
        )
    })

    const {
        currentPage,
        viewMode,
        currentPosts,
        totalPages,
        handleViewModeChange,
        handlePageChange
    } = usePosts(filteredPosts)

    const handleSearch = (query) => {
        setSearchQuery(query)
        handlePageChange(1) // Reset to first page on search
    }

    const handleClear = () => {
        setSearchQuery('')
        handlePageChange(1)
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
        <div className="app-container pb-12">
            {/* Search and View Mode Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 px-6 sm:px-10">
                <Search onSearch={handleSearch} onClear={handleClear} />

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                    {/* View Mode Toggle */}
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1 flex-shrink-0">
                        <button
                            onClick={() => handleViewModeChange(VIEW_MODES.LIST)}
                            className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 px-3 sm:px-4 ${viewMode === VIEW_MODES.LIST
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <HiOutlineViewList size={20} />
                            <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">{t('post_view.list')}</span>
                        </button>
                        <button
                            onClick={() => handleViewModeChange(VIEW_MODES.GRID)}
                            className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 px-3 sm:px-4 ${viewMode === VIEW_MODES.GRID
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <HiOutlineViewGrid size={20} />
                            <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">{t('post_view.grid')}</span>
                        </button>
                    </div>

                    {/* Collapse/Expand All (Only for List View) */}
                    {viewMode === VIEW_MODES.LIST && (
                        <div className="flex gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex-shrink-0">
                            <button
                                onClick={() => handleToggleAll(false)}
                                className={`p-2 rounded-xl transition-all duration-300 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 ${!isAllExpanded ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' : ''}`}
                                title="Collapse All"
                            >
                                <HiOutlineChevronUp size={20} />
                            </button>
                            <button
                                onClick={() => handleToggleAll(true)}
                                className={`p-2 rounded-xl transition-all duration-300 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 ${isAllExpanded ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' : ''}`}
                                title="Expand All"
                            >
                                <HiOutlineChevronDown size={20} />
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
            <div className="pt-6">
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
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
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
            className={`group relative overflow-hidden rounded-[2rem] transition-all duration-500 hover:shadow-2xl border ${isMon
                ? 'bg-gradient-to-br from-pink-50/80 via-white/40 to-white dark:from-pink-950/20 dark:via-gray-900/40 dark:to-gray-900 border-pink-100/50 dark:border-pink-900/20 shadow-pink-100/20'
                : 'bg-gradient-to-br from-blue-50/80 via-white/40 to-white dark:from-blue-950/20 dark:via-gray-900/40 dark:to-gray-900 border-blue-100/50 dark:border-blue-900/20 shadow-blue-100/20'
                } backdrop-blur-sm shadow-xl`}
        >
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'p-6 sm:p-10' : 'p-4 sm:p-6'}`}>
                {/* Header Section */}
                <div
                    className={`flex items-center justify-between cursor-pointer group/header select-none ${isExpanded ? 'mb-8' : 'mb-0'}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative flex-shrink-0">
                            <div className={`absolute -inset-1 rounded-full bg-gradient-to-tr opacity-0 group-hover/header:opacity-100 transition-opacity duration-500 ${isMon ? 'from-pink-400 to-rose-400' : 'from-blue-400 to-indigo-400'} blur-[2px]`}></div>
                            <LazyLoad height={isExpanded ? 64 : 48} offset={100} once>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className={`relative rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-xl transition-all duration-500 ${isExpanded ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'}`}
                                />
                            </LazyLoad>
                            <div className={`absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white dark:border-gray-800 shadow-lg ${isMon ? 'bg-pink-500' : 'bg-blue-500'} z-10 animate-glow-pulse`}></div>
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-black text-gray-900 dark:text-white transition-all duration-500 tracking-tight leading-none ${isExpanded ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                                    {user.name}
                                </h3>
                                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full backdrop-blur-md transition-all duration-300 ${isMon ? 'bg-pink-100/50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                    }`}>
                                    <span className="text-[10px] sm:text-xs font-bold font-zendots">@{user.nickname}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'public' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                <time className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider opacity-70">
                                    {formatDate(post.created_at)}
                                </time>
                                {!isExpanded && (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${post.status === 'public' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                                        }`}>
                                        {t(post.status)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isExpanded && (
                            <span className={`hidden sm:inline-flex items-center px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${post.status === 'public' ? 'bg-green-500 text-white shadow-green-200' : 'bg-amber-500 text-white shadow-amber-200'
                                }`}>
                                {t(post.status)}
                            </span>
                        )}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 group-hover/header:scale-110 group-hover/header:rotate-180 transition-all duration-500">
                            {isExpanded ? <HiOutlineChevronUp size={24} /> : <HiOutlineChevronDown size={24} />}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div
                    className={`transition-all duration-500 ease-in-out ${isExpanded ? 'mt-0' : 'mt-4 cursor-pointer group/content'}`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    <div className={`relative ${!isExpanded ? 'bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50' : ''}`}>
                        <p className={`text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap transition-all duration-500 font-medium ${isExpanded ? 'text-lg sm:text-xl' : 'text-sm sm:text-base line-clamp-2 italic text-gray-600 dark:text-gray-400'
                            }`}>
                            {post.content}
                        </p>
                        {!isExpanded && (
                            <div className="absolute right-3 bottom-2 opacity-0 group-hover/content:opacity-100 transition-opacity text-blue-500 text-[10px] font-bold uppercase">
                                {t('music.expand')} →
                            </div>
                        )}
                    </div>
                </div>

                {/* Media Section */}
                {isExpanded && (
                    <div className="mt-8 space-y-6">
                        {post.image && (
                            <div className="group/image relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-800 shadow-2xl">
                                <LazyLoad height={400} offset={100} once>
                                    <img
                                        src={post.image}
                                        alt="Post visual"
                                        className="w-full h-auto max-h-[700px] object-contain transition-all duration-1000 group-hover/image:scale-[1.03]"
                                    />
                                </LazyLoad>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        )}

                        <div className="mt-6 sm:hidden flex justify-end">
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${post.status === 'public' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                                }`}>
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {posts.map((post) => {
            const user = users[post.user_id]
            if (!user) return null

            return (
                <div
                    key={`${post.created_at}-${post.user_id}`}
                    className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer bg-gray-100 dark:bg-gray-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-pink-200 dark:hover:border-pink-900/30"
                >
                    {post.image ? (
                        <LazyLoad height={300} offset={100} once>
                            <img
                                src={post.image}
                                alt="Post"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </LazyLoad>
                    ) : (
                        <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-pink-100 dark:border-pink-900/30 rounded-3xl">
                            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 line-clamp-6 font-playfair font-bold italic leading-relaxed">
                                {post.content}
                            </p>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-end">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="hidden sm:block">
                                <LazyLoad height={56} offset={100} once>
                                    <img
                                        src={user.avatar}
                                        className="w-14 h-14 rounded-full border-2 border-white/80 shadow-lg object-cover"
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg text-white font-black tracking-tight">@{user.nickname}</span>
                                <span className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">{t('post_view.premium')}</span>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-100 line-clamp-3 leading-tight font-medium drop-shadow-md">
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
}

GridView.propTypes = {
    posts: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
}

export default Posts
