import { Link } from "react-router-dom"
import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types" // Import PropTypes for prop validation

const DropdownContext = createContext()

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="unit-dropdown-container">{children}</div>
        </DropdownContext.Provider>
    )
}

const Trigger = ({ children, className = '' }) => {
    const { open, setOpen, toggleOpen } = useContext(DropdownContext)

    return (
        <div className={`unit-dropdown-trigger-wrapper ${className}`}>
            <div
                onClick={toggleOpen}
                className="unit-dropdown-trigger"
            >
                {children}
            </div>

            {open && (
                <div
                    className="unit-dropdown-backdrop"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </div>
    )
}

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white dark:bg-gray-700',
    children,
}) => {
    const { open, setOpen } = useContext(DropdownContext)

    let alignmentClasses = 'origin-top'

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0'
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0'
    }

    const widthClasses = {
        '40': 'w-40',
        '48': 'w-48',
        '56': 'w-56',
        '64': 'w-64',
    }[width] || 'w-48'

    return open ? (
        <div
            className={`unit-dropdown-menu ${alignmentClasses} ${widthClasses}`}
            onClick={() => setOpen(false)}
        >
            <div
                className={`unit-dropdown-content ${contentClasses}`}
            >
                {children}
            </div>
        </div>
    ) : null
}

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={`unit-dropdown-link ${className}`}
        >
            {children}
        </Link>
    )
}

// Prop types validation
Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
}

Trigger.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

Content.propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    width: PropTypes.oneOf(['40', '48', '56', '64']),
    contentClasses: PropTypes.string,
    children: PropTypes.node.isRequired,
}

DropdownLink.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

Dropdown.Trigger = Trigger
Dropdown.Content = Content
Dropdown.Link = DropdownLink

export default Dropdown
