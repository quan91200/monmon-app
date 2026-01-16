import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazyload'

import images from '../api/users.json'
import useGallery from '../hooks/useGallery'
import { GALLERY_VIEW_MODES } from '../constants'

import Footer from '../components/Footer'
import SlideShow from '../components/SlideShow'

/**
 * Gallery Component - Displays a collection of images using a masonry layout,
 * infinite scroll, and a cinematic 3D carousel for featured items.
 * 
 * @returns {JSX.Element} The rendered Gallery page.
 */
const Gallery = () => {
    const { t } = useTranslation('global')
    const allGalleryPosts = images.posts.filter(post => post.image)

    const {
        model,
        tempImgSrc,
        openImage,
        closeImage,
        getMasonryColumns,
        featuredPosts,
        loadMore,
        hasMore,
        galleryViewMode,
        handleGalleryViewModeChange,
        galleryAutoplay
    } = useGallery(allGalleryPosts)

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    // Auto-switch to GRID if mobile and mode is CAROUSEL
    useEffect(() => {
        if (isMobile && galleryViewMode === GALLERY_VIEW_MODES.CAROUSEL) {
            handleGalleryViewModeChange(GALLERY_VIEW_MODES.GRID)
        }
    }, [isMobile, galleryViewMode, handleGalleryViewModeChange])

    const gallerySlides = allGalleryPosts.map((post, index) => (
        <div key={index} className="w-full flex justify-center p-4">
            <div className="relative group max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl glass-card">
                <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openImage(post.image)}
                />
            </div>
        </div>
    ))

    return (
        <>
            <div className="min-h-screen pt-24 pb-32 sm:pb-12 bg-gray-100 dark:bg-gray-950 transition-colors overflow-x-hidden">
                <GalleryLightbox
                    isOpen={model}
                    imageSrc={tempImgSrc}
                    onClose={closeImage}
                />

                <GalleryHeader
                    t={t}
                    currentMode={galleryViewMode}
                    onModeChange={handleGalleryViewModeChange}
                />

                {/* View Mode Content */}
                {galleryViewMode === GALLERY_VIEW_MODES.CAROUSEL && (
                    <div className="animate-fade-in">
                        <FeaturedCarousel
                            posts={featuredPosts}
                            onImageClick={openImage}
                        />
                    </div>
                )}

                {galleryViewMode === GALLERY_VIEW_MODES.GRID && (
                    <div className="animate-fade-in">
                        <MasonryGrid
                            columns={getMasonryColumns()}
                            onImageClick={openImage}
                            t={t}
                        />
                        {hasMore && (
                            <div className="flex justify-center mt-12 mb-20">
                                <button
                                    onClick={loadMore}
                                    className="group relative px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold uppercase tracking-widest text-sm">
                                        {t('gallery_page.view_more')}
                                        <svg
                                            className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {galleryViewMode === GALLERY_VIEW_MODES.LIGHTBOX && (
                    <div className="app-container mb-20 animate-fade-in">
                        <SlideShow
                            slides={gallerySlides}
                            autoPlay={galleryAutoplay}
                            transitionDuration={600}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

/**
 * Presentational component for the image lightbox.
 */
const GalleryLightbox = ({ isOpen, imageSrc, onClose }) => (
    <div
        className={`fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        onClick={onClose}
    >
        <button
            className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform duration-300 focus:outline-none"
            onClick={onClose}
        >
            <CloseIcon />
        </button>
        <img
            src={imageSrc}
            alt="Gallery expanded view"
            className={`max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl transition-transform duration-500 object-contain ${isOpen ? 'scale-100' : 'scale-90'
                }`}
        />
    </div>
)

/**
 * Presentational component for the Gallery header section.
 */
const GalleryHeader = ({ t, currentMode, onModeChange }) => (
    <div className="app-container mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
                <h1 className="text-4xl font-zendots font-bold text-gray-900 dark:text-white mb-4">
                    {t('gallery_page.captured')} <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent underline decoration-pink-500/30">{t('gallery_page.moments')}</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                    {t('gallery_page.description')}
                </p>
            </div>

            {/* View Mode Switcher */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-sm flex gap-1 self-start md:self-auto">
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.CAROUSEL)}
                    className={`hidden md:block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${currentMode === GALLERY_VIEW_MODES.CAROUSEL
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'text-gray-500 hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    {t('gallery_page.view_carousel')}
                </button>
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.GRID)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${currentMode === GALLERY_VIEW_MODES.GRID
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'text-gray-500 hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    {t('gallery_page.view_grid')}
                </button>
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.LIGHTBOX)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${currentMode === GALLERY_VIEW_MODES.LIGHTBOX
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'text-gray-500 hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    {t('gallery_page.view_lightbox')}
                </button>
            </div>
        </div>
    </div>
)

/**
 * Presentational component for the 3D featured carousel.
 */
const FeaturedCarousel = ({ posts, onImageClick }) => (
    <div className="app-container mb-20 hidden md:block">
        <div className="carousel-3d-container">
            <div className="carousel-3d">
                {posts.map((post, index) => (
                    <div
                        key={`featured-${index}`}
                        className="carousel-3d-item group cursor-pointer"
                        style={{
                            transform: `rotateY(${index * (360 / posts.length)}deg) translateZ(350px)`
                        }}
                        onClick={() => onImageClick(post.image)}
                    >
                        <img
                            src={post.image}
                            alt=""
                            className="group-hover:brightness-110 transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
)

/**
 * Presentational component for the masonry image grid.
 */
const MasonryGrid = ({ columns, onImageClick, t }) => (
    <div className="app-container flex gap-6 perspective-1000">
        {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-6">
                {col.map((post, postIndex) => (
                    <div
                        key={`${colIndex}-${postIndex}`}
                        onClick={() => onImageClick(post.image)}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 
                            hover-rotate-3d shadow-md hover:shadow-2xl ring-1 ring-black/5 dark:ring-white/5 hover:ring-pink-500/30 transition-all duration-500"
                    >
                        <LazyLoad height={200} offset={100} once>
                            <img
                                src={post.image}
                                alt="Gallery capture"
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </LazyLoad>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-medium text-sm">{t('gallery_page.view_full')}</span>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
)


const CloseIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

GalleryLightbox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    imageSrc: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

GalleryHeader.propTypes = {
    t: PropTypes.func.isRequired,
    currentMode: PropTypes.string.isRequired,
    onModeChange: PropTypes.func.isRequired,
}

FeaturedCarousel.propTypes = {
    posts: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired,
}

MasonryGrid.propTypes = {
    columns: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}


export default Gallery
