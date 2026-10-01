import React from 'react';
import FurnitureGraphic from './FurnitureGraphic.jsx';

export default function FurnitureItem({
  item,
  furnitureData,
  isSelected,
  isDragging,
  isResizing,
  onPointerDown,
  onResizeStart,
  onClick,
}) {
  if (!furnitureData) return null;

  const scale = typeof item.scale === 'number' ? item.scale : 1;
  const actualWidth = Math.round(furnitureData.width * scale);
  const actualHeight = Math.round(furnitureData.height * scale);
  const { x, y, rotation = 0, zIndex = 1 } = item;

  const handleCornerPointerDown = (e, handle) => {
    // Crucial: prevent drag moving of the entire furniture
    e.stopPropagation();
    onResizeStart?.(e, item.instanceId, handle);
  };

  return (
    <div
      className={`furniture-item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''}`}
      style={{
        width: `${actualWidth}px`,
        height: `${actualHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: isDragging || isResizing ? 9999 : zIndex,
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
        width={actualWidth}
        height={actualHeight}
        isThumbnail={false}
      />

      {/* Selected UI indicators & Resize handles */}
      {isSelected && (
        <>
          <div
            className="selected-corner-dot corner-tl"
            onPointerDown={(e) => handleCornerPointerDown(e, 'tl')}
            role="separator"
            aria-label="좌상단 크기 조절 핸들"
            title="크기 조절 (드래그, Alt: 중심 고정)"
          />
          <div
            className="selected-corner-dot corner-tr"
            onPointerDown={(e) => handleCornerPointerDown(e, 'tr')}
            role="separator"
            aria-label="우상단 크기 조절 핸들"
            title="크기 조절 (드래그, Alt: 중심 고정)"
          />
          <div
            className="selected-corner-dot corner-bl"
            onPointerDown={(e) => handleCornerPointerDown(e, 'bl')}
            role="separator"
            aria-label="좌하단 크기 조절 핸들"
            title="크기 조절 (드래그, Alt: 중심 고정)"
          />
          <div
            className="selected-corner-dot corner-br"
            onPointerDown={(e) => handleCornerPointerDown(e, 'br')}
            role="separator"
            aria-label="우하단 크기 조절 핸들"
            title="크기 조절 (드래그, Alt: 중심 고정)"
          />
          <div className="selected-badge-indicator" title={`${rotation}°`}>
            {rotation !== 0 ? `${rotation}°` : '✓'}
          </div>
        </>
      )}
    </div>
  );
}
