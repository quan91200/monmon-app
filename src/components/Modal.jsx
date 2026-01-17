import PropTypes from 'prop-types'

/**
 * Modal - A reusable dialog component.
 * 
 * @param {Object} props - Component props.
 * @returns {JSX.Element|null} The rendered component.
 */
const Modal = ({
    isOpen,
    onClose,
    children,
    hideWrap = false,
    position = 'center',
    enableClose = true
}) => {
    if (!isOpen) return null

    const positionClasses = {
        center: 'unit-modal-center',
        top: 'unit-modal-top',
        bottom: 'unit-modal-bottom',
        left: 'unit-modal-left',
        right: 'unit-modal-right',
    }

    const handleWrapClick = () => {
        if (enableClose) {
            onClose()
        }
    }

    return (
        <div
            className={`unit-modal-backdrop ${positionClasses[position] || 'unit-modal-center'} ${hideWrap ? 'unit-modal-backdrop-transparent' : 'unit-modal-backdrop-bg'
                }`}
            onClick={handleWrapClick}
        >
            <div
                className="unit-modal-content unit-animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    hideWrap: PropTypes.bool,
    enableClose: PropTypes.bool,
    position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right'])
}
