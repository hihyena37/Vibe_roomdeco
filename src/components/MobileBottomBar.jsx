import React from 'react';

export default function MobileBottomBar({
  onOpenCatalog, selectedItem, selectedFurnitureData, onRotate, onDelete, onOpenInspector,
}) {
  return (
    <div className="mobile-bottom-bar">
      <div className="mobile-selection-toolbar">
        {selectedItem ? (
          <>
            <div className="mobile-selection-name">{selectedFurnitureData?.name}</div>
            <div className="mobile-selection-actions">
              <button type="button" className="mobile-toolbar-btn btn-mobile-rotate" onClick={onRotate} aria-label="선택 가구 90도 회전">↻ 회전</button>
              <button type="button" className="mobile-toolbar-btn btn-mobile-info" onClick={onOpenInspector}>속성</button>
              <button type="button" className="mobile-toolbar-btn btn-mobile-delete" onClick={onDelete}>삭제</button>
            </div>
          </>
        ) : <span className="mobile-selection-hint">가구를 선택하면 회전·삭제할 수 있어요</span>}
      </div>
      <button type="button" className="mobile-toolbar-btn btn-open-catalog" onClick={onOpenCatalog}>＋ 가구 추가</button>
    </div>
  );
}
