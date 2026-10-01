import { useState, useRef, useCallback, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'room_decorator_items_';
const MAX_HISTORY_LENGTH = 40;

export function getSpaceStorageKey(spaceId) {
  return `${STORAGE_KEY_PREFIX}${spaceId}`;
}

export function loadItemsFromStorage(spaceId) {
  if (!spaceId) return [];
  try {
    const raw = localStorage.getItem(getSpaceStorageKey(spaceId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load items from storage:', err);
  }
  return [];
}

export function saveItemsToStorage(spaceId, items) {
  if (!spaceId) return;
  try {
    if (!items || items.length === 0) {
      localStorage.removeItem(getSpaceStorageKey(spaceId));
    } else {
      localStorage.setItem(getSpaceStorageKey(spaceId), JSON.stringify(items));
    }
  } catch (err) {
    console.error('Failed to save items to storage:', err);
  }
}

export function clearItemsFromStorage(spaceId) {
  if (!spaceId) return;
  try {
    localStorage.removeItem(getSpaceStorageKey(spaceId));
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
}

export function useRoomHistory(spaceId) {
  const [prevSpaceId, setPrevSpaceId] = useState(spaceId);
  const [placedItems, setPlacedItems] = useState(() => loadItemsFromStorage(spaceId));
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  // Adjust state during render if spaceId changes without component remount
  if (prevSpaceId !== spaceId) {
    setPrevSpaceId(spaceId);
    const stored = loadItemsFromStorage(spaceId);
    setPlacedItems(stored);
    setPast([]);
    setFuture([]);
  }

  // Ref to hold the current placedItems for drag commit comparison
  const placedItemsRef = useRef(placedItems);
  useEffect(() => {
    placedItemsRef.current = placedItems;
  }, [placedItems]);

  // Ref to hold the snapshot at the start of a drag gesture
  const dragStartSnapshotRef = useRef(null);

  // Synchronize placedItems to localStorage whenever placedItems or spaceId changes
  useEffect(() => {
    saveItemsToStorage(spaceId, placedItems);
  }, [spaceId, placedItems]);

  // Execute an action that creates history (Add, Rotate, Delete, Duplicate, Layer change)
  const applyAction = useCallback((updaterOrNewItems) => {
    const current = placedItemsRef.current;
    const next = typeof updaterOrNewItems === 'function' ? updaterOrNewItems(current) : updaterOrNewItems;

    setPast((prev) => {
      const updated = [...prev, current];
      if (updated.length > MAX_HISTORY_LENGTH) {
        return updated.slice(updated.length - MAX_HISTORY_LENGTH);
      }
      return updated;
    });
    setFuture([]);

    placedItemsRef.current = next;
    setPlacedItems(next);
  }, []);

  // Update placed items transiently without recording history (during active drag move)
  const updateTransient = useCallback((updaterOrNewItems) => {
    setPlacedItems((current) => {
      const next = typeof updaterOrNewItems === 'function' ? updaterOrNewItems(current) : updaterOrNewItems;
      placedItemsRef.current = next;
      return next;
    });
  }, []);

  // Start drag transaction: records snapshot before dragging begins
  const startDragTransaction = useCallback(() => {
    dragStartSnapshotRef.current = placedItemsRef.current;
  }, []);

  // Commit drag transaction: if position changed, push start snapshot to past as single history action
  const commitDragTransaction = useCallback(() => {
    if (!dragStartSnapshotRef.current) return;

    const initialSnapshot = dragStartSnapshotRef.current;
    dragStartSnapshotRef.current = null;
    const current = placedItemsRef.current;

    const hasChanged = JSON.stringify(initialSnapshot) !== JSON.stringify(current);
    if (hasChanged) {
      setPast((prev) => {
        const updated = [...prev, initialSnapshot];
        if (updated.length > MAX_HISTORY_LENGTH) {
          return updated.slice(updated.length - MAX_HISTORY_LENGTH);
        }
        return updated;
      });
      setFuture([]);
    }
  }, []);

  // Cancel drag transaction: revert to initial snapshot
  const cancelDragTransaction = useCallback(() => {
    if (dragStartSnapshotRef.current) {
      const initialSnapshot = dragStartSnapshotRef.current;
      dragStartSnapshotRef.current = null;
      placedItemsRef.current = initialSnapshot;
      setPlacedItems(initialSnapshot);
    }
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (past.length === 0) return null;

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    const currentState = placedItemsRef.current;

    setFuture((prevFuture) => [currentState, ...prevFuture]);
    setPast(newPast);
    placedItemsRef.current = previousState;
    setPlacedItems(previousState);

    return previousState;
  }, [past]);

  // Redo
  const redo = useCallback(() => {
    if (future.length === 0) return null;

    const nextState = future[0];
    const newFuture = future.slice(1);
    const currentState = placedItemsRef.current;

    setPast((prevPast) => {
      const updated = [...prevPast, currentState];
      if (updated.length > MAX_HISTORY_LENGTH) {
        return updated.slice(updated.length - MAX_HISTORY_LENGTH);
      }
      return updated;
    });
    setFuture(newFuture);
    placedItemsRef.current = nextState;
    setPlacedItems(nextState);

    return nextState;
  }, [future]);

  // Reset room: remove from localStorage and clear placedItems & history
  const resetRoom = useCallback(() => {
    clearItemsFromStorage(spaceId);
    placedItemsRef.current = [];
    setPlacedItems([]);
    setPast([]);
    setFuture([]);
    dragStartSnapshotRef.current = null;
  }, [spaceId]);

  return {
    placedItems,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    applyAction,
    updateTransient,
    startDragTransaction,
    commitDragTransaction,
    cancelDragTransaction,
    undo,
    redo,
    resetRoom,
  };
}
