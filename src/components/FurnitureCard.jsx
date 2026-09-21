import React from 'react';
import FurnitureGraphic from './FurnitureGraphic.jsx';

export default function FurnitureCard({ furniture, onAdd }) {
  return (
    <div
      className="furniture-card"
      onClick={() => onAdd(furniture)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAdd(furniture);
        }
      }}
    >
      {/* Top Section: Icon Preview + Text Info (Name & Description) */}
      <div className="card-top-section">
        <div className="card-preview-box">
          <FurnitureGraphic
            furniture={furniture}
            width={Math.min(100, furniture.width)}
            height={Math.min(70, furniture.height)}
            isThumbnail={true}
          />
        </div>

        <div className="card-info">
          <div className="card-title-row">
            <h4 className="card-name" title={furniture.name}>
              {furniture.name}
            </h4>
            <span className="card-dimension">
              {furniture.width}×{furniture.height}
            </span>
          </div>

          <p className="card-desc" title={furniture.description}>
            {furniture.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Style Tags + Add Button */}
      <div className="card-bottom-section">
        <div className="card-tags">
          {furniture.style?.map((s) => (
            <span key={s} className="card-tag">#{s}</span>
          ))}
        </div>

        <button
          type="button"
          className="card-add-btn touch-target"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(furniture);
          }}
          title="방에 배치하기"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>배치</span>
        </button>
      </div>
    </div>
  );
}
