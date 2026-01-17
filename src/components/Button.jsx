import PropTypes from "prop-types"
import {
    useMemo
} from "react"

/**
 * Button - A reusable button component with various variants and sizes.
 * 
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
const Button = ({
    children,
    variant = "secondary",
    size = "medium",
    onClick,
    disabled = false,
    className = "",
    ...rest
}) => {
    const computedClasses = useMemo(() => {
        const classes = ["unit-button-base"]

        if (disabled) {
            classes.push("unit-button-disabled")
        } else {
            // Map variants to our new CSS classes
            const variantMap = {
                primary: "unit-btn-primary",
                outlinePrimary: "unit-btn-outline-primary",
                secondary: "unit-btn-secondary",
                outlineSecondary: "unit-btn-outline-secondary",
                // fallback for others to standard secondary
                info: "unit-btn-secondary",
                success: "unit-btn-secondary",
                warning: "unit-btn-secondary",
            }
            classes.push(variantMap[variant] || "unit-btn-secondary")
        }

        const sizeMap = {
            small: "unit-button-sm",
            medium: "unit-button-md",
            large: "unit-button-lg",
            full: "unit-button-full",
            circle: "unit-button-circle",
        }
        classes.push(sizeMap[size] || "unit-button-md")

        if (className) classes.push(className)

        return classes.join(" ")
    }, [variant, size, disabled, className])

    return (
        <button
            className={computedClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        "primary", "secondary", "info", "success", "warning",
        "outlinePrimary", "outlineSecondary", "outlineInfo", "outlineSuccess", "outlineWarning"
    ]),
    size: PropTypes.oneOf(["small", "medium", "large", "full", 'circle']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default Button
