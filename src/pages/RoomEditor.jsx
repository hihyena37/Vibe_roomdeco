import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '../components/Header.jsx';
import FurniturePanel from '../components/FurniturePanel.jsx';
import RoomCanvas from '../components/RoomCanvas.jsx';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE, snapAndClampPosition } from '../utils/roomGeometry.js';
import InspectorPanel from '../components/InspectorPanel.jsx';
import MobileBottomBar from '../components/MobileBottomBar.jsx';
import MobileBottomSheet from '../components/MobileBottomSheet.jsx';
import { getFurnitureByCategory, getFurnitureById } from '../data/furniture.js';
import { useRoomHistory } from '../hooks/useRoomHistory.js';
import '../styles/roomeditor.css';
import '../styles/responsive.css';

export default function RoomEditor({ space, onBackToSpaces }) {
  const {
    placedItems,
    canUndo,
    canRedo,
    applyAction,
    updateTransient,
    startDragTransaction,
    commitDragTransaction,
    cancelDragTransaction,
    undo,
    redo,
    resetRoom,
  } = useRoomHistory(space.id);

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

  // Undo / Redo handlers with selection recovery
  const handleUndo = useCallback(() => {
    const restored = undo();
    if (restored) {
      setSelectedItemId((prevId) => {
        if (prevId && !restored.some((it) => it.instanceId === prevId)) {
          setIsMobileInspectorOpen(false);
          return null;
        }
        return prevId;
      });
    }
  }, [undo]);

  const handleRedo = useCallback(() => {
    const restored = redo();
    if (restored) {
      setSelectedItemId((prevId) => {
        if (prevId && !restored.some((it) => it.instanceId === prevId)) {
          setIsMobileInspectorOpen(false);
          return null;
        }
        return prevId;
      });
    }
  }, [redo]);

  // Keyboard shortcuts: Ctrl+Z (Undo), Ctrl+Shift+Z or Ctrl+Y (Redo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      if (!isCtrlOrMeta) return;

      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (e.key === 'y' || e.key === 'Y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

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
      scale: 1,
      rotation: 0,
      zIndex: maxZ + 1,
    };

    applyAction((prev) => [...prev, newItem]);
    setSelectedItemId(instanceId);

    // On mobile, close catalog sheet after adding so user can see their added item immediately!
    setIsMobileCatalogOpen(false);
  }, [placedItems, applyAction]);

  // Handler: Update Item Position during Drag (transient, no history spam)
  const handleUpdatePosition = useCallback((instanceId, newX, newY) => {
    updateTransient((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, x: newX, y: newY }
          : item
      )
    );
  }, [updateTransient]);

  // Handler: Update Item Scale & Position during Resize (transient, no history spam)
  const handleUpdateScaleAndPosition = useCallback((instanceId, newScale, newX, newY) => {
    updateTransient((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, scale: newScale, x: newX, y: newY }
          : item
      )
    );
  }, [updateTransient]);

  // Handler: Rotate Selected Item 90 degrees with boundary clamping
  const handleRotate = useCallback(() => {
    if (!selectedItemId) return;
    applyAction((prev) =>
      prev.map((item) => {
        if (item.instanceId !== selectedItemId) return item;
        const furnitureData = getFurnitureById(item.furnitureId);
        const newRotation = ((item.rotation || 0) + 90) % 360;
        const itemScale = typeof item.scale === 'number' ? item.scale : 1;
        const width = (furnitureData ? furnitureData.width : 80) * itemScale;
        const height = (furnitureData ? furnitureData.height : 60) * itemScale;
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
  }, [selectedItemId, applyAction]);

  // Handler: Duplicate Selected Item (preserving scale)
  const handleDuplicate = useCallback(() => {
    if (!selectedItem) return;

    const furnitureData = getFurnitureById(selectedItem.furnitureId);
    const itemScale = typeof selectedItem.scale === 'number' ? selectedItem.scale : 1;
    const width = (furnitureData ? furnitureData.width : 80) * itemScale;
    const height = (furnitureData ? furnitureData.height : 60) * itemScale;
    const rotation = selectedItem.rotation || 0;

    // Offset by GRID_SIZE (one grid unit) to bottom-right
    const rawX = selectedItem.x + GRID_SIZE;
    const rawY = selectedItem.y + GRID_SIZE;

    // Clamp within room boundaries using roomGeometry logic
    const { x: newX, y: newY } = snapAndClampPosition(
      rawX,
      rawY,
      width,
      height,
      rotation
    );

    const maxZ = placedItems.reduce((max, it) => Math.max(max, it.zIndex || 1), 1);
    const newInstanceId = `inst_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const newItem = {
      ...selectedItem,
      instanceId: newInstanceId,
      scale: itemScale,
      x: newX,
      y: newY,
      rotation,
      zIndex: maxZ + 1,
    };

    applyAction((prev) => [...prev, newItem]);
    setSelectedItemId(newInstanceId);
  }, [selectedItem, placedItems, applyAction]);

  // Handler: Delete Selected Item
  const handleDelete = useCallback(() => {
    if (!selectedItemId) return;
    applyAction((prev) => prev.filter((item) => item.instanceId !== selectedItemId));
    setSelectedItemId(null);
    setIsMobileInspectorOpen(false);
  }, [selectedItemId, applyAction]);

  // Handler: Bring Forward / Send Backward
  const handleBringForward = useCallback(() => {
    if (!selectedItemId) return;
    const maxZ = placedItems.reduce((max, it) => Math.max(max, it.zIndex || 1), 1);
    applyAction((prev) =>
      prev.map((item) =>
        item.instanceId === selectedItemId
          ? { ...item, zIndex: maxZ + 1 }
          : item
      )
    );
  }, [selectedItemId, placedItems, applyAction]);

  const handleSendBackward = useCallback(() => {
    if (!selectedItemId) return;
    const minZ = placedItems.reduce((min, it) => Math.min(min, it.zIndex || 1), 1);
    applyAction((prev) =>
      prev.map((item) =>
        item.instanceId === selectedItemId
          ? { ...item, zIndex: Math.max(0, minZ - 1) }
          : item
      )
    );
  }, [selectedItemId, placedItems, applyAction]);

  // Handler: Room Reset with Confirm
  const handleReset = useCallback(() => {
    if (placedItems.length === 0) return;
    if (window.confirm('배치된 모든 가구를 삭제하고 방을 초기화하시겠습니까?')) {
      resetRoom();
      setSelectedItemId(null);
      setIsMobileInspectorOpen(false);
    }
  }, [placedItems.length, resetRoom]);

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
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
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
          onUpdateItemScaleAndPosition={handleUpdateScaleAndPosition}
          onDragStart={startDragTransaction}
          onDragEnd={commitDragTransaction}
          onDragCancel={cancelDragTransaction}
          onResizeStart={startDragTransaction}
          onResizeEnd={commitDragTransaction}
          onResizeCancel={cancelDragTransaction}
        />

        {/* Inspector Panel (Desktop & Tablet Drawer) */}
        <div className={`inspector-panel-wrapper ${isTabletInspectorOpen ? 'panel-open' : ''}`}>
          <InspectorPanel
            selectedItem={selectedItem}
            furnitureData={selectedFurnitureData}
            onRotate={handleRotate}
            onDuplicate={handleDuplicate}
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
        onOpenInspector={() => setIsMobileInspectorOpen(true)}
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
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
          />
        </div>
      </MobileBottomSheet>
    </div>
  );
}
