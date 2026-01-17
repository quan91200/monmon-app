import {
    Link,
    useLocation
} from 'react-router-dom'
import PropTypes from 'prop-types'

const PillNav = ({ children, icon, to, className, active = '' }) => {
    const location = useLocation()
    const isActive = to !== '#' && location.pathname === to

    const content = (
        <>
            {icon && (
                <span className={`${isActive ? active : ''}`}>{icon}</span>
            )}
            <span>{children}</span>
        </>
    )

    const baseClasses = `unit-pill-nav ${className} ${isActive ? active : ''}`

    if (!to || to === '#') {
        return (
            <div className={baseClasses}>
                <div className="unit-pill-content">
                    {content}
                </div>
            </div>
        )
    }

    return (
        <Link to={to} className={baseClasses}>
            <div className="unit-pill-content">
                {content}
            </div>
        </Link>
    )
}

export default PillNav

PillNav.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    activeStyles: PropTypes.object,
    active: PropTypes.string
}
