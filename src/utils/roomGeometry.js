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
  snappedX = Math.max(Math.ceil(minX / GRID_SIZE) * GRID_SIZE, Math.min(Math.floor(maxX / GRID_SIZE) * GRID_SIZE, snappedX));
  snappedY = Math.max(Math.ceil(minY / GRID_SIZE) * GRID_SIZE, Math.min(Math.floor(maxY / GRID_SIZE) * GRID_SIZE, snappedY));

  return { x: snappedX, y: snappedY };
}


