import userData from '../api/users.json'

import PropTypes from 'prop-types'
import {
    Link
} from 'react-router-dom'
import {
    useTranslation
} from 'react-i18next'

import {
    IoHomeOutline,
    IoSettingsOutline
} from "react-icons/io5"
import {
    LuMessageCircleHeart
} from "react-icons/lu"
import {
    FaRegImages,
    FaHourglassStart
} from "react-icons/fa"

import PillNav from './PillNav'
import ThemeToggle from './ThemeToggle'
import Dropdown from './Dropdown'

import useLanguage from '../hooks/useLanguage'
import useNavbar from '../hooks/useNavbar'

import {
    NAVBAR,
    ROUTES
} from '../constants'

/**
 * Navbar Component - The primary navigation bar for the application.
 * Features responsive layout, language switching, and theme toggling.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
    const { t } = useTranslation('global')
    const { currentLanguage, changeLanguage } = useLanguage()
    const { isScrolled } = useNavbar()

    return (
        <nav
            className={`unit-navbar ${isScrolled ? 'unit-navbar-scrolled' : ''}`}
            aria-label="Main Navigation"
        >
            <div className="unit-container">
                <div className={`unit-navbar-content ${isScrolled ? 'unit-navbar-scrolled-bg' : 'unit-navbar-default-bg'}`}>
                    {/* Logo Section */}
                    <LogoSection isScrolled={isScrolled} />

                    {/* Desktop Navigation */}
                    <div className="unit-desktop-nav">
                        <DesktopLinks t={t} />

                        <div className="unit-nav-divider"></div>
                        <LanguageSelector
                            currentLanguage={currentLanguage}
                            onLanguageChange={changeLanguage}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <ThemeToggle />
                            <Link
                                to={ROUTES.SETTINGS}
                                className="unit-navbar-settings-link group"
                                title={t('route.settings')}
                            >
                                <IoSettingsOutline size={20} className="unit-settings-icon" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu controls */}
                    <div className="unit-mobile-controls">
                        <MobileLanguageSelector
                            currentLanguage={currentLanguage}
                            onLanguageChange={changeLanguage}
                        />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

/**
 * Internal component for the application logo and brand name.
 */
const LogoSection = ({ isScrolled }) => (
    <Link to={ROUTES.HOME} className="unit-logo-section" title="Home">
        <div style={{ height: isScrolled ? '2.5rem' : '3rem', width: isScrolled ? '2.5rem' : '3rem', transition: 'all 0.3s' }}>
            <img
                src={userData.metadata.logo}
                alt="Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
        </div>
        <h2>
            {userData.metadata.appName}
        </h2>
    </Link>
)

/**
 * Internal component for desktop navigation links.
 */
const DesktopLinks = ({ t }) => (
    <>
        <PillNav
            to={ROUTES.HOME}
            icon={<IoHomeOutline style={{ fontSize: '1.25rem' }} />}
            active="unit-nav-pill-active-pink"
            className="unit-nav-pill-link"
        >
            {t('route.home')}
        </PillNav>

        <PillNav
            to={ROUTES.GALLERY}
            icon={<FaRegImages style={{ fontSize: '1.25rem' }} />}
            active="unit-nav-pill-active-orange"
            className="unit-nav-pill-link"
        >
            {t('route.gallery')}
        </PillNav>

        <PillNav
            to={ROUTES.INLOVE}
            icon={<LuMessageCircleHeart style={{ fontSize: '1.25rem' }} />}
            active="unit-nav-pill-active-rose"
            className="unit-nav-pill-link"
        >
            {t('route.inlove')}
        </PillNav>

        <PillNav
            to={ROUTES.COUNTDOWN}
            icon={<FaHourglassStart style={{ fontSize: '1.25rem' }} />}
            active="unit-nav-pill-active-indigo"
            className="unit-nav-pill-link"
        >
            {t('route.countdown')}
        </PillNav>
    </>
)

/**
 * Internal component for language selection with national flags in breadcrumb style.
 * Displays flags inline separated by slashes for immediate access.
 */
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => (
    <div className="unit-language-selector" role="group" aria-label="Language Selector">
        {Object.entries(NAVBAR.FLAGS).map(([code, src], index, array) => (
            <div key={code} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    onClick={() => onLanguageChange(code)}
                    className={`unit-language-btn ${currentLanguage === code ? 'unit-language-btn-active' : ''}`}
                    title={code === 'vn' ? 'Tiếng Việt' : code === 'en' ? 'English' : '中文'}
                    aria-pressed={currentLanguage === code}
                >
                    <img
                        src={src}
                        alt={code}
                        className="unit-flag-img"
                    />
                </button>
                {index < array.length - 1 && (
                    <span className="unit-language-separator">/</span>
                )}
            </div>
        ))}
    </div>
)

/**
 * Mobile-specific language selector using a dropdown.
 */
const MobileLanguageSelector = ({ currentLanguage, onLanguageChange }) => (
    <div className="unit-mobile-language">
        <Dropdown>
            <Dropdown.Trigger>
                <button className="unit-mobile-language-trigger">
                    <img
                        src={NAVBAR.FLAGS[currentLanguage]}
                        alt={currentLanguage}
                        className="unit-flag-img-mobile"
                    />
                    <svg className="unit-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="right" width="40" contentClasses="unit-dropdown-content-custom">
                {Object.entries(NAVBAR.FLAGS).map(([code, src]) => (
                    <button
                        key={code}
                        onClick={() => onLanguageChange(code)}
                        className={`unit-dropdown-item ${currentLanguage === code ? 'unit-dropdown-item-active' : ''}`}
                    >
                        <img
                            src={src}
                            alt={code}
                            className={`unit-flag-img-small ${currentLanguage === code ? '' : 'unit-grayscale'}`}
                        />
                        <span className="unit-language-label">
                            {code === 'vn' ? 'Tiếng Việt' : code === 'en' ? 'English' : '中文'}
                        </span>
                    </button>
                ))}
            </Dropdown.Content>
        </Dropdown>
    </div>
)

LogoSection.propTypes = { isScrolled: PropTypes.bool.isRequired }
DesktopLinks.propTypes = { t: PropTypes.func.isRequired }
LanguageSelector.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
}

MobileLanguageSelector.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
}

export default Navbar
