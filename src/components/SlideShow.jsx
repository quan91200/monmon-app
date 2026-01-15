import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const SlideShow = ({
    slides = [],
    autoPlay = true,
    autoPlayInterval = 3000,
    showDots = true,
    transitionDuration = 500,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50

    useEffect(() => {
        if (autoPlay && transitionDuration !== "none") {
            const interval = setInterval(() => {
                nextSlide()
            }, autoPlayInterval)

            return () => clearInterval(interval)
        }
    }, [currentIndex, autoPlay, autoPlayInterval, transitionDuration])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        )
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            nextSlide()
        } else if (isRightSwipe) {
            prevSlide()
        }
    }

    return (
        <div
            className="relative w-full mx-auto overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="flex transition-transform ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transitionDuration:
                        transitionDuration === "none" ? "0ms" : `${transitionDuration}ms`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full"
                        style={{ width: "100%" }}
                    >
                        {slide}
                    </div>
                ))}
            </div>

            {showDots && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden ipad-v:flex space-x-2 mobile:bottom-0">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-rose-500 w-6"
                                : "bg-gray-400/50 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SlideShow

SlideShow.propTypes = {
    slides: PropTypes.node,
    autoPlay: PropTypes.bool,
    autoPlayInterval: PropTypes.number,
    // showControls: PropTypes.bool,
    showDots: PropTypes.bool,
    transitionDuration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
}
