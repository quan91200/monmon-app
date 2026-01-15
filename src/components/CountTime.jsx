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
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)] sm:pt-10 pb-28 sm:pb-12 transition-colors duration-700
            bg-slate-50 dark:bg-gray-950 p-4 relative overflow-x-hidden"
        >
            <div className="app-container z-10">
                <div className="
                    relative
                    rounded-[2rem] sm:rounded-[3rem] border border-white dark:border-gray-700/50
                    shadow-[0_8px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]
                    p-6 sm:p-20
                    bg-white/60 dark:bg-gray-900/40 backdrop-blur-3xl 
                    transition-all duration-700 ease-out"
                >
                    <div className="text-center mb-10 sm:mb-16">
                        <span className="inline-block px-6 py-2 rounded-full bg-indigo-600 dark:bg-indigo-900/30 text-white dark:text-indigo-400 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-6 animate-pulse">
                            {t('route.lunar')}
                        </span>
                        <h1 className="text-4xl sm:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight font-zendots">
                            {t('route.countdown')}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-12">
                        {[
                            { label: t('time.days'), value: timeLeft.days, color: 'text-rose-500', bg: 'bg-rose-500/5', border: 'border-rose-200/50' },
                            { label: t('time.hours'), value: timeLeft.hours, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/5', border: 'border-fuchsia-200/50' },
                            { label: t('time.minutes'), value: timeLeft.minutes, color: 'text-cyan-500', bg: 'bg-cyan-500/5', border: 'border-cyan-200/50' },
                            { label: t('time.seconds'), value: timeLeft.seconds, color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-200/50' },
                        ].map((unit, i) => (
                            <div key={i} className="flex flex-col items-center group perspective-1000">
                                <div className={`relative w-full aspect-[3/1.2] sm:aspect-square flex flex-col items-center justify-center rounded-2xl sm:rounded-[3.5rem] 
                                    bg-slate-900/95 dark:bg-black 
                                    shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
                                    border-[3px] sm:border-[6px] border-slate-100 dark:border-zinc-900
                                    transition-all duration-500 overflow-hidden`}>

                                    {/* Color Dilution Layer (Light Mode) */}
                                    <div className={`absolute inset-0 ${unit.bg} opacity-100 dark:opacity-0 pointer-events-none transition-colors duration-500`}></div>

                                    {/* Glassy Overlay Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none z-10"></div>

                                    {/* Digital Background Segments */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-10"></div>
                                    <span className="absolute text-5xl sm:text-7xl font-bold text-white/[0.02] dark:text-white/[0.04] font-orbitron tabular-nums select-none tracking-widest leading-none z-0">
                                        88
                                    </span>

                                    {/* Actual Glowing Value */}
                                    <span className={`relative text-5xl sm:text-7xl font-bold ${unit.color} filter drop-shadow-[0_0_12px_currentColor] font-orbitron tabular-nums tracking-widest leading-none z-20`}>
                                        {unit.value.toString().padStart(2, '0')}
                                    </span>

                                    <span className="absolute bottom-2 sm:bottom-10 text-[10px] sm:text-xl font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight sm:tracking-[0.4em] z-20">
                                        {unit.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <span className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 dark:bg-zinc-800 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.3em] shadow-2xl transition-all">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
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
