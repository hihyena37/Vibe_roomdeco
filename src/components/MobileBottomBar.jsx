import React from 'react';

export default function MobileBottomBar({
  onOpenCatalog,
  selectedItem,
  onRotate,
  onDelete,
  onOpenInspector,
}) {
  return (
    <div className="mobile-bottom-bar">
      <button
        type="button"
        className="mobile-toolbar-btn btn-open-catalog touch-target"
        onClick={onOpenCatalog}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>가구 추가</span>
      </button>

      {selectedItem && (
        <>
          <button
            type="button"
            className="mobile-toolbar-btn btn-mobile-rotate touch-target"
            onClick={onRotate}
            title="90도 회전"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>회전</span>
          </button>

          <button
            type="button"
            className="mobile-toolbar-btn btn-mobile-info touch-target"
            onClick={onOpenInspector}
            title="상세 속성"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>

          <button
            type="button"
            className="mobile-toolbar-btn btn-mobile-delete touch-target"
            onClick={onDelete}
            title="삭제"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
