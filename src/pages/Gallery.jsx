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
        <div key={index} className="unit-gallery-slide-wrap">
            <div className="unit-gallery-slide-card unit-glass-card">
                <img
                    src={post.image}
                    alt=""
                    className="unit-gallery-slide-img"
                    onClick={() => openImage(post.image)}
                />
            </div>
        </div>
    ))

    return (
        <>
            <div className="unit-page-gallery">
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
                    <div className="unit-animate-fade-in">
                        <FeaturedCarousel
                            posts={featuredPosts}
                            onImageClick={openImage}
                        />
                    </div>
                )}

                {galleryViewMode === GALLERY_VIEW_MODES.GRID && (
                    <div className="unit-animate-fade-in">
                        <MasonryGrid
                            columns={getMasonryColumns()}
                            onImageClick={openImage}
                            t={t}
                        />
                        {hasMore && (
                            <div className="unit-gallery-load-more">
                                <button
                                    onClick={loadMore}
                                    className="unit-load-more-btn"
                                >
                                    <div className="unit-load-more-overlay"></div>
                                    <span className="unit-load-more-text">
                                        {t('gallery_page.view_more')}
                                        <svg
                                            className="unit-load-more-icon"
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
                    <div className="unit-container unit-slideshow-wrap unit-animate-fade-in">
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
        className={`unit-lightbox ${isOpen ? 'unit-lightbox-open' : ''}`}
        onClick={onClose}
    >
        <button
            className="unit-lightbox-close"
            onClick={onClose}
        >
            <CloseIcon />
        </button>
        <img
            src={imageSrc}
            alt="Gallery expanded view"
            className={isOpen ? 'unit-scale-100' : 'unit-scale-90'}
        />
    </div>
)

/**
 * Presentational component for the Gallery header section.
 */
const GalleryHeader = ({ t, currentMode, onModeChange }) => (
    <div className="unit-container unit-gallery-header">
        <div className="unit-gallery-header-inner">
            <div className="unit-gallery-header-text">
                <h1>
                    {t('gallery_page.captured')} <span>{t('gallery_page.moments')}</span>
                </h1>
                <p>
                    {t('gallery_page.description')}
                </p>
            </div>

            {/* View Mode Switcher */}
            <div className="unit-gallery-view-switcher">
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.CAROUSEL)}
                    className={`unit-view-btn unit-hide-mobile ${currentMode === GALLERY_VIEW_MODES.CAROUSEL ? 'unit-view-btn-active' : ''}`}
                >
                    {t('gallery_page.view_carousel')}
                </button>
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.GRID)}
                    className={`unit-view-btn ${currentMode === GALLERY_VIEW_MODES.GRID ? 'unit-view-btn-active' : ''}`}
                >
                    {t('gallery_page.view_grid')}
                </button>
                <button
                    onClick={() => onModeChange(GALLERY_VIEW_MODES.LIGHTBOX)}
                    className={`unit-view-btn ${currentMode === GALLERY_VIEW_MODES.LIGHTBOX ? 'unit-view-btn-active' : ''}`}
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
    <div className="unit-container unit-carousel-container">
        <div className="unit-carousel-3d">
            <div className="unit-carousel-spinner">
                {posts.map((post, index) => (
                    <div
                        key={`featured-${index}`}
                        className="unit-carousel-item"
                        style={{
                            transform: `rotateY(${index * (360 / posts.length)}deg) translateZ(350px)`
                        }}
                        onClick={() => onImageClick(post.image)}
                    >
                        <img
                            src={post.image}
                            alt=""
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
    <div className="unit-container unit-gallery-masonry">
        {columns.map((col, colIndex) => (
            <div key={colIndex}>
                {col.map((post, postIndex) => (
                    <div
                        key={`${colIndex}-${postIndex}`}
                        onClick={() => onImageClick(post.image)}
                        className="unit-gallery-item"
                    >
                        <LazyLoad height={200} offset={100} once>
                            <img
                                src={post.image}
                                alt="Gallery capture"
                                loading="lazy"
                            />
                        </LazyLoad>
                        <div className="unit-gallery-item-overlay">
                            <span>{t('gallery_page.view_full')}</span>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
)


const CloseIcon = () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
