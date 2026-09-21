import React from 'react';
import FurnitureGraphic from './FurnitureGraphic.jsx';

export default function FurnitureItem({
  item,
  furnitureData,
  isSelected,
  isDragging,
  onPointerDown,
  onClick,
}) {
  if (!furnitureData) return null;

  const { width, height } = furnitureData;
  const { x, y, rotation = 0, zIndex = 1 } = item;

  return (
    <div
      className={`furniture-item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: isDragging ? 9999 : zIndex,
      }}
      onPointerDown={(e) => {
        // Prevent event from bubbling to canvas click deselect
        e.stopPropagation();
        onPointerDown(e, item.instanceId);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.instanceId);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${furnitureData.name} (${x}, ${y})`}
    >
      <FurnitureGraphic
        furniture={furnitureData}
        width={width}
        height={height}
        isThumbnail={false}
      />

      {/* Selected UI indicators */}
      {isSelected && (
        <>
          <div className="selected-corner-dot corner-tl" />
          <div className="selected-corner-dot corner-tr" />
          <div className="selected-corner-dot corner-bl" />
          <div className="selected-corner-dot corner-br" />
          <div className="selected-badge-indicator" title={`${rotation}°`}>
            {rotation !== 0 ? `${rotation}°` : '✓'}
          </div>
        </>
      )}
    </div>
  );
}
