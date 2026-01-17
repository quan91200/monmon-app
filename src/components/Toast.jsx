import PropTypes from "prop-types"
import { useEffect } from "react"
import { TiTick } from "react-icons/ti"
import { IoWarningOutline, IoInformationCircleOutline } from "react-icons/io5"
import { MdErrorOutline } from "react-icons/md"

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

    const typeIcons = {
        success: <TiTick />,
        primary: <MdErrorOutline />,
        info: <IoInformationCircleOutline />,
        warning: <IoWarningOutline />,
    }

    // Determine entry animation class based on position
    const getAnimationClass = () => {
        if (pos === 'top-center') return 'unit-animate-slide-in-top-center'
        if (pos === 'bottom-center') return 'unit-animate-slide-in-bottom-center'
        if (pos.includes('right')) return 'unit-animate-slide-in-right'
        if (pos.includes('left')) return 'unit-animate-slide-in-left'
        if (pos.includes('top')) return 'unit-animate-slide-in-top'
        if (pos.includes('bottom')) return 'unit-animate-slide-in-bottom'
        return 'unit-animate-fade-in'
    }

    // Simplified type mapping (handling outlines as solid for now or adding variants if needed)
    const baseType = type.replace('outline', '').toLowerCase()

    return (
        <div
            className={`unit-toast unit-toast-${pos} unit-toast-${baseType} ${getAnimationClass()}`}
            onClick={onClose}
            role="alert"
        >
            <div className="unit-toast-icon">
                {typeIcons[type]}
            </div>

            <span className="unit-toast-message">
                {message}
            </span>

            {duration > 0 && (
                <div
                    className="unit-toast-progress"
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
