import PropTypes from 'prop-types'
import useLanguage from "../hooks/useLanguage"
import useSettings from "../hooks/useSettings"
import { useGalleryContext } from '../context/GalleryContext'
import positionClasses from "../utils/spFunc"
import { ROUTES } from '../constants'
import { useMusic } from '../context/MusicContext'
import { FaMusic } from "react-icons/fa"

/**
 * Settings Component - Provides a centralized interface for application performance
 * and UI customization.
 * 
 * @returns {JSX.Element} The rendered Settings page.
 */
const Settings = () => {
    const { t } = useLanguage()

    const {
        toastPosition,
        snowEffectEnabled,
        backToTopConfig,
        handlePositionChange,
        handleSnowEffectToggle,
        handleBackToTopToggle,
        handlePageToggle
    } = useSettings(t)

    const {
        galleryAutoplay,
        toggleGalleryAutoplay
    } = useGalleryContext()

    const availablePages = [
        { path: ROUTES.HOME, label: t('route.home') },
        { path: ROUTES.GALLERY, label: t('route.gallery') },
        { path: ROUTES.INLOVE, label: t('route.inlove') },
        { path: ROUTES.COUNTDOWN, label: t('route.countdown') },
    ]

    return (
        <div className="app-container pt-8 pb-48">
            <div className="flex flex-col space-y-5">

                <GallerySetting
                    autoplay={galleryAutoplay}
                    onToggle={toggleGalleryAutoplay}
                    t={t}
                />

                <SnowfallSetting
                    isEnabled={snowEffectEnabled}
                    onToggle={handleSnowEffectToggle}
                    t={t}
                />

                <BackToTopSetting
                    config={backToTopConfig}
                    onToggle={handleBackToTopToggle}
                    onPageToggle={handlePageToggle}
                    pages={availablePages}
                    t={t}
                />

                <ToastPositionSetting
                    currentPosition={toastPosition}
                    onPositionChange={handlePositionChange}
                    t={t}
                />

                <SpotifySetting t={t} />
            </div>
        </div>
    )
}

/**
 * Presentational component for Gallery-specific settings.
 */
const GallerySetting = ({ autoplay, onToggle, t }) => (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h2 className="text-lg font-bold dark:text-gray-100 mb-4">{t("gallery_settings.title")}</h2>
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-pink-500 transition-colors">
                {t("gallery_settings.autoplay")}
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={autoplay}
                    onChange={onToggle}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
            </div>
        </label>
    </div>
)

/**
 * Presentational component for Snowfall effect toggle.
 */
const SnowfallSetting = ({ isEnabled, onToggle, t }) => (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h2 className="text-lg font-bold dark:text-gray-100 mb-4">{t("snowfall.title")}</h2>
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-pink-500 transition-colors">
                {t("snowfall.enable")}
            </span>
            <input
                type="checkbox"
                className="w-5 h-5 rounded text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                checked={isEnabled}
                onChange={onToggle}
            />
        </label>
    </div>
)

/**
 * Presentational component for Back to Top button configuration.
 */
const BackToTopSetting = ({ config, onToggle, onPageToggle, pages, t }) => (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{t("back_to_top.title")}</h2>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={onToggle}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>

        {config.enabled && (
            <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-4 italic">{t("back_to_top.select_pages")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pages.map((page) => (
                        <label key={page.path} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                            <input
                                type="checkbox"
                                checked={config.activePages.includes(page.path)}
                                onChange={() => onPageToggle(page.path)}
                                className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{page.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        )}
    </div>
)

/**
 * Presentational component for Toast notification position setting.
 */
const ToastPositionSetting = ({ currentPosition, onPositionChange, t }) => (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h2 className="text-lg font-bold">{t("notifi")}</h2>
        <div className="flex flex-wrap gap-4 mt-4">
            {Object.keys(positionClasses).map((position) => (
                <label key={position} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input
                        type="radio"
                        name="position"
                        value={position}
                        checked={currentPosition === position}
                        onChange={(e) => onPositionChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">{t(`positions.${position}`)}</span>
                </label>
            ))}
        </div>
    </div>
)

/**
 * Presentational component for Spotify Playlist.
 */
const SpotifySetting = ({ t }) => {
    const { togglePlay, isPlaying } = useMusic();

    return (
        <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold dark:text-gray-100 flex items-center gap-2">
                    <FaMusic className="text-green-500" />
                    {t('music.title')}
                </h2>
                <button
                    onClick={togglePlay}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                        ${isPlaying
                            ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300 ring-2 ring-pink-500'
                            : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/20'
                        }`}
                >
                    {isPlaying ? t('music.playing') : t('music.play_radio')}
                </button>
            </div>
        </div>
    );
};

SpotifySetting.propTypes = {}

GallerySetting.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}
SnowfallSetting.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}
BackToTopSetting.propTypes = {
    config: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    onPageToggle: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
}
ToastPositionSetting.propTypes = {
    currentPosition: PropTypes.string.isRequired,
    onPositionChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}

export default Settings
