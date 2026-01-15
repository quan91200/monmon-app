import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineSearch, HiX } from 'react-icons/hi'

/**
 * Search Component - An expandable search bar that filters results in real-time.
 * 
 * @param {Object} props
 * @param {Function} props.onSearch - Callback for when search query changes.
 * @param {Function} props.onClear - Callback for when search is cleared.
 */
const Search = ({ onSearch, onClear }) => {
    const [search, setSearch] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const inputRef = useRef(null)

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)
        onSearch(value)
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
        if (!isExpanded) {
            // Focus input after expansion
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
        }
    }

    const handleClear = () => {
        setSearch('')
        onClear()
        inputRef.current?.focus()
    }

    // Close when clicking outside if search is empty
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target) && search === '') {
                setIsExpanded(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [search])

    return (
        <div className="relative flex items-center">
            <div className={`
                flex items-center transition-all duration-500 ease-in-out overflow-hidden
                ${isExpanded ? 'w-48 sm:w-64 md:w-80 px-4 py-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700' : 'w-8 h-8 px-0 justify-center bg-transparent'}
                rounded-2xl
            `}>
                <button
                    onClick={toggleExpand}
                    className={`flex-shrink-0 text-gray-500 hover:text-blue-500 rounded-full transition-colors duration-300 hover:scale-110 opacity-40 bg-gray-300 p-2 hover:opacity-100 grayscale hover:grayscale-0 ${isExpanded ? 'mr-3' : ''}`}
                >
                    <HiOutlineSearch size={22} />
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search moments..."
                    className={`
                        bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-200 placeholder-gray-400
                        transition-all duration-300 w-full text-sm font-medium
                        ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
                    `}
                    value={search}
                    onChange={handleSearchChange}
                />

                {search && isExpanded && (
                    <button
                        onClick={handleClear}
                        className="flex-shrink-0 text-gray-400 hover:text-rose-500 transition-colors duration-300 ml-2"
                    >
                        <HiX size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
}

export default Search
