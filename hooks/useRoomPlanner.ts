"use client"

import * as React from "react"
import {
  FurnitureTemplate,
  PlacedFurniture,
  RoomType,
} from "@/types/room-planner"
import { ROOM_PRESETS } from "@/lib/roomPlannerData"

function snap(val: number, step: number): number {
  return Math.round(val / step) * step
}

export function useRoomPlanner(initialRoomType: RoomType = "living-room") {
  const [roomType, setRoomTypeState] = React.useState<RoomType>(initialRoomType)
  const currentPreset = ROOM_PRESETS[roomType]

  const [placedItems, setPlacedItems] = React.useState<PlacedFurniture[]>(() => {
    return currentPreset.defaultItems.map((item, idx) => ({
      ...item,
      instanceId: `init-${idx}-${Date.now()}`,
      zIndex: idx + 1,
    }))
  })

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [snapToGrid, setSnapToGrid] = React.useState<boolean>(true)
  const [showGrid, setShowGrid] = React.useState<boolean>(true)
  const [zoom, setZoom] = React.useState<number>(1.0)
  const [history, setHistory] = React.useState<PlacedFurniture[][]>([])

  // Push current state to undo history
  const pushHistory = React.useCallback((items: PlacedFurniture[]) => {
    setHistory((prev) => [...prev.slice(-15), items])
  }, [])

  // Change room type & reset preset
  const setRoomType = React.useCallback(
    (type: RoomType) => {
      const preset = ROOM_PRESETS[type]
      const newItems: PlacedFurniture[] = preset.defaultItems.map((item, idx) => ({
        ...item,
        instanceId: `preset-${idx}-${Date.now()}`,
        zIndex: idx + 1,
      }))
      pushHistory(placedItems)
      setRoomTypeState(type)
      setPlacedItems(newItems)
      setSelectedId(null)
    },
    [placedItems, pushHistory]
  )

  // Select Item
  const selectItem = React.useCallback((id: string | null) => {
    setSelectedId(id)
  }, [])

  // Add furniture item to canvas
  const addItem = React.useCallback(
    (template: FurnitureTemplate, pos?: { x: number; y: number }) => {
      const room = ROOM_PRESETS[roomType]
      const gridSize = room.gridSize

      let targetX = pos ? pos.x : (room.width - template.width) / 2
      let targetY = pos ? pos.y : (room.height - template.height) / 2

      if (snapToGrid) {
        targetX = snap(targetX, gridSize)
        targetY = snap(targetY, gridSize)
      }

      // Keep inside bounds
      targetX = Math.max(0, Math.min(room.width - template.width, targetX))
      targetY = Math.max(0, Math.min(room.height - template.height, targetY))

      const maxZIndex = placedItems.reduce(
        (max, item) => Math.max(max, item.zIndex),
        0
      )

      const newItem: PlacedFurniture = {
        instanceId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        templateId: template.id,
        name: template.name,
        category: template.category,
        x: targetX,
        y: targetY,
        width: template.width,
        height: template.height,
        rotation: template.defaultRotation,
        color: template.color,
        iconName: template.iconName,
        zIndex: maxZIndex + 1,
      }

      pushHistory(placedItems)
      setPlacedItems((prev) => [...prev, newItem])
      setSelectedId(newItem.instanceId)
    },
    [placedItems, pushHistory, roomType, snapToGrid]
  )

  // Update item position/dimensions
  const updateItem = React.useCallback(
    (instanceId: string, updates: Partial<PlacedFurniture>) => {
      setPlacedItems((prev) => {
        const room = ROOM_PRESETS[roomType]
        const gridSize = room.gridSize

        return prev.map((item) => {
          if (item.instanceId !== instanceId) return item

          let newX = updates.x !== undefined ? updates.x : item.x
          let newY = updates.y !== undefined ? updates.y : item.y
          const newW = updates.width !== undefined ? updates.width : item.width
          const newH = updates.height !== undefined ? updates.height : item.height

          if (snapToGrid && (updates.x !== undefined || updates.y !== undefined)) {
            newX = snap(newX, gridSize)
            newY = snap(newY, gridSize)
          }

          // Constrain within room canvas boundary
          newX = Math.max(0, Math.min(room.width - newW, newX))
          newY = Math.max(0, Math.min(room.height - newH, newY))

          return {
            ...item,
            ...updates,
            x: newX,
            y: newY,
          }
        })
      })
    },
    [roomType, snapToGrid]
  )

  // Remove item
  const removeItem = React.useCallback(
    (instanceId: string) => {
      pushHistory(placedItems)
      setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId))
      if (selectedId === instanceId) {
        setSelectedId(null)
      }
    },
    [placedItems, pushHistory, selectedId]
  )

  // Rotate item 90 degrees clockwise
  const rotateItem = React.useCallback(
    (instanceId: string) => {
      pushHistory(placedItems)
      setPlacedItems((prev) =>
        prev.map((item) => {
          if (item.instanceId !== instanceId) return item
          const nextRotation = ((item.rotation + 90) % 360) as 0 | 90 | 180 | 270
          return {
            ...item,
            rotation: nextRotation,
          }
        })
      )
    },
    [placedItems, pushHistory]
  )

  // Duplicate item
  const duplicateItem = React.useCallback(
    (instanceId: string) => {
      const target = placedItems.find((i) => i.instanceId === instanceId)
      if (!target) return

      const room = ROOM_PRESETS[roomType]
      const maxZIndex = placedItems.reduce((max, i) => Math.max(max, i.zIndex), 0)

      let newX = target.x + 20
      let newY = target.y + 20

      if (snapToGrid) {
        newX = snap(newX, room.gridSize)
        newY = snap(newY, room.gridSize)
      }

      newX = Math.max(0, Math.min(room.width - target.width, newX))
      newY = Math.max(0, Math.min(room.height - target.height, newY))

      const newItem: PlacedFurniture = {
        ...target,
        instanceId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        x: newX,
        y: newY,
        zIndex: maxZIndex + 1,
      }

      pushHistory(placedItems)
      setPlacedItems((prev) => [...prev, newItem])
      setSelectedId(newItem.instanceId)
    },
    [placedItems, pushHistory, roomType, snapToGrid]
  )

  // Clear room (delete all)
  const clearRoom = React.useCallback(() => {
    if (placedItems.length === 0) return
    pushHistory(placedItems)
    setPlacedItems([])
    setSelectedId(null)
  }, [placedItems, pushHistory])

  // Reset to default room layout
  const resetPlanner = React.useCallback(() => {
    pushHistory(placedItems)
    const preset = ROOM_PRESETS[roomType]
    const resetItems: PlacedFurniture[] = preset.defaultItems.map((item, idx) => ({
      ...item,
      instanceId: `reset-${idx}-${Date.now()}`,
      zIndex: idx + 1,
    }))
    setPlacedItems(resetItems)
    setSelectedId(null)
  }, [placedItems, pushHistory, roomType])

  // Undo last action
  const undo = React.useCallback(() => {
    if (history.length === 0) return
    const previous = history[history.length - 1]
    setHistory((prev) => prev.slice(0, prev.length - 1))
    setPlacedItems(previous)
    setSelectedId(null)
  }, [history])

  // Zoom actions
  const zoomIn = React.useCallback(() => {
    setZoom((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))
  }, [])

  const zoomOut = React.useCallback(() => {
    setZoom((z) => Math.max(0.6, Math.round((z - 0.1) * 10) / 10))
  }, [])

  const resetZoom = React.useCallback(() => {
    setZoom(1.0)
  }, [])

  return {
    roomType,
    roomPreset: currentPreset,
    placedItems,
    selectedId,
    selectedItem: placedItems.find((i) => i.instanceId === selectedId) || null,
    snapToGrid,
    showGrid,
    zoom,
    canUndo: history.length > 0,
    setRoomType,
    selectItem,
    addItem,
    updateItem,
    removeItem,
    rotateItem,
    duplicateItem,
    clearRoom,
    resetPlanner,
    undo,
    setSnapToGrid,
    setShowGrid,
    zoomIn,
    zoomOut,
    resetZoom,
  }
}
