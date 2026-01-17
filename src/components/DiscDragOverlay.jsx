import { IoTrashOutline } from "react-icons/io5"
import PropTypes from 'prop-types'

/**
 * DiscDragOverlay - Visual feedback for the disc drag-and-drop interaction.
 * Displays a drop zone and a floating replica of the disc following the pointer.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.dragData - The current drag state (position, dragging status, etc.).
 * @param {boolean} props.isHovering - Whether the disc is being hovered.
 * @param {Object} props.dropZoneRef - Ref for the drop zone container.
 * @param {string} props.dropZoneText - Localized text for the drop zone.
 * @param {string} props.logo - URL of the disc/logo image.
 * @param {boolean} props.isMiniMode - Whether the player is in mini mode.
 * @returns {JSX.Element} The rendered component.
 */
const DiscDragOverlay = ({
  dragData,
  isHovering,
  dropZoneRef,
  dropZoneText,
  logo,
  isMiniMode
}) => {
  // Only show drop zone if in mini mode and either hovering or actively dragging
  const showDropZone = isMiniMode && (isHovering || dragData.isDragging)

  return (
    <>
      {/* Drop Zone (Xóa/Dừng nhạc) */}
      <div
        ref={dropZoneRef}
        className={`unit-player-drop-zone ${showDropZone ? 'visible' : ''} ${dragData.isOverDropZone ? 'active' : ''}`}
      >
        <IoTrashOutline className="unit-player-drop-zone-icon" />
        <span>{dropZoneText}</span>
      </div>

      {/* Dragging Disc Replica */}
      {dragData.isDragging && (
        <div
          className="unit-player-dragging-replica"
          style={{
            left: dragData.x - 30, // Centering the 60px replica
            top: dragData.y - 30,
            transform: dragData.isOverDropZone ? 'scale(0.5)' : 'scale(1)',
            opacity: dragData.isOverDropZone ? 0.3 : 1,
            transition: 'transform 0.2s, opacity 0.2s'
          }}
        >
          <img src={logo} alt="Dragging Disc" className="unit-full-img" />
        </div>
      )}
    </>
  )
}

DiscDragOverlay.propTypes = {
  dragData: PropTypes.shape({
    isDragging: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOverDropZone: PropTypes.bool.isRequired,
  }).isRequired,
  isHovering: PropTypes.bool.isRequired,
  dropZoneRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  dropZoneText: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  isMiniMode: PropTypes.bool.isRequired,
}

export default DiscDragOverlay
