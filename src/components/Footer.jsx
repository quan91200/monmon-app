import { cloneElement } from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5"
import { LuMessageCircleHeart } from "react-icons/lu"
import { FaRegImages, FaHeart, FaHourglassStart } from "react-icons/fa"

import useFooter from '../hooks/useFooter'
import userData from '../api/users.json'
import { ROUTES } from '../constants'

/**
 * Footer Component - Orchestrates the display of both desktop footer and mobile bottom tab bar.
 * Adheres to the Container/Presentational design pattern.
 * 
 * @param {Object} props - Component properties.
 * @param {boolean} props.mobileOnly - If true, only the mobile components are considered for rendering.
 * @returns {JSX.Element} The rendered Footer/Navigation components.
 */
const Footer = ({ mobileOnly = false }) => {
    const { t } = useTranslation('global')
    const { startYear, currentYear } = useFooter()

    return (
        <>
            {!mobileOnly && (
                <DesktopFooter
                    t={t}
                    startYear={startYear}
                    currentYear={currentYear}
                />
            )}
            <MobileTabBar t={t} />
        </>
    )
}

/**
 * Presentational component for the desktop-only glassmorphism footer.
 */
const DesktopFooter = ({ t, startYear, currentYear }) => (
    <footer className="hidden ipad-v:block w-full py-10 mt-auto transition-colors duration-700
        bg-white/40 dark:bg-gray-950/40 backdrop-blur-2xl border-t border-white/20 dark:border-gray-800/30"
    >
        <div className="app-container flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 font-inter font-medium tracking-wide">
                <span className="opacity-60 text-sm">© {startYear}-{currentYear}</span>
                <span className="text-rose-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(225,29,72,0.4)]">
                    <FaHeart size={16} />
                </span>
                <span className="font-playfair text-xl font-black bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {userData.metadata.footerName}
                </span>
            </div>

            <div className="flex items-center space-x-6 text-[11px] sm:text-xs text-gray-500 dark:text-gray-500 font-inter font-bold uppercase tracking-[0.2em]">
                <span className="hover:text-rose-400 dark:hover:text-rose-300 transition-colors duration-300 cursor-default">{t('footer.endless_story')}</span>
                <span className="w-1.5 h-1.5 bg-rose-200 dark:bg-rose-900/50 rounded-full animate-pulse"></span>
                <span className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300 cursor-default">{t('footer.crafted_with_love')}</span>
                <span className="w-1.5 h-1.5 bg-indigo-200 dark:bg-indigo-900/50 rounded-full animate-pulse delay-700"></span>
                <span className="hover:text-amber-400 dark:hover:text-amber-300 transition-colors duration-300 cursor-default">{t('footer.forever_anniversary')}</span>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800/50 w-full max-w-xs flex justify-center">
                <span className="opacity-20 text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-gray-500">
                    {t('footer.premium_sanctuary')}
                </span>
            </div>
        </div>
    </footer>
)

/**
 * Presentational component for the mobile bottom navigation bar.
 */
const MobileTabBar = ({ t }) => (
    <nav
        className="ipad-v:hidden fixed bottom-0 left-0 w-full z-[100] px-6 pb-6"
        aria-label="Mobile Bottom Navigation"
    >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-800/30 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-around py-4">
            <MobileNavItem
                to={ROUTES.HOME}
                icon={<IoHomeOutline />}
                label={t('route.home')}
                color="text-blue-500"
            />
            <MobileNavItem
                to={ROUTES.GALLERY}
                icon={<FaRegImages />}
                label={t('route.gallery')}
                color="text-purple-500"
            />
            <MobileNavItem
                to={ROUTES.INLOVE}
                icon={<LuMessageCircleHeart />}
                label={t('route.inlove')}
                color="text-rose-500"
            />
            <MobileNavItem
                to={ROUTES.COUNTDOWN}
                icon={<FaHourglassStart />}
                label={t('route.countdown')}
                color="text-indigo-500"
            />
            <MobileNavItem
                to={ROUTES.SETTINGS}
                icon={<IoSettingsOutline />}
                label={t('route.settings')}
                color="text-blue-400"
            />
        </div>
    </nav>
)

/**
 * Presentational component for individual mobile navigation items.
 */
const MobileNavItem = ({ to, icon, label, color }) => (
    <Link
        to={to}
        className="flex flex-col items-center group cursor-pointer"
        aria-label={label}
        title={label}
    >
        <div className={`p-2 rounded-2xl transition-all duration-300 active:scale-75 ${color} group-active:bg-gray-100 dark:group-active:bg-gray-800`}>
            {cloneElement(icon, { size: 24 })}
        </div>
    </Link>
)

Footer.propTypes = {
    mobileOnly: PropTypes.bool,
}

DesktopFooter.propTypes = {
    t: PropTypes.func.isRequired,
    startYear: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
}

MobileTabBar.propTypes = {
    t: PropTypes.func.isRequired,
}

MobileNavItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default Footer
