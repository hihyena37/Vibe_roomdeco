import React from 'react';

export default function MobileBottomSheet({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="bottom-sheet-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="bottom-sheet-container" role="dialog" aria-modal="true">
        <div className="bottom-sheet-header">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="bottom-sheet-drag-handle" />
            <h3 className="bottom-sheet-title">{title}</h3>
          </div>
          <button
            type="button"
            className="bottom-sheet-close-btn touch-target"
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <div className="bottom-sheet-content">
          {children}
        </div>
      </div>
    </>
  );
}
