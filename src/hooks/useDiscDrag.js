import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Custom hook to handle 2D dragging logic for circular elements (discs).
 */
export const useDiscDrag = ({ onDropSuccess, enabled = true }) => {
  const [dragData, setDragData] = useState({
    isDragging: false,
    x: 0,
    y: 0,
    isOverDropZone: false
  })
  const [isHovering, setIsHovering] = useState(false)
  const dropZoneRef = useRef(null)
  const startPos = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  const checkIsOverDropZone = useCallback((x, y) => {
    if (!dropZoneRef.current) return false
    const rect = dropZoneRef.current.getBoundingClientRect()
    const padding = 20
    return x >= rect.left - padding && x <= rect.right + padding &&
      y >= rect.top - padding && y <= rect.bottom + padding
  }, [])

  const handlePointerDown = (e) => {
    if (!enabled) return
    startPos.current = { x: e.clientX, y: e.clientY }

    const handleMove = (e) => {
      const dist = Math.sqrt(
        Math.pow(e.clientX - startPos.current.x, 2) +
        Math.pow(e.clientY - startPos.current.y, 2)
      )

      if (!isDraggingRef.current && dist > 5) {
        isDraggingRef.current = true
        setDragData(prev => ({ ...prev, isDragging: true }))
      }

      if (isDraggingRef.current) {
        const isOver = checkIsOverDropZone(e.clientX, e.clientY)
        setDragData(prev => ({ ...prev, x: e.clientX, y: e.clientY, isOverDropZone: isOver }))
      }
    }

    const handleUp = (e) => {
      if (isDraggingRef.current) {
        const isOver = checkIsOverDropZone(e.clientX, e.clientY)
        if (isOver && onDropSuccess) {
          onDropSuccess()
        }
      }

      isDraggingRef.current = false
      setDragData({ isDragging: false, x: 0, y: 0, isOverDropZone: false })
      setIsHovering(false)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    if (!isDraggingRef.current) setIsHovering(false)
  }

  return {
    dragData,
    isHovering,
    dropZoneRef,
    handlers: {
      onPointerDown: handlePointerDown,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  }
}
