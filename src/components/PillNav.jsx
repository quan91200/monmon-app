import { Link, useLocation } from 'react-router-dom'
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

    const baseClasses = `flex items-center space-x-2 transition-all duration-200 outline-none focus:outline-none rounded-lg cursor-pointer ${className} ${isActive ? active : ''}`

    if (!to || to === '#') {
        return (
            <div className={baseClasses}>
                <div className="flex items-center space-x-1">
                    {content}
                </div>
            </div>
        )
    }

    return (
        <Link to={to} className={baseClasses}>
            <div className="flex items-center space-x-1">
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
