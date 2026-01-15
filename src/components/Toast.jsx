import PropTypes from "prop-types"
import { useEffect } from "react"
import { TiTick } from "react-icons/ti"
import { IoWarningOutline, IoInformationCircleOutline } from "react-icons/io5"
import { MdErrorOutline } from "react-icons/md"
import positionClasses from "../utils/spFunc"

/**
 * Toast Component - A versatile notification system with auto-dismissal.
 * Features progress tracking and responsive positioning.
 * 
 * @param {Object} props - Component properties.
 * @param {boolean} props.open - Whether the toast is visible.
 * @param {Function} props.onClose - Callback to close the toast.
 * @param {string} props.message - Notification message.
 * @param {string} props.type - Visual style (success, primary, info, warning).
 * @param {string} props.pos - Screen position.
 * @param {number} props.duration - Auto-dismissal timeout in ms.
 * @returns {JSX.Element|null} The rendered Toast component.
 */
const Toast = ({
    open = false,
    onClose = () => { },
    message,
    type,
    pos = "top-right",
    duration = 2000,
}) => {
    useEffect(() => {
        if (open && duration) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [open, duration, onClose])

    if (!open) return null

    const typeClasses = {
        success: "bg-green-500 dark:bg-green-900/90 text-white",
        primary: "bg-red-500 dark:bg-red-900/90 text-white",
        info: "bg-blue-500 dark:bg-blue-900/90 text-white",
        warning: "bg-yellow-500 dark:bg-yellow-900/90 text-white",
        outlineSuccess: "border-green-500 dark:border-green-800 border-2 bg-transparent text-green-500 dark:text-green-400",
        outlinePrimary: "border-red-500 dark:border-red-800 border-2 bg-transparent text-red-500 dark:text-red-400",
        outlineInfo: "border-blue-500 dark:border-blue-800 border-2 bg-transparent text-blue-500 dark:text-blue-400",
        outlineWarning: "border-yellow-500 dark:border-yellow-800 border-2 bg-transparent text-yellow-500 dark:text-yellow-400"
    }

    const typeIcons = {
        success: <TiTick className="text-xl" />,
        primary: <MdErrorOutline className="text-xl" />,
        info: <IoInformationCircleOutline className="text-xl" />,
        warning: <IoWarningOutline className="text-xl" />,
        outlineSuccess: <TiTick className="text-xl" />,
        outlinePrimary: <MdErrorOutline className="text-xl" />,
        outlineInfo: <IoInformationCircleOutline className="text-xl" />,
        outlineWarning: <IoWarningOutline className="text-xl" />,
    }

    return (
        <div
            className={`fixed ${positionClasses[pos]} p-4 rounded-xl shadow-2xl flex 
                        items-center gap-3 cursor-pointer animate-fade-in 
                        transition-all duration-300 z-[9999]
                        backdrop-blur-md ${typeClasses[type]} hover:scale-105 active:scale-95 overflow-hidden`
            }
            onClick={onClose}
            role="alert"
        >
            <div className="flex-shrink-0 opacity-90">
                {typeIcons[type]}
            </div>

            <span className="flex-1 font-inter font-medium text-sm tracking-wide">
                {message}
            </span>

            {duration > 0 && (
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white/40 w-full"
                    style={{
                        animation: `progress ${duration}ms linear forwards`
                    }}
                />
            )}
        </div>
    )
}

Toast.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.oneOf([
        'success',
        'primary',
        'info',
        'warning',
        'outlineSuccess',
        'outlinePrimary',
        'outlineInfo',
        'outlineWarning'
    ]),
    pos: PropTypes.oneOf([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center'
    ]),
    duration: PropTypes.number
}

export default Toast
