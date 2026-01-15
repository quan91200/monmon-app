/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ content, children, position = 'top' }) => {
    const [show, setShow] = useState(false)
    const tooltipRef = useRef(null)
    const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 })

    useEffect(() => {
        const handleMouseOver = (e) => {
            const rect = e.target.getBoundingClientRect()

            // Dựa vào position prop để quyết định cách tính vị trí
            let positionStyles = { top: 0, left: 0 }

            if (position === 'top') {
                positionStyles.top = rect.top + window.scrollY - 40
                positionStyles.left = rect.left + window.scrollX + rect.width / 2
            } else if (position === 'bottom') {
                positionStyles.top = rect.top + window.scrollY + rect.height + 5
                positionStyles.left = rect.left + window.scrollX + rect.width / 2
            } else if (position === 'left') {
                positionStyles.top = rect.top + window.scrollY + rect.height / 2
                positionStyles.left = rect.left + window.scrollX - 100
            } else if (position === 'right') {
                positionStyles.top = rect.top + window.scrollY + rect.height / 2
                positionStyles.left = rect.left + window.scrollX + rect.width + 5
            }

            setPositionStyle(positionStyles)
            setShow(true)
        }

        const handleMouseOut = () => setShow(false)

        if (tooltipRef.current) {
            tooltipRef.current.addEventListener('mouseenter', handleMouseOver)
            tooltipRef.current.addEventListener('mouseleave', handleMouseOut)
        }

        return () => {
            if (tooltipRef.current) {
                tooltipRef.current.removeEventListener('mouseenter', handleMouseOver)
                tooltipRef.current.removeEventListener('mouseleave', handleMouseOut)
            }
        }
    }, [position])

    return (
        <>
            <span ref={tooltipRef}>{children}</span>
            {show &&
                ReactDOM.createPortal(
                    <div
                        className="absolute z-50 bg-gray-700 text-white text-sm rounded p-2"
                        style={{ top: positionStyle.top, left: positionStyle.left, transform: 'translateX(-50%)' }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    )
}

export default Tooltip

Tooltip.propTypes = {
    content: PropTypes.node,
    children: PropTypes.node,
    position: PropTypes.string
}