import React from 'react';

// SVG Icons for each space to provide clean, modern visual identity without external images
function SpaceIcon({ spaceId, color }) {
  switch (spaceId) {
    case 'home':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'office':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case 'cafe':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      );
    case 'hospital':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      );
    case 'restaurant':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2v20M6 2v7a3 3 0 0 0 6 0V2M9 9v13" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SpaceCard({ space, onSelect }) {
  const categoryCount = space.categories.length;

  return (
    <div
      className="space-card"
      style={{
        '--card-accent': space.accentColor,
        '--card-badge-bg': space.badgeColor,
      }}
      onClick={() => onSelect(space.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(space.id);
        }
      }}
    >
      <div className="space-card-header">
        <div className="space-card-icon" style={{ backgroundColor: space.badgeColor }}>
          <SpaceIcon spaceId={space.id} color={space.accentColor} />
        </div>
        <span className="space-card-badge">{space.subtitle}</span>
      </div>

      <div className="space-card-body">
        <h3 className="space-card-title">{space.name}</h3>
        <p className="space-card-desc">{space.description}</p>
        
        <div className="space-card-meta">
          <span className="meta-tag">{categoryCount}개 가구 카테고리</span>
          <span className="meta-tag">다양한 디자인</span>
        </div>
      </div>

      <div className="space-card-footer">
        <button
          type="button"
          className="space-select-btn touch-target"
          style={{
            backgroundColor: space.accentColor,
            color: '#FFFFFF',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(space.id);
          }}
        >
          <span>꾸미기 시작</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
