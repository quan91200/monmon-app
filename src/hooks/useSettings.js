import { useSettingsContext } from "../context/SettingsContext"
import { useToast } from "../context/ToastContext"

/**
 * Custom hook to bridge the Settings UI and the global SettingsContext.
 * Delegates actual logic to context-based providers.
 * 
 * @param {Function} t - Translation function.
 * @returns {Object} Settings bridge handlers and state.
 */
const useSettings = (t) => {
  const {
    snowEffectEnabled,
    toggleSnowEffect,
    backToTopConfig,
    toggleBackToTop,
    toggleBackToTopPage,
    toastPosition,
    setToastPosition
  } = useSettingsContext()

  const { showToast } = useToast()

  /**
   * Handles changing the notification toast position.
   * @param {string} position - The new position key.
   */
  const handlePositionChange = (position) => {
    setToastPosition(position)
    showToast(t("toast.pos"), 'info')
  }

  /**
   * Toggles the snowfall effect and shows a global toast.
   */
  const handleSnowEffectToggle = () => {
    toggleSnowEffect()
    const isNowEnabled = !snowEffectEnabled
    showToast(t(isNowEnabled ? "toast.snow_on" : "toast.snow_off"), 'success')
  }

  /**
   * Toggles the overall Back to Top button visibility and shows a global toast.
   */
  const handleBackToTopToggle = () => {
    const isNowEnabled = !backToTopConfig.enabled
    toggleBackToTop(isNowEnabled)
    showToast(t(isNowEnabled ? "toast.back_on" : "toast.back_off"), 'success')
  }

  /**
   * Toggles the Back to Top button on a specific page.
   * @param {string} path - The route path to toggle.
   */
  const handlePageToggle = (path) => {
    toggleBackToTopPage(path)
  }

  return {
    toastPosition,
    snowEffectEnabled,
    backToTopConfig,
    handlePositionChange,
    handleSnowEffectToggle,
    handleBackToTopToggle,
    handlePageToggle
  }
}

export default useSettings
