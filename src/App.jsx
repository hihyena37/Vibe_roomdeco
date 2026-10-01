import React, { useState } from 'react';
import './styles/main.css';
import SpaceSelect from './pages/SpaceSelect.jsx';
import RoomEditor from './pages/RoomEditor.jsx';
import { getSpaceById } from './data/spaces.js';

export default function App() {
  const [selectedSpaceId, setSelectedSpaceId] = useState(() => {
    try {
      return localStorage.getItem('room_decorator_current_space') || null;
    } catch {
      return null;
    }
  });

  const handleSelectSpace = (spaceId) => {
    setSelectedSpaceId(spaceId);
    try {
      localStorage.setItem('room_decorator_current_space', spaceId);
    } catch {
      // Ignore
    }
  };

  const handleBackToSpaces = () => {
    setSelectedSpaceId(null);
    try {
      localStorage.removeItem('room_decorator_current_space');
    } catch {
      // Ignore
    }
  };

  const currentSpace = selectedSpaceId ? getSpaceById(selectedSpaceId) : null;

  return (
    <div className="app-root">
      {!selectedSpaceId || !currentSpace ? (
        <SpaceSelect onSelectSpace={handleSelectSpace} />
      ) : (
        <RoomEditor
          key={selectedSpaceId}
          space={currentSpace}
          onBackToSpaces={handleBackToSpaces}
        />
      )}
    </div>
  );
}
