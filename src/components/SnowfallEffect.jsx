import { useEffect } from 'react'
import MagicSnowflakes from 'magic-snowflakes'
import { useSettingsContext } from '../context/SettingsContext'

/**
 * SnowfallEffect Component - Manages the lifecycle of the magic-snowflakes effect.
 * Reacts to changes in the global SettingsContext.
 * 
 * @returns {null} This component does not render any UI.
 */
const SnowfallEffect = () => {
    const { snowEffectEnabled } = useSettingsContext()

    useEffect(() => {
        let snowflakes = null

        if (snowEffectEnabled) {
            snowflakes = new MagicSnowflakes({
                count: 50,
                color: '#ADD8E6',
                speed: 1,
                size: 10,
                zIndex: 1000,
            })
            snowflakes.start()
        }

        return () => {
            if (snowflakes) {
                snowflakes.destroy()
                snowflakes = null
            }
        }
    }, [snowEffectEnabled])

    return null
}

export default SnowfallEffect
