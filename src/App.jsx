import React, { useState } from 'react';
import './styles/main.css';
import SpaceSelect from './pages/SpaceSelect.jsx';
import RoomEditor from './pages/RoomEditor.jsx';
import { getSpaceById } from './data/spaces.js';

export default function App() {
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const handleSelectSpace = (spaceId) => {
    setSelectedSpaceId(spaceId);
  };

  const handleBackToSpaces = () => {
    setSelectedSpaceId(null);
  };

  const currentSpace = selectedSpaceId ? getSpaceById(selectedSpaceId) : null;

  return (
    <div className="app-root">
      {!selectedSpaceId ? (
        <SpaceSelect onSelectSpace={handleSelectSpace} />
      ) : (
        <RoomEditor
          space={currentSpace}
          onBackToSpaces={handleBackToSpaces}
        />
      )}
    </div>
  );
}
