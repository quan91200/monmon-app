import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../context/ToastContext'

/**
 * Hook to disable common user interactions like Right Click and Select All (Ctrl+A)
 * and show a warning toast on right click.
 */
export const useSecurityActions = () => {
  const { t } = useTranslation('global')
  const { showToast } = useToast()

  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault()
      showToast(t('toast.security_warning'), 'warning')
    }

    // 2. Disable Select All (Ctrl+A) and other common copying shortcuts
    const handleKeyDown = (e) => {
      // Ctrl+A or Cmd+A (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault()
      }
    }

    // Add event listeners to document
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [t, showToast])
}
