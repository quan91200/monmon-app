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
        <div className="unit-search-wrapper">
            <div className={`unit-search-bar ${isExpanded ? 'unit-search-bar-expanded' : 'unit-search-bar-collapsed'}`}>
                <button
                    onClick={toggleExpand}
                    className={`unit-search-trigger ${isExpanded ? 'unit-has-margin' : ''}`}
                >
                    <HiOutlineSearch size={22} />
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search moments..."
                    className={`unit-search-input ${isExpanded ? 'unit-search-input-visible' : 'unit-search-input-hidden'}`}
                    value={search}
                    onChange={handleSearchChange}
                />

                {search && isExpanded && (
                    <button
                        onClick={handleClear}
                        className="unit-search-clear"
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
