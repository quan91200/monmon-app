import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import userData from "../api/users.json"

/**
 * CountTime Component - Displays a premium countdown to the next Lunar New Year.
 * Features 3D-style digital units, glowing effects, and responsive layout.
 * 
 * @returns {JSX.Element} The rendered countdown component.
 */
const CountTime = () => {
    const [t] = useTranslation('global')
    const { lunarNewYearDates } = userData.metadata

    const getInitialTarget = () => {
        const now = new Date()

        // Find the first lunar date that is in the future
        for (const dateString of lunarNewYearDates) {
            const lunarDate = new Date(dateString)
            if (lunarDate > now) return lunarDate
        }

        // Fallback to Jan 1st if we run out of dates
        return new Date(now.getFullYear() + 1, 0, 1)
    }

    const [target] = useState(getInitialTarget())
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const difference = target - now

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / (1000 * 60)) % 60)
                const seconds = Math.floor((difference / 1000) % 60)

                setTimeLeft({ days, hours, minutes, seconds })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [target])

    return (
        <div className="unit-count-time-wrapper">
            <div className="unit-container unit-z-10">
                <div className="unit-count-time-card">
                    <div className="unit-count-time-header">
                        <span className="unit-count-time-badge">
                            {t('route.lunar')}
                        </span>
                        <h1 className="unit-count-time-title">
                            {t('route.countdown')}
                        </h1>
                    </div>

                    <div className="unit-time-grid">
                        {[
                            { label: t('time.days'), value: timeLeft.days, color: 'unit-text-rose', bg: 'unit-bg-rose', border: 'unit-border-rose' },
                            { label: t('time.hours'), value: timeLeft.hours, color: 'unit-text-fuchsia', bg: 'unit-bg-fuchsia', border: 'unit-border-fuchsia' },
                            { label: t('time.minutes'), value: timeLeft.minutes, color: 'unit-text-cyan', bg: 'unit-bg-cyan', border: 'unit-border-cyan' },
                            { label: t('time.seconds'), value: timeLeft.seconds, color: 'unit-text-amber', bg: 'unit-bg-amber', border: 'unit-border-amber' },
                        ].map((unit, i) => (
                            <div key={i} className="unit-time-item-wrapper">
                                <div className="unit-time-item">
                                    {/* Color Dilution Layer (Light Mode) */}
                                    <div className={`unit-time-bg-layer ${unit.bg}`}></div>

                                    {/* Glassy Overlay Reflection */}
                                    <div className="unit-time-glass-overlay"></div>

                                    {/* Digital Background Segments */}
                                    <div className="unit-time-digital-bg-gradient"></div>
                                    <span className="unit-time-digital-shadow">
                                        88
                                    </span>

                                    {/* Actual Glowing Value */}
                                    <span className={`unit-time-value ${unit.color}`}>
                                        {unit.value.toString().padStart(2, '0')}
                                    </span>

                                    <span className="unit-time-label">
                                        {unit.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="unit-count-time-footer">
                        <span className="unit-system-badge">
                            <span className="unit-status-ping-wrap">
                                <span className="unit-status-ping"></span>
                                <span className="unit-status-dot"></span>
                            </span>
                            System Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountTime
