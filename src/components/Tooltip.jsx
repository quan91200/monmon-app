/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Tooltip - A component that displays information when hovering over an element.
 * 
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
const Tooltip = ({ content, children, position = 'top' }) => {
    const [show, setShow] = useState(false)
    const containerRef = useRef(null)
    const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 })

    useEffect(() => {
        const handleMouseOver = (e) => {
            const rect = e.target.getBoundingClientRect()
            let styles = { top: 0, left: 0 }

            if (position === 'top') {
                styles.top = rect.top + window.scrollY - 10
                styles.left = rect.left + window.scrollX + rect.width / 2
            } else if (position === 'bottom') {
                styles.top = rect.top + window.scrollY + rect.height + 10
                styles.left = rect.left + window.scrollX + rect.width / 2
            } else if (position === 'left') {
                styles.top = rect.top + window.scrollY + rect.height / 2
                styles.left = rect.left + window.scrollX - 10
            } else if (position === 'right') {
                styles.top = rect.top + window.scrollY + rect.height / 2
                styles.left = rect.left + window.scrollX + rect.width + 10
            }

            setPositionStyle(styles)
            setShow(true)
        }

        const handleMouseOut = () => setShow(false)

        const target = containerRef.current
        if (target) {
            target.addEventListener('mouseenter', handleMouseOver)
            target.addEventListener('mouseleave', handleMouseOut)
        }

        return () => {
            if (target) {
                target.removeEventListener('mouseenter', handleMouseOver)
                target.removeEventListener('mouseleave', handleMouseOut)
            }
        }
    }, [position])

    return (
        <>
            <span ref={containerRef}>{children}</span>
            {show &&
                ReactDOM.createPortal(
                    <div
                        className="unit-tooltip"
                        style={{
                            top: positionStyle.top,
                            left: positionStyle.left,
                            transform: position === 'top' ? 'translate(-50%, -100%)' :
                                position === 'bottom' ? 'translate(-50%, 0)' :
                                    position === 'left' ? 'translate(-100%, -50%)' :
                                        'translate(0, -50%)'
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    )
}

Tooltip.propTypes = {
    content: PropTypes.node,
    children: PropTypes.node,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
}

export default Tooltip
