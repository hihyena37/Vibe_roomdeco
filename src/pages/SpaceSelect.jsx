import React from 'react';
import { SPACES } from '../data/spaces.js';
import SpaceCard from '../components/SpaceCard.jsx';
import '../styles/spaceselect.css';

export default function SpaceSelect({ onSelectSpace }) {
  return (
    <div className="space-select-page">
      <div className="space-select-container">
        <header className="space-select-hero">
          <div className="brand-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span>ROOM DECORATOR MVP</span>
          </div>
          <h1>어떤 공간을 꾸며볼까요?</h1>
          <p>
            Home, Office, Cafe, Hospital, Restaurant 중 원하는 테마 공간을 선택하고
            다양한 디자인의 가구와 소품을 자유롭게 배치해보세요.
          </p>
        </header>

        <main className="space-grid">
          {SPACES.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onSelect={onSelectSpace}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
