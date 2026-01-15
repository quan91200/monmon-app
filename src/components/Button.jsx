import PropTypes from "prop-types"
import clsx from "clsx"

const colorVariants = {
    primary: {
        outline: "border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:border-transparent dark:border-red-700 dark:text-red-700 dark:hover:bg-red-700 dark:hover:text-white",
        filled: "bg-red-500 text-white border-red-500 hover:bg-transparent hover:text-red-500 hover:border-red-500 dark:bg-red-700 dark:border-red-700 dark:hover:text-red-700 dark:hover:border-red-700 dark:hover:bg-transparent"
    },
    secondary: {
        outline: "border-gray-500 text-gray-500 bg-transparent hover:bg-gray-500 hover:text-white hover:border-transparent dark:border-gray-700 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white",
        filled: "bg-gray-500 text-white border-gray-500 hover:bg-transparent hover:text-gray-500 hover:border-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:hover:text-gray-700 dark:hover:border-gray-700 dark:hover:bg-transparent"
    },
    info: {
        outline: "border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white hover:border-transparent dark:border-blue-700 dark:text-blue-700 dark:hover:bg-blue-700 dark:hover:text-white",
        filled: "bg-blue-500 text-white border-blue-500 hover:bg-transparent hover:text-blue-500 hover:border-blue-500 dark:bg-blue-700 dark:border-blue-700 dark:hover:text-blue-700 dark:hover:border-blue-700 dark:hover:bg-transparent"
    },
    success: {
        outline: "border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white hover:border-transparent dark:border-green-700 dark:text-green-700 dark:hover:bg-green-700 dark:hover:text-white",
        filled: "bg-green-500 text-white border-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 dark:bg-green-700 dark:border-green-700 dark:hover:text-green-700 dark:hover:border-green-700 dark:hover:bg-transparent"
    },
    warning: {
        outline: "border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white hover:border-transparent dark:border-yellow-700 dark:text-yellow-700 dark:hover:bg-yellow-700 dark:hover:text-white",
        filled: "bg-yellow-500 text-white border-yellow-500 hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500 dark:bg-yellow-700 dark:border-yellow-700 dark:hover:text-yellow-700 dark:hover:border-yellow-700 dark:hover:bg-transparent"
    }
}

const Button = ({
    children,
    variant = "secondary",
    size = "medium",
    onClick,
    disabled = false,
    className = "",
    ...rest
}) => {
    const baseClasses = "transition duration-200 ease-in-out rounded font-medium focus:outline-none"

    const sizeClasses = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
        full: "w-full px-4 py-2 text-xl",
        circle: "w-12 h-12 rounded-full flex items-center justify-center"
    }

    const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed"

    const [color, type] = variant.includes("outline")
        ? [variant.replace("outline", "").toLowerCase(), "outline"]
        : [variant, "filled"]

    const computedClasses = clsx(
        baseClasses,
        disabled ? disabledClasses : colorVariants[color]?.[type],
        size === 'circle' ? sizeClasses['circle'] : sizeClasses[size],
        className
    )

    return (
        <button
            className={clsx(computedClasses, "border-2")}
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