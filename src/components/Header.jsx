import React from 'react';

export default function Header({
  space,
  placedCount,
  onBack,
  onReset,
  isFurnitureOpen,
  onToggleFurniture,
  isInspectorOpen,
  onToggleInspector,
}) {
  return (
    <header className="room-editor-header">
      <div className="header-left">
        <button
          type="button"
          className="back-btn touch-target"
          onClick={onBack}
          title="공간 선택으로 돌아가기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="btn-text">공간 변경</span>
        </button>

        <div className="header-divider" />

        <div className="header-space-info">
          <span
            className="space-indicator-dot"
            style={{ backgroundColor: space.accentColor }}
          />
          <h1 className="header-title">{space.name}</h1>
          <span className="header-subtitle-tag">{space.subtitle}</span>
        </div>

        {/* Tablet Toggle for Furniture Panel */}
        <button
          type="button"
          className={`header-toggle-btn touch-target ${isFurnitureOpen ? 'active' : ''}`}
          onClick={onToggleFurniture}
          title="가구 패널 열기/닫기"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <span>가구</span>
        </button>
      </div>

      <div className="header-right">
        {/* Tablet Toggle for Inspector Panel */}
        <button
          type="button"
          className={`header-toggle-btn touch-target ${isInspectorOpen ? 'active' : ''}`}
          onClick={onToggleInspector}
          title="속성 패널 열기/닫기"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>속성</span>
        </button>

        <div className="item-count-badge" title="현재 배치된 가구 수">
          <span className="count-label">배치된 가구</span>
          <span className="count-number">{placedCount}개</span>
        </div>

        <button
          type="button"
          className="reset-btn touch-target"
          onClick={onReset}
          title="공간의 모든 가구 초기화"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span className="btn-text">초기화</span>
        </button>
      </div>
    </header>
  );
}
