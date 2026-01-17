import { useTheme } from '../context/ThemeContext'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

/**
 * Premium ThemeToggle component with micro-animations
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      onClick={toggleTheme}
      className="unit-theme-toggle group"
      aria-label="Toggle Theme"
    >
      <div className="unit-theme-icon-container">
        <div className={`unit-theme-icon-moon ${theme === 'dark' ? 'unit-active' : 'unit-inactive'}`}>
          <HiOutlineMoon size={24} className="unit-icon-rotate" />
        </div>
        <div className={`unit-theme-icon-sun ${theme === 'dark' ? 'unit-inactive' : 'unit-active'}`}>
          <HiOutlineSun size={24} className="unit-icon-rotate-sun" />
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
