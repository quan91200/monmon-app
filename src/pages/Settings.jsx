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
        <div className="unit-container unit-page-settings">
            <div className="unit-settings-stack">
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
    <div className="unit-setting-card">
        <label className="unit-setting-row unit-group">
            <span className="unit-setting-label">
                {t("gallery_settings.autoplay")}
            </span>
            <div className="unit-toggle-wrapper">
                <input
                    type="checkbox"
                    checked={autoplay}
                    onChange={onToggle}
                    className="unit-toggle-input"
                />
                <div className="unit-toggle-switch unit-toggle-rose"></div>
            </div>
        </label>
    </div>
)

/**
 * Presentational component for Snowfall effect toggle.
 */
const SnowfallSetting = ({ isEnabled, onToggle, t }) => (
    <div className="unit-setting-card">
        <label className="unit-setting-row unit-group">
            <span className="unit-setting-label">
                {t("snowfall.enable")}
            </span>
            <div className="unit-toggle-wrapper">
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={onToggle}
                    className="unit-toggle-input"
                />
                <div className="unit-toggle-switch unit-toggle-blue"></div>
            </div>
        </label>
    </div>
)

/**
 * Presentational component for Back to Top button configuration.
 */
const BackToTopSetting = ({ config, onToggle, onPageToggle, pages, t }) => (
    <div className="unit-setting-card">
        <div className="unit-setting-header">
            <h2 className="unit-setting-title">{t("back_to_top.title")}</h2>
            <label className="unit-setting-toggle">
                <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={onToggle}
                    className="unit-toggle-input"
                />
                <div className="unit-toggle-switch unit-toggle-blue"></div>
            </label>
        </div>

        {config.enabled && (
            <div className="unit-setting-content">
                <p className="unit-setting-description">{t("back_to_top.select_pages")}</p>
                <div className="unit-setting-grid">
                    {pages.map((page) => (
                        <label key={page.path} className="unit-checkbox-label">
                            <input
                                type="checkbox"
                                checked={config.activePages.includes(page.path)}
                                onChange={() => onPageToggle(page.path)}
                                className="unit-checkbox-input"
                            />
                            <span className="unit-checkbox-text">{page.label}</span>
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
    <div className="unit-setting-card">
        <h2 className="unit-setting-title">{t("notifi")}</h2>
        <div className="unit-radio-group">
            {Object.keys(positionClasses).map((position) => (
                <label key={position} className="unit-radio-label">
                    <input
                        type="radio"
                        name="position"
                        value={position}
                        checked={currentPosition === position}
                        onChange={(e) => onPositionChange(e.target.value)}
                        className="unit-radio-input"
                    />
                    <span className="unit-radio-text">{t(`positions.${position}`)}</span>
                </label>
            ))}
        </div>
    </div>
)

/**
 * Presentational component for Spotify Playlist.
 */
const SpotifySetting = ({ t }) => {
    const { togglePlay, isPlaying } = useMusic()

    return (
        <div className="unit-setting-card">
            <div className="unit-music-setting-row">
                <h2 className="unit-setting-title">
                    <FaMusic className="unit-music-icon" />
                    {t('music.title')}
                </h2>
                <button
                    onClick={togglePlay}
                    className={`unit-music-btn ${isPlaying ? 'unit-music-active' : 'unit-music-inactive'}`}
                >
                    {isPlaying ? t('music.playing') : t('music.play_radio')}
                </button>
            </div>
        </div>
    )
}

SpotifySetting.propTypes = {
    t: PropTypes.func.isRequired
}

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
