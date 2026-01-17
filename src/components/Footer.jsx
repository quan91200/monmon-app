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
    <footer className="unit-footer">
        <div className="unit-container unit-footer-content">
            <div className="unit-footer-copyright">
                <span className="unit-footer-year">© {startYear}-{currentYear}</span>
                <span className="unit-footer-heart unit-animate-heartbeat">
                    <FaHeart size={16} />
                </span>
                <span className="unit-footer-name">
                    {userData.metadata.footerName}
                </span>
            </div>

            <div className="unit-footer-links">
                <span className="unit-footer-link-item">{t('footer.endless_story')}</span>
                <span className="unit-footer-dot"></span>
                <span className="unit-footer-link-item">{t('footer.crafted_with_love')}</span>
                <span className="unit-footer-dot unit-delay-700"></span>
                <span className="unit-footer-link-item">{t('footer.forever_anniversary')}</span>
            </div>

            <div className="unit-footer-bottom">
                <span className="unit-footer-premium">
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
    <nav className="unit-mobile-tabbar" aria-label="Mobile Bottom Navigation">
        <div className="unit-tabbar-inner">
            <MobileNavItem
                to={ROUTES.HOME}
                icon={<IoHomeOutline />}
                label={t('route.home')}
                activeColor="unit-nav-mobile-active-blue"
            />
            <MobileNavItem
                to={ROUTES.GALLERY}
                icon={<FaRegImages />}
                label={t('route.gallery')}
                activeColor="unit-nav-mobile-active-purple"
            />
            <MobileNavItem
                to={ROUTES.INLOVE}
                icon={<LuMessageCircleHeart />}
                label={t('route.inlove')}
                activeColor="unit-nav-mobile-active-rose"
            />
            <MobileNavItem
                to={ROUTES.COUNTDOWN}
                icon={<FaHourglassStart />}
                label={t('route.countdown')}
                activeColor="unit-nav-mobile-active-indigo"
            />
            <MobileNavItem
                to={ROUTES.SETTINGS}
                icon={<IoSettingsOutline />}
                label={t('route.settings')}
                activeColor="unit-nav-mobile-active-blue-light"
            />
        </div>
    </nav>
)

/**
 * Presentational component for individual mobile navigation items.
 */
const MobileNavItem = ({ to, icon, label, activeColor }) => {
    const { pathname } = window.location // Purely for visual active state in this refactor
    const isActive = pathname === to

    return (
        <Link
            to={to}
            className={`unit-mobile-nav-item ${isActive ? activeColor : ''}`}
            aria-label={label}
            title={label}
        >
            <div className="unit-mobile-nav-icon">
                {cloneElement(icon, { size: 24 })}
            </div>
        </Link>
    )
}

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
    activeColor: PropTypes.string.isRequired,
}

export default Footer
