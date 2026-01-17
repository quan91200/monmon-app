import { useTranslation } from 'react-i18next'
import { FaHeart } from "react-icons/fa"

import userData from "../api/users.json"
import TimeSince from "../components/TimeSince"
import CoupleCard from "../components/CoupleCard"
import SlideShow from '../components/SlideShow'

/**
 * Inlove Page - A celebratory landing page for the couple's anniversary.
 * Features a high-engagement slideshow with real-time countdowns and 
 * interactive member cards with radial social menus.
 * 
 * @returns {JSX.Element} The rendered Inlove page.
 */
const Inlove = () => {
    const { t } = useTranslation("global")
    const { users, metadata } = userData
    const man = users[1]
    const women = users[2]

    const elapsedTime = TimeSince({ startDate: metadata.anniversaryDate })

    /**
     * Slide 1: Main Anniversary Identity
     * Displays the primary countdown bubble and interactive member cards.
     */
    const renderMainSlide = () => (
        <div key="slide1" className="unit-slide-wrapper">
            {/* Main Countdown Bubble */}
            <div className="unit-countdown-bubble">
                <span className="unit-countdown-main-text">
                    {elapsedTime.totalDays} {t('time.days')}
                </span>
                <div className="unit-countdown-sub-text">
                    <span>{elapsedTime.hours}h</span>
                    <span>{elapsedTime.minutes}m</span>
                    <span>{elapsedTime.seconds}s</span>
                </div>
            </div>

            {/* Couple Interaction Section */}
            <div className="unit-couple-section">
                <CoupleCard
                    user={man}
                    gradient="from-blue-400 to-indigo-400"
                    delay="[animation-delay:0.3s]"
                />

                {/* Animated Heart Center */}
                <div className="unit-heart-center">
                    <div className="unit-heart-wrapper">
                        <div className="unit-heart-ping">
                            <FaHeart className="unit-heart-icon-large" />
                        </div>
                        <div className="unit-heart-beat">
                            <FaHeart className="unit-heart-icon-small" />
                        </div>
                    </div>
                </div>

                <CoupleCard
                    user={women}
                    gradient="from-pink-400 to-rose-400"
                    delay="[animation-delay:0.6s]"
                />
            </div>
        </div>
    )

    /**
     * Slide 2: Detailed Statistics
     * Breaks down the anniversary duration into years, months, weeks, and days.
     */
    const renderStatsSlide = () => (
        <div key="slide2" className="unit-slide-stats-wrapper">
            <div className="unit-stats-grid">
                {[
                    { value: elapsedTime.years, label: t('time.year'), color: 'unit-stat-pink' },
                    { value: elapsedTime.months, label: t('time.months'), color: 'unit-stat-purple' },
                    { value: elapsedTime.weeks, label: t('time.weeks'), color: 'unit-stat-indigo' },
                    { value: elapsedTime.days, label: t('time.days'), color: 'unit-stat-rose' },
                ].map((stat, i) => (
                    <div key={i} className="unit-stat-card">
                        <div className={`unit-stat-bg ${stat.color}`}></div>
                        <span className="unit-stat-value">{stat.value}</span>
                        <span className="unit-stat-label">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )

    const slides = [renderMainSlide(), renderStatsSlide()]

    return (
        <div
            className="unit-inlove-page"
            style={{ minHeight: "calc(100vh - 6rem)" }}
        >
            {/* Background Decorations */}
            <div className="unit-deco-rose"></div>
            <div className="unit-deco-indigo"></div>

            <SlideShow
                slides={slides}
                autoPlay={false}
                autoPlayInterval={5000}
                showDots={true}
                transitionDuration={1000}
            />
        </div>
    )
}

export default Inlove
