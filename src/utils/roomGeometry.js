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

export const MIN_FURNITURE_SCALE = 0.5;
export const MAX_FURNITURE_SCALE = 1.5;

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

/**
 * Helper to get local offset of a corner anchor relative to center.
 */
function getAnchorLocalOffset(anchor, w, h) {
  switch (anchor) {
    case 'tl':
      return { x: -w / 2, y: -h / 2 };
    case 'tr':
      return { x: w / 2, y: -h / 2 };
    case 'bl':
      return { x: -w / 2, y: h / 2 };
    case 'br':
    default:
      return { x: w / 2, y: h / 2 };
  }
}

/**
 * Calculate updated scale and (x, y) during corner handle resize.
 * Supports:
 * - Opposite corner anchoring (default)
 * - Center anchoring (Alt/Option held)
 * - 0, 90, 180, 270 degree rotation
 * - Aspect ratio strictly preserved
 * - Scale strictly bounded between 0.5 and 1.5
 * - Strict canvas boundary clamping (furniture never exceeds canvas borders)
 */
export function calculateResizeGeometry({
  handle,
  isAlt = false,
  initialItem,
  baseWidth,
  baseHeight,
  deltaCanvasX,
  deltaCanvasY,
}) {
  const s0 = typeof initialItem.scale === 'number' ? initialItem.scale : 1;
  const rotation = initialItem.rotation || 0;
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // 1. Determine local direction of the handle relative to center
  let localDirX = 0;
  let localDirY = 0;
  switch (handle) {
    case 'tl':
      localDirX = -baseWidth;
      localDirY = -baseHeight;
      break;
    case 'tr':
      localDirX = baseWidth;
      localDirY = -baseHeight;
      break;
    case 'bl':
      localDirX = -baseWidth;
      localDirY = baseHeight;
      break;
    case 'br':
    default:
      localDirX = baseWidth;
      localDirY = baseHeight;
      break;
  }

  // Rotate handle direction by current rotation angle
  const dirX = localDirX * cos - localDirY * sin;
  const dirY = localDirX * sin + localDirY * cos;
  const diagLen = Math.hypot(baseWidth, baseHeight);
  const ux = dirX / diagLen;
  const uy = dirY / diagLen;

  // Project canvas movement onto rotated handle unit vector
  const proj = deltaCanvasX * ux + deltaCanvasY * uy;

  // Compute raw target scale based on anchor mode
  // In Alt mode (center-fixed), distance from center to handle is (diagLen * s0) / 2
  // In Anchor mode (opposite-corner-fixed), distance from anchor to handle is (diagLen * s0)
  const deltaScale = isAlt ? (proj * 2) / diagLen : proj / diagLen;
  const rawTargetScale = s0 + deltaScale;
  const targetScale = Math.max(MIN_FURNITURE_SCALE, Math.min(MAX_FURNITURE_SCALE, rawTargetScale));

  // Determine opposite anchor
  const anchorMap = {
    tl: 'br',
    tr: 'bl',
    bl: 'tr',
    br: 'tl',
  };
  const anchor = anchorMap[handle] || 'tl';

  // Initial dimensions and initial center
  const w0 = baseWidth * s0;
  const h0 = baseHeight * s0;
  const c0x = initialItem.x + w0 / 2;
  const c0y = initialItem.y + h0 / 2;

  // Canvas coordinates of the fixed anchor point in initial state
  const a0 = getAnchorLocalOffset(anchor, w0, h0);
  const a0RotX = a0.x * cos - a0.y * sin;
  const a0RotY = a0.x * sin + a0.y * cos;
  const anchorCanvasX = c0x + a0RotX;
  const anchorCanvasY = c0y + a0RotY;

  // Helper to compute top-left (x, y) for any candidate scale
  const computePositionForScale = (candidateScale) => {
    const w = baseWidth * candidateScale;
    const h = baseHeight * candidateScale;

    if (isAlt) {
      // Center stays at c0x, c0y
      return {
        x: c0x - w / 2,
        y: c0y - h / 2,
        width: w,
        height: h,
      };
    }

    // Anchor point stays at anchorCanvasX, anchorCanvasY
    const a = getAnchorLocalOffset(anchor, w, h);
    const aRotX = a.x * cos - a.y * sin;
    const aRotY = a.x * sin + a.y * cos;

    const cx = anchorCanvasX - aRotX;
    const cy = anchorCanvasY - aRotY;

    return {
      x: cx - w / 2,
      y: cy - h / 2,
      width: w,
      height: h,
    };
  };

  const isInsideCanvas = (x, y, w, h) => {
    const bounds = getItemBounds(w, h, rotation);
    return (
      x >= bounds.minX - 0.001 &&
      x <= bounds.maxX + 0.001 &&
      y >= bounds.minY - 0.001 &&
      y <= bounds.maxY + 0.001
    );
  };

  // Find valid scale within canvas boundaries
  let finalScale = targetScale;
  let pos = computePositionForScale(finalScale);

  if (!isInsideCanvas(pos.x, pos.y, pos.width, pos.height)) {
    // If expanding exceeds canvas boundary, binary search the maximum scale that fits
    if (targetScale > s0) {
      let low = s0;
      let high = targetScale;
      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        const testPos = computePositionForScale(mid);
        if (isInsideCanvas(testPos.x, testPos.y, testPos.width, testPos.height)) {
          low = mid;
        } else {
          high = mid;
        }
      }
      finalScale = low;
      pos = computePositionForScale(finalScale);
    } else if (targetScale < s0) {
      let low = targetScale;
      let high = s0;
      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        const testPos = computePositionForScale(mid);
        if (isInsideCanvas(testPos.x, testPos.y, testPos.width, testPos.height)) {
          high = mid;
        } else {
          low = mid;
        }
      }
      finalScale = high;
      pos = computePositionForScale(finalScale);
    }
  }

  // Safety boundary clamp for floating point tolerances
  const bounds = getItemBounds(pos.width, pos.height, rotation);
  const clampedX = Math.round(Math.max(bounds.minX, Math.min(bounds.maxX, pos.x)));
  const clampedY = Math.round(Math.max(bounds.minY, Math.min(bounds.maxY, pos.y)));
  const roundedScale = Math.round(finalScale * 100) / 100;

  return {
    scale: roundedScale,
    x: clampedX,
    y: clampedY,
    actualWidth: Math.round(baseWidth * roundedScale),
    actualHeight: Math.round(baseHeight * roundedScale),
  };
}



