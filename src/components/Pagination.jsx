import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md'

import Button from './Button'
import { PAGINATION, BREAKPOINTS } from '../constants'

/**
 * Pagination Component - Provides a navigable interface for multi-paged lists.
 * Supports responsive display limits and direct page access.
 * 
 * @param {Object} props - Component properties.
 * @param {number} props.totalPages - Total number of available pages.
 * @param {number} props.currentPage - The current active page.
 * @param {Function} props.onPageChange - Callback triggered on page selection.
 * @returns {JSX.Element} The rendered Pagination component.
 */
const Pagination = ({
    totalPages = 1,
    currentPage = 1,
    onPageChange,
}) => {
    const [maxPageDisplay, setMaxPageDisplay] = useState(PAGINATION.MAX_DISPLAY_DESKTOP);

    useEffect(() => {
        /**
         * Updates the number of visible page numbers based on screen width.
         */
        const handleResize = () => {
            if (window.innerWidth < BREAKPOINTS.MOBILE) {
                setMaxPageDisplay(PAGINATION.MAX_DISPLAY_MOBILE);
            } else {
                setMaxPageDisplay(PAGINATION.MAX_DISPLAY_DESKTOP);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Calculates the array of page numbers to be displayed in the UI.
     * @returns {number[]} Array of page numbers.
     */
    const getPageNumbers = () => {
        const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);
        let startPage = Math.max(1, currentPage - halfMaxPageDisplay);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageDisplay);

        // Adjust window if near the beginning
        if (currentPage - halfMaxPageDisplay <= 0) {
            endPage = Math.min(totalPages, endPage + (halfMaxPageDisplay - currentPage + 1));
        }

        // Adjust window if near the end
        if (totalPages - currentPage < halfMaxPageDisplay) {
            startPage = Math.max(1, startPage - (halfMaxPageDisplay - (totalPages - currentPage)));
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 my-8">
            <Button
                variant="info"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="!p-2 rounded-xl border-none shadow-sm dark:bg-gray-800 disabled:opacity-30"
            >
                <MdOutlineSkipPrevious size={20} />
            </Button>

            {pageNumbers[0] > 1 && (
                <div className="flex items-center gap-1">
                    <ButtonNumber onClick={() => onPageChange(1)}>1</ButtonNumber>
                    {pageNumbers[0] > 2 && <span className="text-gray-400 dark:text-gray-600 px-1 font-bold">...</span>}
                </div>
            )}

            {pageNumbers.map((number) => (
                <ButtonNumber
                    key={number}
                    className={`
                        transition-all duration-300 font-bold px-3 py-1.5 rounded-xl
                        ${currentPage === number
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110'
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 border border-transparent hover:border-blue-200'
                        }`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </ButtonNumber>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <div className="flex items-center gap-1">
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <span className="text-gray-400 dark:text-gray-600 px-1 font-bold">...</span>
                    )}
                    <ButtonNumber onClick={() => onPageChange(totalPages)}>{totalPages}</ButtonNumber>
                </div>
            )}

            <Button
                variant="info"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="!p-2 rounded-xl border-none shadow-sm dark:bg-gray-800 disabled:opacity-30"
            >
                <MdOutlineSkipNext size={20} />
            </Button>
        </div>
    )
}

/**
 * Internal helper component for numeric page buttons.
 */
const ButtonNumber = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded-xl font-bold transition-all duration-300 ${className}`}
    >
        {children}
    </button>
)

ButtonNumber.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination
