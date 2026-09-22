import React, { useRef, useState, useEffect, useCallback } from 'react';
import FurnitureItem from './FurnitureItem.jsx';
import { getFurnitureById } from '../data/furniture.js';
import '../styles/canvas.css';

export const CANVAS_WIDTH = 960;
export const CANVAS_HEIGHT = 640;
export const GRID_SIZE = 32;

/**
 * Calculate visual boundary limits taking 90/270 degree rotation into account.
 */
export function getItemBounds(width, height, rotation = 0) {
  const isRotated90 = rotation % 180 !== 0;
  let minX, maxX, minY, maxY;

  if (isRotated90) {
    minX = (height - width) / 2;
    maxX = CANVAS_WIDTH - (width + height) / 2;
    minY = (width - height) / 2;
    maxY = CANVAS_HEIGHT - (width + height) / 2;
  } else {
    minX = 0;
    maxX = CANVAS_WIDTH - width;
    minY = 0;
    maxY = CANVAS_HEIGHT - height;
  }

  maxX = Math.max(minX, maxX);
  maxY = Math.max(minY, maxY);

  return { minX, maxX, minY, maxY };
}

/**
 * Snap coordinates to GRID_SIZE while strictly constraining within canvas boundaries.
 */
export function snapAndClampPosition(rawX, rawY, width, height, rotation = 0) {
  const { minX, maxX, minY, maxY } = getItemBounds(width, height, rotation);

  // 1. Boundary restriction
  const clampedX = Math.max(minX, Math.min(maxX, rawX));
  const clampedY = Math.max(minY, Math.min(maxY, rawY));

  // 2. Grid Snap (32px grid)
  let snappedX = Math.round(clampedX / GRID_SIZE) * GRID_SIZE;
  let snappedY = Math.round(clampedY / GRID_SIZE) * GRID_SIZE;

  // 3. Final clamp to guarantee it stays inside room
  snappedX = Math.max(minX, Math.min(maxX, snappedX));
  snappedY = Math.max(minY, Math.min(maxY, snappedY));

  return { x: snappedX, y: snappedY };
}

export default function RoomCanvas({
  space,
  placedItems = [],
  selectedItemId,
  onSelectItem,
  onUpdateItemPosition,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [draggingId, setDraggingId] = useState(null);
  const dragRef = useRef(null);

  // Measure container and compute canvas scale to fit any screen (PC, Tablet, Mobile)
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (!clientWidth || !clientHeight) return;

      const isMobile = window.innerWidth <= 767;
      // On mobile, keep ~14px margin on each side (total 28px)
      const marginX = isMobile ? 28 : 48;
      const marginY = isMobile ? 20 : 48;

      const scaleX = (clientWidth - marginX) / CANVAS_WIDTH;
      const scaleY = (clientHeight - marginY) / CANVAS_HEIGHT;

      // Fit inside container, max scale 1 (do not upscale beyond 100% on huge screens)
      const fittedScale = Math.min(scaleX, scaleY, 1);
      setScale(Math.max(0.25, fittedScale));
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Pointer Down on furniture item
  const handleItemPointerDown = useCallback((e, instanceId) => {
    if (e.button !== undefined && e.button !== 0) return;

    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    onSelectItem(instanceId);

    const currentItem = placedItems.find((it) => it.instanceId === instanceId);
    if (!currentItem) return;

    setDraggingId(instanceId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentItem.x,
      initialY: currentItem.y,
      instanceId,
      scale, // Save current scale for coordinate conversion
      targetElement: e.currentTarget,
    };
  }, [placedItems, onSelectItem, scale]);

  // Pointer Move with Grid Snap + Boundary Clamp
  const handlePointerMove = useCallback((e) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;

    const { startX, startY, initialX, initialY, instanceId, scale: dragScale } = dragRef.current;
    const currentItem = placedItems.find((it) => it.instanceId === instanceId);
    if (!currentItem) return;

    const furnitureData = getFurnitureById(currentItem.furnitureId);
    const itemWidth = furnitureData ? furnitureData.width : 80;
    const itemHeight = furnitureData ? furnitureData.height : 60;
    const itemRotation = currentItem.rotation || 0;

    // Convert screen pixel delta to canvas pixel delta using the scale factor
    const effectiveScale = dragScale || 1;
    const dx = (e.clientX - startX) / effectiveScale;
    const dy = (e.clientY - startY) / effectiveScale;

    const rawX = initialX + dx;
    const rawY = initialY + dy;

    // Apply boundary constraint and grid snap
    const { x: newX, y: newY } = snapAndClampPosition(
      rawX,
      rawY,
      itemWidth,
      itemHeight,
      itemRotation
    );

    onUpdateItemPosition(instanceId, newX, newY);
  }, [placedItems, onUpdateItemPosition]);

  // Pointer Up / Cancel
  const handlePointerEnd = useCallback((e) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;

    if (dragRef.current.targetElement) {
      try {
        dragRef.current.targetElement.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    dragRef.current = null;
    setDraggingId(null);
  }, []);

  // Canvas background click -> Deselect
  const handleCanvasClick = useCallback((e) => {
    if (
      e.target === canvasRef.current ||
      e.target.classList.contains('canvas-grid-overlay') ||
      e.target.closest('.canvas-empty-guide') ||
      e.target === containerRef.current
    ) {
      onSelectItem(null);
    }
  }, [onSelectItem]);

  return (
    <main
      ref={containerRef}
      className="room-canvas-container"
      onClick={handleCanvasClick}
    >
      {/* Scaled Canvas Wrapper for layout centering without flex-misalignment */}
      <div
        className="room-canvas-scale-wrapper"
        style={{
          width: `${CANVAS_WIDTH * scale}px`,
          height: `${CANVAS_HEIGHT * scale}px`,
          position: 'relative',
          margin: 'auto',
          flexShrink: 0,
        }}
      >
        <div
          ref={canvasRef}
          className="room-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            '--floor-color': space.floorColor,
            '--wall-color': space.wallColor,
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClick={handleCanvasClick}
        >
          <div className="canvas-grid-overlay" />

          {/* Empty Canvas Guide */}
          {placedItems.length === 0 && (
            <div className="canvas-empty-guide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              <p>가구 카탈로그에서 가구를 선택하여 배치하세요.</p>
              <span>마우스나 터치로 가구를 자유롭게 드래그할 수 있습니다.</span>
            </div>
          )}

          {/* Render Placed Furniture Items */}
          {placedItems.map((item) => {
            const furnitureData = getFurnitureById(item.furnitureId);
            return (
              <FurnitureItem
                key={item.instanceId}
                item={item}
                furnitureData={furnitureData}
                isSelected={item.instanceId === selectedItemId}
                isDragging={item.instanceId === draggingId}
                onPointerDown={handleItemPointerDown}
                onClick={onSelectItem}
              />
            );
          })}

          <div className="canvas-watermark">
            <span>{space.name} Room</span>
          </div>
        </div>
      </div>
    </main>
  );
}
