import { useEffect } from 'react'
import Snowflakes from 'magic-snowflakes'
import { useSettingsContext } from '../context/SettingsContext'
import { useTheme } from '../context/ThemeContext'

/**
 * SnowfallEffect Component - Manages the lifecycle of the magic-snowflakes effect.
 * Reacts to changes in the global SettingsContext and ThemeContext.
 * 
 * @returns {null} This component does not render any UI.
 */
const SnowfallEffect = () => {
    const { snowEffectEnabled } = useSettingsContext()
    const { theme } = useTheme()

    useEffect(() => {
        let snowflakes = null

        if (snowEffectEnabled) {
            snowflakes = new Snowflakes({
                count: 100,
                color: theme === 'dark' ? '#ffffff' : '#94a3b8', // slate-400 for light mode
                speed: 1,
                size: 15,
                zIndex: 9999,
                container: document.body
            })
            snowflakes.start()
        }

        return () => {
            if (snowflakes) {
                snowflakes.destroy()
                snowflakes = null
            }
        }
    }, [snowEffectEnabled, theme])

    return null
}

export default SnowfallEffect
