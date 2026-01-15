import { useTheme } from '../context/ThemeContext'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

/**
 * Premium ThemeToggle component with micro-animations
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 hover:ring-pink-500/50 transition-all duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}>
          <HiOutlineMoon size={24} className="transform group-hover:rotate-12 transition-transform" />
        </div>
        <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${theme === 'dark' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}>
          <HiOutlineSun size={24} className="transform group-hover:rotate-90 transition-transform" />
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
