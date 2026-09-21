import React from 'react';
import FurnitureGraphic from './FurnitureGraphic.jsx';
import '../styles/inspector.css';

export default function InspectorPanel({
  selectedItem,
  furnitureData,
  onRotate,
  onDelete,
  onBringForward,
  onSendBackward,
}) {
  return (
    <aside className="inspector-panel">
      <div className="panel-header">
        <h2>가구 속성</h2>
        <span className="panel-sub">
          {selectedItem ? '선택된 가구 편집' : '선택된 가구 없음'}
        </span>
      </div>

      <div className="inspector-panel-content">
        {!selectedItem || !furnitureData ? (
          <div className="inspector-panel-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z" />
            </svg>
            <p>캔버스에서 가구를 클릭하면<br />회전과 삭제를 할 수 있습니다.</p>
          </div>
        ) : (
          <div className="inspector-selected-content">
            {/* Furniture Preview */}
            <div className="inspector-preview-card">
              <div
                style={{
                  width: '90px',
                  height: '70px',
                  transform: `rotate(${selectedItem.rotation || 0}deg)`,
                  transition: 'transform 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FurnitureGraphic
                  furniture={furnitureData}
                  width={furnitureData.width}
                  height={furnitureData.height}
                  isThumbnail={true}
                />
              </div>

              <div className="inspector-furniture-meta">
                <div className="inspector-furniture-name">{furnitureData.name}</div>
                <span className="inspector-furniture-category">{furnitureData.category}</span>
              </div>
            </div>

            {/* Information Table */}
            <div className="inspector-details-table">
              <div className="inspector-detail-row">
                <span className="detail-label">크기 (가로×세로)</span>
                <span className="detail-val">{furnitureData.width} × {furnitureData.height} px</span>
              </div>
              <div className="inspector-detail-row">
                <span className="detail-label">현재 회전각</span>
                <span className="detail-val">{selectedItem.rotation || 0}°</span>
              </div>
              <div className="inspector-detail-row">
                <span className="detail-label">위치 좌표</span>
                <span className="detail-val">X: {selectedItem.x}, Y: {selectedItem.y}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="inspector-actions">
              <button
                type="button"
                className="action-btn-rotate touch-target"
                onClick={onRotate}
                title="시계 방향 90도 회전"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span>90° 회전하기</span>
              </button>

              <div className="action-layer-row">
                <button
                  type="button"
                  className="action-btn-layer touch-target"
                  onClick={onBringForward}
                  title="앞으로 가져오기"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  <span>맨 앞으로</span>
                </button>
                <button
                  type="button"
                  className="action-btn-layer touch-target"
                  onClick={onSendBackward}
                  title="뒤로 보내기"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <span>맨 뒤로</span>
                </button>
              </div>

              <button
                type="button"
                className="action-btn-delete touch-target"
                onClick={onDelete}
                title="선택한 가구 삭제"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                <span>가구 삭제</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
