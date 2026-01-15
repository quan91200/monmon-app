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
        <div key="slide1" className="flex flex-col items-center justify-center space-y-10 sm:space-y-16 py-8 min-h-[70vh] sm:min-h-0">
            {/* Main Countdown Bubble */}
            <div className="px-8 py-4 sm:px-12 sm:py-6 rounded-full glass-card flex flex-col items-center border-rose-100/30 dark:border-purple-500/20 shadow-xl animate-float">
                <span className="text-3xl sm:text-5xl md:text-6xl font-playfair font-black bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent">
                    {elapsedTime.totalDays} {t('time.days')}
                </span>
                <div className="flex gap-4 sm:gap-6 mt-2 text-gray-600 dark:text-gray-300 font-inter font-medium tracking-widest uppercase text-[10px] sm:text-xs">
                    <span>{elapsedTime.hours}h</span>
                    <span>{elapsedTime.minutes}m</span>
                    <span>{elapsedTime.seconds}s</span>
                </div>
            </div>

            {/* Couple Interaction Section */}
            <div className="flex flex-col ipad-v:flex-row items-center justify-center gap-10 ipad-v:gap-20 laptop:gap-32 w-full">
                <CoupleCard
                    user={man}
                    gradient="from-blue-400 to-indigo-400"
                    delay="[animation-delay:0.3s]"
                />

                {/* Animated Heart Center */}
                <div className="flex flex-col items-center z-10 ipad-v:my-0 my-[-10px]">
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping opacity-20 text-rose-500">
                            <FaHeart className="text-[60px] ipad-v:text-[100px]" />
                        </div>
                        <div className="animate-heartbeat text-rose-500 drop-shadow-[0_0_25px_rgba(225,29,72,0.5)] cursor-pointer hover:rotate-12 transition-transform duration-300">
                            <FaHeart className="text-[50px] ipad-v:text-[80px]" />
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
        <div key="slide2" className="flex flex-col items-center justify-center w-full px-4 min-h-[70vh] sm:min-h-0 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
                {[
                    { value: elapsedTime.years, label: t('time.year'), color: 'from-pink-400/20' },
                    { value: elapsedTime.months, label: t('time.months'), color: 'from-purple-400/20' },
                    { value: elapsedTime.weeks, label: t('time.weeks'), color: 'from-indigo-400/20' },
                    { value: elapsedTime.days, label: t('time.days'), color: 'from-rose-400/20' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center space-y-2 border-white/20 hover:scale-105 transition-transform duration-500 overflow-hidden relative group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        <span className="text-4xl sm:text-6xl font-playfair font-bold text-gray-800 dark:text-white z-10">{stat.value}</span>
                        <span className="px-3 py-1 rounded-full bg-rose-100/50 dark:bg-white/5 text-rose-600 dark:text-rose-300 font-inter text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] z-10">
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
            className="flex items-center justify-center px-4 overflow-hidden relative transition-colors duration-1000
                bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-rose-50 via-white to-indigo-50
                dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950 pb-32 ipad-v:pb-0"
            style={{ minHeight: "calc(100vh - 6rem)" }}
        >
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

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
