import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5"
import { LuMessageCircleHeart } from "react-icons/lu"
import { FaRegImages, FaHourglassStart } from "react-icons/fa"
import PillNav from './PillNav'
import ThemeToggle from './ThemeToggle'
import useLanguage from '../hooks/useLanguage'
import useNavbar from '../hooks/useNavbar'
import userData from '../api/users.json'
import { NAVBAR, ROUTES } from '../constants'
import Dropdown from './Dropdown'

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
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'py-2'
                : 'py-4 ipad-v:py-6'
                }`}
            aria-label="Main Navigation"
        >
            <div className="app-container">
                <div className={`flex items-center justify-between h-20 px-6 sm:px-10 transition-all duration-500
                    ${isScrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-2xl'
                        : 'ipad-v:bg-white/40 ipad-v:dark:bg-gray-950/40 ipad-v:backdrop-blur-xl ipad-v:rounded-[40px]'
                    }`}
                >
                    {/* Logo Section */}
                    <LogoSection isScrolled={isScrolled} />

                    {/* Desktop Navigation */}
                    <div className="hidden ipad-v:flex items-center space-x-4">
                        <DesktopLinks t={t} />

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                        <LanguageSelector
                            currentLanguage={currentLanguage}
                            onLanguageChange={changeLanguage}
                        />
                        <div className="flex items-center gap-1">
                            <ThemeToggle />
                            <Link
                                to={ROUTES.SETTINGS}
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                                title={t('route.settings')}
                            >
                                <IoSettingsOutline className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu controls */}
                    <div className="ipad-v:hidden flex items-center gap-3">
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
    <Link to={ROUTES.HOME} className="flex items-center gap-3 group" title="Home">
        <div className={`transition-all duration-300 ${isScrolled ? 'h-10 w-10' : 'h-12 w-12'}`}>
            <img
                src={userData.metadata.logo}
                alt="Logo"
                className="w-full h-full object-contain group-hover:rotate-12 transition-transform"
            />
        </div>
        <h2 className="font-zendots font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent 
            transition-all duration-500 
            text-[14px] sm:text-2xl
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            sm:translate-x-[-10px] sm:group-hover:translate-x-0
            pointer-events-none">
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
            icon={<IoHomeOutline className="text-xl" />}
            active="text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20"
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            {t('route.home')}
        </PillNav>

        <PillNav
            to={ROUTES.GALLERY}
            icon={<FaRegImages className="text-xl" />}
            active="text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            {t('route.gallery')}
        </PillNav>

        <PillNav
            to={ROUTES.INLOVE}
            icon={<LuMessageCircleHeart className="text-xl" />}
            active="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20"
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            {t('route.inlove')}
        </PillNav>

        <PillNav
            to={ROUTES.COUNTDOWN}
            icon={<FaHourglassStart className="text-xl" />}
            active="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
    <div
        className="hidden ipad-v:flex items-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-sm"
        role="group"
        aria-label="Language Selector"
    >
        {Object.entries(NAVBAR.FLAGS).map(([code, src], index, array) => (
            <div key={code} className="flex items-center">
                <button
                    onClick={() => onLanguageChange(code)}
                    className={`flex items-center transition-all duration-300 p-0.5 rounded-md hover:scale-110 focus:outline-none ${currentLanguage === code
                        ? 'ring-2 ring-pink-500/50 scale-110 z-10'
                        : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
                        }`}
                    title={code === 'vn' ? 'Tiếng Việt' : code === 'en' ? 'English' : '中文'}
                    aria-pressed={currentLanguage === code}
                >
                    <img
                        src={src}
                        alt={code}
                        className="w-5 h-3.5 object-cover rounded-sm shadow-sm pointer-events-none"
                    />
                </button>
                {index < array.length - 1 && (
                    <span className="mx-2 text-gray-300 dark:text-gray-600 font-light select-none text-sm">/</span>
                )}
            </div>
        ))}
    </div>
)

/**
 * Mobile-specific language selector using a dropdown.
 */
const MobileLanguageSelector = ({ currentLanguage, onLanguageChange }) => (
    <div className="ipad-v:hidden flex items-center">
        <Dropdown>
            <Dropdown.Trigger>
                <button className="flex items-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-2 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-sm active:scale-95 transition-transform">
                    <img
                        src={NAVBAR.FLAGS[currentLanguage]}
                        alt={currentLanguage}
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                    <svg className="w-4 h-4 ml-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="right" width="40" contentClasses="py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-black/5 dark:border-white/5">
                {Object.entries(NAVBAR.FLAGS).map(([code, src]) => (
                    <button
                        key={code}
                        onClick={() => onLanguageChange(code)}
                        className={`flex items-center w-full px-4 py-3 gap-3 transition-colors ${currentLanguage === code
                            ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        <img
                            src={src}
                            alt={code}
                            className={`w-6 h-4 object-cover rounded-sm ${currentLanguage === code ? '' : 'grayscale'}`}
                        />
                        <span className="text-sm font-bold uppercase tracking-wider">
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
