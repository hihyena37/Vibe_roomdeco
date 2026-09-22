import React, { useState, useMemo, useCallback } from 'react';
import Header from '../components/Header.jsx';
import FurniturePanel from '../components/FurniturePanel.jsx';
import RoomCanvas, { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE, snapAndClampPosition } from '../components/RoomCanvas.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';
import MobileBottomBar from '../components/MobileBottomBar.jsx';
import MobileBottomSheet from '../components/MobileBottomSheet.jsx';
import { getFurnitureByCategory, getFurnitureById } from '../data/furniture.js';
import '../styles/roomeditor.css';
import '../styles/responsive.css';

export default function RoomEditor({ space, onBackToSpaces }) {
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Tablet drawer open state
  const [isTabletFurnitureOpen, setIsTabletFurnitureOpen] = useState(false);
  const [isTabletInspectorOpen, setIsTabletInspectorOpen] = useState(false);

  // Mobile bottom sheet state
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
  const [isMobileInspectorOpen, setIsMobileInspectorOpen] = useState(false);

  // Filter furniture by space and category
  const availableFurniture = useMemo(() => {
    return getFurnitureByCategory(space.id, selectedCategory);
  }, [space.id, selectedCategory]);

  // Selected item data
  const selectedItem = useMemo(() => {
    return placedItems.find((it) => it.instanceId === selectedItemId) || null;
  }, [placedItems, selectedItemId]);

  const selectedFurnitureData = useMemo(() => {
    return selectedItem ? getFurnitureById(selectedItem.furnitureId) : null;
  }, [selectedItem]);

  // Handler: Add Furniture to Canvas (snapped to grid and clamped)
  const handleAddFurniture = useCallback((furniture) => {
    const instanceId = `inst_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // Place near center with slight random offset aligned to grid
    const centerX = (CANVAS_WIDTH - furniture.width) / 2;
    const centerY = (CANVAS_HEIGHT - furniture.height) / 2;
    const offsetSteps = [-1, 0, 1];
    const offsetX = offsetSteps[Math.floor(Math.random() * offsetSteps.length)] * GRID_SIZE;
    const offsetY = offsetSteps[Math.floor(Math.random() * offsetSteps.length)] * GRID_SIZE;

    const { x: initialX, y: initialY } = snapAndClampPosition(
      centerX + offsetX,
      centerY + offsetY,
      furniture.width,
      furniture.height,
      0
    );

    const maxZ = placedItems.reduce((max, it) => Math.max(max, it.zIndex || 1), 1);

    const newItem = {
      instanceId,
      furnitureId: furniture.id,
      x: initialX,
      y: initialY,
      rotation: 0,
      zIndex: maxZ + 1,
    };

    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemId(instanceId);

    // On mobile, close catalog sheet after adding so user can see their added item immediately!
    setIsMobileCatalogOpen(false);
  }, [placedItems]);

  // Handler: Update Item Position during Drag
  const handleUpdatePosition = useCallback((instanceId, newX, newY) => {
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, x: newX, y: newY }
          : item
      )
    );
  }, []);

  // Handler: Rotate Selected Item 90 degrees with boundary clamping
  const handleRotate = useCallback(() => {
    if (!selectedItemId) return;
    setPlacedItems((prev) =>
      prev.map((item) => {
        if (item.instanceId !== selectedItemId) return item;
        const furnitureData = getFurnitureById(item.furnitureId);
        const newRotation = ((item.rotation || 0) + 90) % 360;
        const width = furnitureData ? furnitureData.width : 80;
        const height = furnitureData ? furnitureData.height : 60;
        const { x: clampedX, y: clampedY } = snapAndClampPosition(
          item.x,
          item.y,
          width,
          height,
          newRotation
        );
        return {
          ...item,
          rotation: newRotation,
          x: clampedX,
          y: clampedY,
        };
      })
    );
  }, [selectedItemId]);

  // Handler: Delete Selected Item
  const handleDelete = useCallback(() => {
    if (!selectedItemId) return;
    setPlacedItems((prev) => prev.filter((item) => item.instanceId !== selectedItemId));
    setSelectedItemId(null);
    setIsMobileInspectorOpen(false);
  }, [selectedItemId]);

  // Handler: Bring Forward / Send Backward
  const handleBringForward = useCallback(() => {
    if (!selectedItemId) return;
    const maxZ = placedItems.reduce((max, it) => Math.max(max, it.zIndex || 1), 1);
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === selectedItemId
          ? { ...item, zIndex: maxZ + 1 }
          : item
      )
    );
  }, [selectedItemId, placedItems]);

  const handleSendBackward = useCallback(() => {
    if (!selectedItemId) return;
    const minZ = placedItems.reduce((min, it) => Math.min(min, it.zIndex || 1), 1);
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === selectedItemId
          ? { ...item, zIndex: Math.max(0, minZ - 1) }
          : item
      )
    );
  }, [selectedItemId, placedItems]);

  // Handler: Room Reset with Confirm
  const handleReset = useCallback(() => {
    if (placedItems.length === 0) return;
    if (window.confirm('배치된 모든 가구를 삭제하고 방을 초기화하시겠습니까?')) {
      setPlacedItems([]);
      setSelectedItemId(null);
      setIsMobileInspectorOpen(false);
    }
  }, [placedItems.length]);

  return (
    <div className="room-editor-page">
      <Header
        space={space}
        placedCount={placedItems.length}
        onBack={onBackToSpaces}
        onReset={handleReset}
        isFurnitureOpen={isTabletFurnitureOpen}
        onToggleFurniture={() => {
          setIsTabletFurnitureOpen((prev) => !prev);
          if (!isTabletFurnitureOpen) setIsTabletInspectorOpen(false);
        }}
        isInspectorOpen={isTabletInspectorOpen}
        onToggleInspector={() => {
          setIsTabletInspectorOpen((prev) => !prev);
          if (!isTabletInspectorOpen) setIsTabletFurnitureOpen(false);
        }}
      />

      <div className="room-editor-body">
        {/* Tablet Overlay Backdrop */}
        {(isTabletFurnitureOpen || isTabletInspectorOpen) && (
          <div
            className="tablet-panel-overlay"
            onClick={() => {
              setIsTabletFurnitureOpen(false);
              setIsTabletInspectorOpen(false);
            }}
          />
        )}

        {/* Furniture Panel (Desktop & Tablet Drawer) */}
        <div className={`furniture-panel-wrapper ${isTabletFurnitureOpen ? 'panel-open' : ''}`}>
          <FurniturePanel
            space={space}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            furnitureList={availableFurniture}
            onAddFurniture={handleAddFurniture}
          />
        </div>

        {/* Center Room Canvas */}
        <RoomCanvas
          space={space}
          placedItems={placedItems}
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
          onUpdateItemPosition={handleUpdatePosition}
        />

        {/* Inspector Panel (Desktop & Tablet Drawer) */}
        <div className={`inspector-panel-wrapper ${isTabletInspectorOpen ? 'panel-open' : ''}`}>
          <InspectorPanel
            selectedItem={selectedItem}
            furnitureData={selectedFurnitureData}
            onRotate={handleRotate}
            onDelete={handleDelete}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
          />
        </div>
      </div>

      {/* Mobile Bottom Controls (Editing Toolbar + Add Button) */}
      <MobileBottomBar
        onOpenCatalog={() => setIsMobileCatalogOpen(true)}
        selectedItem={selectedItem}
        selectedFurnitureData={selectedFurnitureData}
        onRotate={handleRotate}
        onDelete={handleDelete}
        onBringForward={handleBringForward}
        onDeselect={() => setSelectedItemId(null)}
      />

      {/* Mobile Furniture Catalog Bottom Sheet */}
      <MobileBottomSheet
        isOpen={isMobileCatalogOpen}
        onClose={() => setIsMobileCatalogOpen(false)}
        title={`${space.name} 가구 카탈로그`}
      >
        <div className="mobile-embedded">
          <FurniturePanel
            space={space}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            furnitureList={availableFurniture}
            onAddFurniture={handleAddFurniture}
          />
        </div>
      </MobileBottomSheet>

      {/* Mobile Inspector Bottom Sheet */}
      <MobileBottomSheet
        isOpen={isMobileInspectorOpen}
        onClose={() => setIsMobileInspectorOpen(false)}
        title="가구 속성 및 편집"
      >
        <div className="mobile-embedded">
          <InspectorPanel
            selectedItem={selectedItem}
            furnitureData={selectedFurnitureData}
            onRotate={handleRotate}
            onDelete={handleDelete}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
          />
        </div>
      </MobileBottomSheet>
    </div>
  );
}
