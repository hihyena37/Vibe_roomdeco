import React, { useState } from 'react';

/**
 * FurnitureGraphic
 * Renders an SVG/CSS graphic representation for each furniture item.
 * If an actual image file exists and loads, it renders the <img>.
 * Otherwise, it displays a clean, modern, architectural 2D representation with colors & details.
 */
export default function FurnitureGraphic({ furniture, width, height, isThumbnail = false }) {
  const [imageError, setImageError] = useState(false);

  // If there's an image and no error, try loading the image
  // For now default to SVG placeholder as images are not present
  const hasValidImage = furniture.image && !imageError && false;

  if (hasValidImage) {
    return (
      <img
        src={furniture.image}
        alt={furniture.name}
        onError={() => setImageError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
      />
    );
  }

  const w = width || furniture.width || 80;
  const h = height || furniture.height || 60;
  const primary = furniture.color || '#CBD5E1';
  const secondary = furniture.secondaryColor || '#94A3B8';
  const shape = furniture.shape || 'rect-table';

  return (
    <div
      className="furniture-graphic-wrapper"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={`shadow-${furniture.id}`} x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
          </filter>
        </defs>

        {renderShape(shape, w, h, primary, secondary, furniture.id)}
      </svg>
      {!isThumbnail && (
        <span
          className="furniture-name-overlay"
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: Math.max(9, Math.min(11, Math.round(w / 14))),
            fontWeight: 600,
            color: '#1E293B',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '1px 6px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            maxWidth: '92%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {furniture.name}
        </span>
      )}
    </div>
  );
}

function renderShape(shape, w, h, primary, secondary, id) {
  switch (shape) {
    // === SOFAS ===
    case 'rounded-sofa':
      return (
        <g filter={`url(#shadow-${id})`}>
          {/* Main seat */}
          <rect x="6" y="10" width={w - 12} height={h - 18} rx="18" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Back cushion */}
          <rect x="10" y="4" width={w - 20} height="16" rx="8" fill={secondary} />
          {/* Left & right arms */}
          <rect x="4" y="12" width="14" height={h - 22} rx="7" fill={secondary} />
          <rect x={w - 18} y="12" width="14" height={h - 22} rx="7" fill={secondary} />
        </g>
      );

    case 'l-sofa':
      return (
        <g filter={`url(#shadow-${id})`}>
          <path
            d={`M 8 6 L ${w - 8} 6 Q ${w - 4} 6 ${w - 4} 10 L ${w - 4} ${h - 8} Q ${w - 4} ${h - 4} ${w - 8} ${h - 4} L ${w * 0.45} ${h - 4} Q ${w * 0.45 - 4} ${h - 4} ${w * 0.45 - 4} ${h - 8} L ${w * 0.45 - 4} ${h * 0.55} L 8 ${h * 0.55} Q 4 ${h * 0.55} 4 ${h * 0.55 - 4} L 4 10 Q 4 6 8 6 Z`}
            fill={primary}
            stroke={secondary}
            strokeWidth="2"
          />
          {/* Backrest along top */}
          <rect x="8" y="6" width={w - 16} height="12" rx="4" fill={secondary} opacity="0.8" />
          {/* Chaise side cushion */}
          <rect x={w - 16} y="18" width="10" height={h - 26} rx="4" fill={secondary} opacity="0.6" />
        </g>
      );

    case 'leather-sofa':
    case 'booth-sofa':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="8" width={w - 12} height={h - 14} rx="10" fill={primary} stroke={secondary} strokeWidth="2.5" />
          <rect x="10" y="6" width={w - 20} height="14" rx="6" fill={secondary} />
          {/* Button tufts */}
          <circle cx={w * 0.3} cy={h * 0.55} r="2.5" fill={secondary} />
          <circle cx={w * 0.5} cy={h * 0.55} r="2.5" fill={secondary} />
          <circle cx={w * 0.7} cy={h * 0.55} r="2.5" fill={secondary} />
          {/* Seam line */}
          <line x1="6" y1={h * 0.45} x2={w - 6} y2={h * 0.45} stroke={secondary} strokeWidth="1.5" strokeDasharray="4 2" />
        </g>
      );

    case 'minimal-sofa':
    case 'daybed-sofa':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="8" width={w - 12} height={h - 14} rx="8" fill={primary} stroke={secondary} strokeWidth="2" />
          <rect x="10" y="4" width={w - 20} height="10" rx="4" fill={secondary} />
          <circle cx={w * 0.25} cy={h * 0.5} r="4" fill={secondary} opacity="0.7" />
          <circle cx={w * 0.75} cy={h * 0.5} r="4" fill={secondary} opacity="0.7" />
        </g>
      );

    // === CHAIRS & STOOLS ===
    case 'wood-chair':
    case 'bentwood-chair':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.38} fill={primary} stroke={secondary} strokeWidth="2" />
          <path
            d={`M ${w * 0.2} ${h * 0.25} Q ${w / 2} ${h * 0.1} ${w * 0.8} ${h * 0.25}`}
            stroke={secondary}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );

    case 'armchair':
    case 'lounge-chair':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="8" y="10" width={w - 16} height={h - 16} rx="12" fill={primary} stroke={secondary} strokeWidth="2" />
          <rect x="12" y="6" width={w - 24} height="10" rx="4" fill={secondary} />
          <rect x="5" y="12" width="9" height={h - 20} rx="4" fill={secondary} />
          <rect x={w - 14} y="12" width="9" height={h - 20} rx="4" fill={secondary} />
        </g>
      );

    case 'circle-stool':
    case 'bar-stool':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.42} fill={primary} stroke={secondary} strokeWidth="2.5" />
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.22} fill={secondary} opacity="0.6" />
        </g>
      );

    case 'mesh-chair':
    case 'executive-chair':
    case 'task-chair':
      return (
        <g filter={`url(#shadow-${id})`}>
          {/* Base star legs hint */}
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.44} fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="3 3" />
          {/* Seat */}
          <rect x={w * 0.18} y={h * 0.22} width={w * 0.64} height={h * 0.56} rx="10" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Headrest / curved back */}
          <path
            d={`M ${w * 0.22} ${h * 0.18} Q ${w / 2} ${h * 0.08} ${w * 0.78} ${h * 0.18}`}
            stroke={secondary}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );

    case 'waiting-bench':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="8" width={w - 8} height={h - 16} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
          <rect x={w * 0.08} y="12" width={w * 0.24} height={h - 24} rx="4" fill={secondary} opacity="0.7" />
          <rect x={w * 0.38} y="12" width={w * 0.24} height={h - 24} rx="4" fill={secondary} opacity="0.7" />
          <rect x={w * 0.68} y="12" width={w * 0.24} height={h - 24} rx="4" fill={secondary} opacity="0.7" />
        </g>
      );

    // === TABLES & DESKS ===
    case 'round-table':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.44} fill={primary} stroke={secondary} strokeWidth="2.5" />
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.38} fill="none" stroke={secondary} strokeWidth="1" opacity="0.4" />
        </g>
      );

    case 'rect-table':
    case 'glass-table':
    case 'communal-table':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="8" fill={primary} stroke={secondary} strokeWidth="2.2" />
          <rect x="12" y="12" width={w - 24} height={h - 24} rx="4" fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        </g>
      );

    case 'oval-table':
      return (
        <g filter={`url(#shadow-${id})`}>
          <ellipse cx={w / 2} cy={h / 2} rx={w * 0.44} ry={h * 0.42} fill={primary} stroke={secondary} strokeWidth="2.5" />
        </g>
      );

    case 'office-desk':
    case 'standing-desk':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="6" width={w - 8} height={h - 12} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Cable grommet */}
          <circle cx={w * 0.8} cy="14" r="3.5" fill={secondary} />
          {/* Laptop / Monitor mat */}
          <rect x={w * 0.25} y={h * 0.25} width={w * 0.5} height={h * 0.45} rx="3" fill={secondary} opacity="0.4" />
        </g>
      );

    case 'l-desk':
      return (
        <g filter={`url(#shadow-${id})`}>
          <path
            d={`M 4 6 L ${w - 4} 6 L ${w - 4} ${h * 0.48} L ${w * 0.48} ${h * 0.48} L ${w * 0.48} ${h - 6} L 4 ${h - 6} Z`}
            fill={primary}
            stroke={secondary}
            strokeWidth="2"
          />
          <circle cx={w * 0.8} cy="14" r="3.5" fill={secondary} />
        </g>
      );

    case 'conference-table':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="8" width={w - 12} height={h - 16} rx="16" fill={primary} stroke={secondary} strokeWidth="2.5" />
          <rect x={w * 0.3} y={h * 0.38} width={w * 0.4} height={h * 0.24} rx="4" fill={secondary} opacity="0.6" />
        </g>
      );

    // === BEDS ===
    case 'bed-queen':
    case 'bed-single':
    case 'bed-king':
    case 'bed-platform':
    case 'bed-bunk':
      return (
        <g filter={`url(#shadow-${id})`}>
          {/* Mattress Base */}
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="8" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Headboard */}
          <rect x="4" y="4" width={w - 8} height="12" rx="4" fill={secondary} />
          {/* Pillows */}
          {w > 100 ? (
            <>
              <rect x="14" y="20" width={(w - 38) / 2} height="24" rx="6" fill="#FFFFFF" stroke={secondary} strokeWidth="1.5" />
              <rect x={w / 2 + 5} y="20" width={(w - 38) / 2} height="24" rx="6" fill="#FFFFFF" stroke={secondary} strokeWidth="1.5" />
            </>
          ) : (
            <rect x="14" y="18" width={w - 28} height="22" rx="6" fill="#FFFFFF" stroke={secondary} strokeWidth="1.5" />
          )}
          {/* Blanket folded line */}
          <line x1="6" y1={h * 0.5} x2={w - 6} y2={h * 0.5} stroke={secondary} strokeWidth="2" strokeDasharray="4 2" />
          <rect x="6" y={h * 0.5} width={w - 12} height={h * 0.5 - 6} rx="6" fill={secondary} opacity="0.3" />
        </g>
      );

    case 'med-bed':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="6" fill={primary} stroke={secondary} strokeWidth="2.5" />
          {/* Rails */}
          <rect x="2" y="20" width="5" height={h - 40} rx="2" fill={secondary} />
          <rect x={w - 7} y="20" width="5" height={h - 40} rx="2" fill={secondary} />
          {/* Medical pillow */}
          <rect x="14" y="16" width={w - 28} height="22" rx="4" fill="#FFFFFF" stroke={secondary} strokeWidth="1.5" />
          {/* Cross badge */}
          <circle cx={w / 2} cy={h * 0.65} r="9" fill="#FFFFFF" />
          <rect x={w / 2 - 2} y={h * 0.65 - 6} width="4" height="12" fill={secondary} />
          <rect x={w / 2 - 6} y={h * 0.65 - 2} width="12" height="4" fill={secondary} />
        </g>
      );

    // === STORAGE ===
    case 'wardrobe':
    case 'bookshelf':
    case 'sideboard':
    case 'filing-cabinet':
    case 'tv-console':
    case 'drawers':
    case 'locker-unit':
    case 'pedestal':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="4" width={w - 8} height={h - 8} rx="5" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Handles or shelves */}
          <line x1={w * 0.5} y1="6" x2={w * 0.5} y2={h - 6} stroke={secondary} strokeWidth="1.5" />
          <circle cx={w * 0.42} cy={h * 0.5} r="2.5" fill={secondary} />
          <circle cx={w * 0.58} cy={h * 0.5} r="2.5" fill={secondary} />
        </g>
      );

    // === COUNTERS ===
    case 'bar-counter':
    case 'showcase-counter':
    case 'cashier-counter':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="6" width={w - 8} height={h - 12} rx="6" fill={primary} stroke={secondary} strokeWidth="2.5" />
          <rect x="8" y="10" width={w - 16} height={h * 0.35} rx="3" fill={secondary} opacity="0.6" />
          {/* Register or prep zone */}
          <rect x={w * 0.65} y={h * 0.5} width={w * 0.25} height={h * 0.35} rx="2" fill={secondary} />
        </g>
      );

    // === PARTITIONS ===
    case 'linear-partition':
    case 'glass-partition':
    case 'wood-slat-partition':
    case 'whiteboard-partition':
    case 'curtain-partition':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="2" y={h * 0.2} width={w - 4} height={h * 0.6} rx="4" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Slat lines */}
          <line x1={w * 0.25} y1={h * 0.2} x2={w * 0.25} y2={h * 0.8} stroke={secondary} strokeWidth="2" />
          <line x1={w * 0.5} y1={h * 0.2} x2={w * 0.5} y2={h * 0.8} stroke={secondary} strokeWidth="2" />
          <line x1={w * 0.75} y1={h * 0.2} x2={w * 0.75} y2={h * 0.8} stroke={secondary} strokeWidth="2" />
        </g>
      );

    // === CARTS ===
    case 'cart-crash':
    case 'cart-anesthesia':
    case 'cart-tray':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Wheel corners */}
          <circle cx="8" cy="8" r="3" fill={secondary} />
          <circle cx={w - 8} cy="8" r="3" fill={secondary} />
          <circle cx="8" cy={h - 8} r="3" fill={secondary} />
          <circle cx={w - 8} cy={h - 8} r="3" fill={secondary} />
          {/* Trays */}
          <rect x="12" y="12" width={w - 24} height={h - 24} rx="3" fill="#FFFFFF" stroke={secondary} strokeWidth="1" />
        </g>
      );

    case 'iv-pole':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={w * 0.4} fill="none" stroke={secondary} strokeWidth="2" />
          <circle cx={w / 2} cy={h / 2} r="4" fill={primary} />
          <line x1={w / 2} y1="4" x2={w / 2} y2={h - 4} stroke={secondary} strokeWidth="2" />
          <line x1="4" y1={h / 2} x2={w - 4} y2={h / 2} stroke={secondary} strokeWidth="2" />
        </g>
      );

    // === LIGHTING ===
    case 'floor-lamp':
    case 'table-lamp':
    case 'round-lamp':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.42} fill={primary} stroke={secondary} strokeWidth="2" />
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.18} fill="#FFFFFF" />
          {/* Glow rays */}
          <line x1={w / 2} y1="2" x2={w / 2} y2="6" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
          <line x1={w / 2} y1={h - 6} x2={w / 2} y2={h - 2} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1={h / 2} x2="6" y2={h / 2} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
          <line x1={w - 6} y1={h / 2} x2={w - 2} y2={h / 2} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case 'linear-lamp':
    case 'edison-lamps':
    case 'neon-sign':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y={h * 0.25} width={w - 8} height={h * 0.5} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
          <line x1="8" y1={h / 2} x2={w - 8} y2={h / 2} stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      );

    case 'pendant-lamp':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.44} fill={primary} stroke={secondary} strokeWidth="2.5" />
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.25} fill="#FFFFFF" stroke={secondary} strokeWidth="1.5" />
        </g>
      );

    // === PLANTS ===
    case 'monstera':
    case 'olive-tree':
    case 'snake-plant':
    case 'hanging-plant':
    case 'small-succulent':
      return (
        <g filter={`url(#shadow-${id})`}>
          {/* Pot base */}
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.44} fill={secondary} opacity="0.3" />
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.32} fill={primary} stroke={secondary} strokeWidth="2" />
          {/* Leaves petals */}
          <circle cx={w * 0.34} cy={h * 0.35} r={Math.min(w, h) * 0.16} fill={secondary} />
          <circle cx={w * 0.66} cy={h * 0.35} r={Math.min(w, h) * 0.16} fill={secondary} />
          <circle cx={w * 0.5} cy={h * 0.68} r={Math.min(w, h) * 0.16} fill={secondary} />
          <circle cx={w / 2} cy={h / 2} r="4" fill="#FFFFFF" />
        </g>
      );

    case 'rect-planter':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="4" width={w - 8} height={h - 8} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
          <circle cx={w * 0.25} cy={h / 2} r={Math.min(w, h) * 0.24} fill={secondary} />
          <circle cx={w * 0.5} cy={h / 2} r={Math.min(w, h) * 0.24} fill={secondary} />
          <circle cx={w * 0.75} cy={h / 2} r={Math.min(w, h) * 0.24} fill={secondary} />
        </g>
      );

    // === DECORATIONS ===
    case 'wall-art':
    case 'wall-board':
    case 'wall-clocks':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="4" width={w - 8} height={h - 8} rx="4" fill={primary} stroke={secondary} strokeWidth="2" />
          <rect x="8" y="8" width={w - 16} height={h - 16} rx="2" fill="#FFFFFF" />
          <circle cx={w * 0.35} cy={h * 0.45} r="3" fill={secondary} />
          <line x1={w * 0.5} y1={h * 0.6} x2={w * 0.8} y2={h * 0.6} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case 'cozy-rug':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="12" fill={primary} stroke={secondary} strokeWidth="2" strokeDasharray="6 3" />
          <rect x="14" y="14" width={w - 28} height={h - 28} rx="6" fill="none" stroke={secondary} strokeWidth="1.5" />
        </g>
      );

    case 'mirror':
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="6" y="4" width={w - 12} height={h - 8} rx="8" fill="#E0F2FE" stroke={secondary} strokeWidth="2" />
          <line x1="12" y1="10" x2={w - 12} y2={h - 14} stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case 'clock':
      return (
        <g filter={`url(#shadow-${id})`}>
          <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.44} fill="#FFFFFF" stroke={secondary} strokeWidth="2.5" />
          <circle cx={w / 2} cy={h / 2} r="2" fill={secondary} />
          <line x1={w / 2} y1={h / 2} x2={w / 2} y2={h * 0.22} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
          <line x1={w / 2} y1={h / 2} x2={w * 0.72} y2={h / 2} stroke={secondary} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    default:
      return (
        <g filter={`url(#shadow-${id})`}>
          <rect x="4" y="4" width={w - 8} height={h - 8} rx="6" fill={primary} stroke={secondary} strokeWidth="2" />
        </g>
      );
  }
}
