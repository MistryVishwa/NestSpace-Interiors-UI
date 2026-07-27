"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Board, BoardItem, PresetBoard } from "@/types/mood-board"
import { PRESET_MOOD_BOARDS } from "@/lib/moodBoardData"
import { MoodBoardHero } from "./MoodBoardHero"
import { BoardControls } from "./BoardControls"
import { MoodBoardToolbar } from "./MoodBoardToolbar"
import { MoodBoardSidebar } from "./MoodBoardSidebar"
import { MoodBoardCanvas } from "./MoodBoardCanvas"
import { ExportPanel } from "./ExportPanel"

const LOCAL_STORAGE_KEY = "nestspace_mood_board_data"

export const MoodBoard: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [board, setBoard] = useState<Board>(() => ({
    id: "default-board-1",
    title: PRESET_MOOD_BOARDS[0].title,
    description: PRESET_MOOD_BOARDS[0].description,
    category: PRESET_MOOD_BOARDS[0].category,
    updatedAt: "2026-01-01T00:00:00.000Z",
    backgroundColor: "#FDFBF7",
    showGrid: true,
    items: PRESET_MOOD_BOARDS[0].items.map((item, idx) => ({
      ...item,
      id: `item-init-${idx + 1}`,
    })),
  }))

  // History for Undo / Redo
  const [history, setHistory] = useState<Board[]>([])
  const [future, setFuture] = useState<Board[]>([])

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  // Hydrate from LocalStorage on mount safely
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true)
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && Array.isArray(parsed.items)) {
            setBoard(parsed)
          }
        }
      } catch (err) {
        console.error("Failed to load saved mood board from localStorage", err)
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  // Auto-Save to LocalStorage on board state change
  const pushBoardState = useCallback(
    (newBoard: Board) => {
      setHistory((prev) => [...prev, board])
      setFuture([])
      setBoard(newBoard)
      setIsSaved(false)

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBoard))
        setTimeout(() => setIsSaved(true), 400)
      } catch (err) {
        console.error("Failed auto-save to localStorage", err)
      }
    },
    [board]
  )

  // Undo Handler
  const handleUndo = useCallback(() => {
    if (history.length === 0) return
    const previous = history[history.length - 1]
    const newHistory = history.slice(0, history.length - 1)

    setFuture((prev) => [board, ...prev])
    setBoard(previous)
    setHistory(newHistory)

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(previous))
    } catch (err) {
      console.error(err)
    }
  }, [history, board])

  // Redo Handler
  const handleRedo = useCallback(() => {
    if (future.length === 0) return
    const next = future[0]
    const newFuture = future.slice(1)

    setHistory((prev) => [...prev, board])
    setBoard(next)
    setFuture(newFuture)

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next))
    } catch (err) {
      console.error(err)
    }
  }, [future, board])

  // Add Item to Board
  const handleAddItem = (
    itemData: Omit<BoardItem, "id" | "x" | "y" | "zIndex">
  ) => {
    const maxZ = board.items.reduce((max, i) => Math.max(max, i.zIndex), 0)
    // Calculate cascade position
    const itemCount = board.items.length
    const startX = 60 + (itemCount % 4) * 40
    const startY = 60 + (itemCount % 4) * 40

    const newItem: BoardItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      x: startX,
      y: startY,
      zIndex: maxZ + 1,
    }

    const updatedBoard = {
      ...board,
      updatedAt: new Date().toISOString(),
      items: [...board.items, newItem],
    }

    pushBoardState(updatedBoard)
    setSelectedItemId(newItem.id)
  }

  // Update single item
  const handleUpdateItem = (updatedItem: BoardItem) => {
    const updatedItems = board.items.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    )
    const updatedBoard = {
      ...board,
      updatedAt: new Date().toISOString(),
      items: updatedItems,
    }
    setBoard(updatedBoard)
    setIsSaved(false)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBoard))
      setTimeout(() => setIsSaved(true), 300)
    } catch (err) {
      console.error(err)
    }
  }

  // Duplicate item
  const handleDuplicateItem = (id: string) => {
    const target = board.items.find((i) => i.id === id)
    if (!target) return

    const maxZ = board.items.reduce((max, i) => Math.max(max, i.zIndex), 0)
    const duplicated: BoardItem = {
      ...target,
      id: `item-dup-${Date.now()}`,
      x: target.x + 30,
      y: target.y + 30,
      zIndex: maxZ + 1,
    }

    const updatedBoard = {
      ...board,
      updatedAt: new Date().toISOString(),
      items: [...board.items, duplicated],
    }

    pushBoardState(updatedBoard)
    setSelectedItemId(duplicated.id)
  }

  // Delete item
  const handleDeleteItem = (id: string) => {
    const updatedItems = board.items.filter((i) => i.id !== id)
    const updatedBoard = {
      ...board,
      updatedAt: new Date().toISOString(),
      items: updatedItems,
    }
    pushBoardState(updatedBoard)
    if (selectedItemId === id) setSelectedItemId(null)
  }

  // Z-Index reordering
  const handleZIndexChange = (id: string, direction: "up" | "down") => {
    const target = board.items.find((i) => i.id === id)
    if (!target) return

    const delta = direction === "up" ? 1 : -1
    const newZ = Math.max(1, target.zIndex + delta)

    handleUpdateItem({
      ...target,
      zIndex: newZ,
    })
  }

  // Load Preset
  const handleLoadPreset = (preset: PresetBoard) => {
    const newItems: BoardItem[] = preset.items.map((item, idx) => ({
      ...item,
      id: `item-preset-${idx + 1}-${Date.now()}`,
    }))

    const newBoard: Board = {
      id: `board-${preset.id}`,
      title: preset.title,
      description: preset.description,
      category: preset.category,
      updatedAt: new Date().toISOString(),
      backgroundColor: "#FDFBF7",
      showGrid: true,
      items: newItems,
    }

    pushBoardState(newBoard)
    setSelectedItemId(null)
  }

  // Clear Board
  const handleClearBoard = () => {
    const clearedBoard: Board = {
      ...board,
      items: [],
      updatedAt: new Date().toISOString(),
    }
    pushBoardState(clearedBoard)
    setSelectedItemId(null)
  }

  // Reset to default Japandi preset
  const handleResetPresetBoard = () => {
    handleLoadPreset(PRESET_MOOD_BOARDS[0])
  }

  // Update Board Metadata
  const handleUpdateTitle = (title: string, description: string) => {
    const updatedBoard = {
      ...board,
      title,
      description,
      updatedAt: new Date().toISOString(),
    }
    pushBoardState(updatedBoard)
  }

  // Update Background Color
  const handleUpdateBgColor = (color: string) => {
    const updatedBoard = {
      ...board,
      backgroundColor: color,
      updatedAt: new Date().toISOString(),
    }
    pushBoardState(updatedBoard)
  }

  if (!mounted) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-medium">Loading Interior Mood Board...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Banner */}
      <MoodBoardHero />

      {/* Board Metadata Header */}
      <BoardControls
        boardTitle={board.title}
        boardDescription={board.description}
        backgroundColor={board.backgroundColor}
        onUpdateTitle={handleUpdateTitle}
        onUpdateBgColor={handleUpdateBgColor}
        onLoadPreset={handleLoadPreset}
      />

      {/* Canvas Top Toolbar */}
      <MoodBoardToolbar
        canUndo={history.length > 0}
        canRedo={future.length > 0}
        zoomLevel={zoomLevel}
        showGrid={showGrid}
        isSaved={isSaved}
        itemCount={board.items.length}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onZoomIn={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
        onZoomOut={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
        onResetZoom={() => setZoomLevel(1)}
        onToggleGrid={() => setShowGrid((g) => !g)}
        onClearBoard={handleClearBoard}
        onResetPresetBoard={handleResetPresetBoard}
        onOpenExportPanel={() => setIsExportOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Workspace: Sidebar + Interactive Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        <MoodBoardSidebar
          onAddItem={handleAddItem}
          isOpenOnMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <MoodBoardCanvas
          board={board}
          selectedItemId={selectedItemId}
          zoomLevel={zoomLevel}
          showGrid={showGrid}
          onSelectItem={setSelectedItemId}
          onUpdateItem={handleUpdateItem}
          onDuplicateItem={handleDuplicateItem}
          onDeleteItem={handleDeleteItem}
          onZIndexChange={handleZIndexChange}
          onLoadPreset={handleLoadPreset}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      </div>

      {/* Export & Share Modal */}
      <ExportPanel
        board={board}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  )
}
