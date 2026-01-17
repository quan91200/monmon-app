import {
  useState,
  useRef,
  useEffect
} from 'react'
import PropTypes from 'prop-types'

/**
 * MarqueeText - A sub-component that scrolls text only if it overflows its container.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} props.className - Additional CSS classes for the text span.
 * @param {string} props.containerClassName - Additional CSS classes for the container.
 * @param {boolean} [props.hoverOnly=false] - If true, marquee only activates on hover.
 * @returns {JSX.Element} The rendered component.
 */
const MarqueeText = ({ text, className, containerClassName, hoverOnly = false }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [shouldMarquee, setShouldMarquee] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setShouldMarquee(textRef.current.scrollWidth > containerRef.current.clientWidth)
      }
    }

    const timeoutId = setTimeout(checkOverflow, 100)

    window.addEventListener('resize', checkOverflow)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [text])

  const animationClass = shouldMarquee ? (hoverOnly ? 'animate-hover' : 'animate') : ''
  const justifyClass = shouldMarquee ? '' : 'unit-justify-center'

  return (
    <div
      ref={containerRef}
      className={`unit-marquee-wrapper ${containerClassName || ''}`}
    >
      <div className={`unit-marquee-content ${justifyClass} ${animationClass}`}>
        <span ref={textRef} className={`unit-marquee-item ${className || ''}`}>
          {text}
        </span>
        {shouldMarquee && (
          <span className={`unit-marquee-item ${className || ''}`}>
            {text}
          </span>
        )}
      </div>
    </div>
  )
}

MarqueeText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  hoverOnly: PropTypes.bool,
}

export default MarqueeText
