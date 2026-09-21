import React from 'react';
import FurnitureCard from './FurnitureCard.jsx';
import '../styles/furniturepanel.css';

export default function FurniturePanel({
  space,
  selectedCategory,
  onSelectCategory,
  furnitureList = [],
  onAddFurniture,
}) {
  // Category tabs: 'all' + space's categories
  const categories = ['all', ...space.categories];

  return (
    <aside className="furniture-panel">
      <div className="panel-header">
        <h2>가구 카탈로그</h2>
        <span className="panel-sub">
          {space.name} 전용 컬렉션 ({furnitureList.length}개)
        </span>
      </div>

      {/* Category Scrollable Tabs */}
      <div className="category-tabs-container">
        {categories.map((cat) => {
          const label = space.categoryLabels[cat] || cat;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`category-tab-btn ${isActive ? 'active' : ''}`}
              style={isActive ? { backgroundColor: space.accentColor } : {}}
              onClick={() => onSelectCategory(cat)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Furniture List */}
      <div className="furniture-panel-content">
        <div className="furniture-list-grid">
          {furnitureList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
              해당 카테고리의 가구가 없습니다.
            </div>
          ) : (
            furnitureList.map((item) => (
              <FurnitureCard
                key={item.id}
                furniture={item}
                onAdd={onAddFurniture}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
