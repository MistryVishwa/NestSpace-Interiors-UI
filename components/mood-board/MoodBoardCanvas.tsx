"use client"

import React, { useEffect, useCallback } from "react"
import { Board, BoardItem } from "@/types/mood-board"
import { MoodBoardItem } from "./MoodBoardItem"
import { EmptyBoard } from "./EmptyBoard"
import { PresetBoard } from "@/types/mood-board"
import { cn } from "@/lib/utils"

interface MoodBoardCanvasProps {
  board: Board
  selectedItemId: string | null
  zoomLevel: number
  showGrid: boolean
  onSelectItem: (id: string | null) => void
  onUpdateItem: (updatedItem: BoardItem) => void
  onDuplicateItem: (id: string) => void
  onDeleteItem: (id: string) => void
  onZIndexChange: (id: string, direction: "up" | "down") => void
  onLoadPreset: (preset: PresetBoard) => void
  onOpenSidebar?: () => void
  onUndo: () => void
  onRedo: () => void
}

export const MoodBoardCanvas: React.FC<MoodBoardCanvasProps> = ({
  board,
  selectedItemId,
  zoomLevel,
  showGrid,
  onSelectItem,
  onUpdateItem,
  onDuplicateItem,
  onDeleteItem,
  onZIndexChange,
  onLoadPreset,
  onOpenSidebar,
  onUndo,
  onRedo,
}) => {
  // Keyboard Shortcuts Listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore keyboard shortcuts if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      // Undo / Redo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          onRedo()
        } else {
          onUndo()
        }
        e.preventDefault()
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        onRedo()
        e.preventDefault()
        return
      }

      // Delete selected item
      if ((e.key === "Delete" || e.key === "Backspace") && selectedItemId) {
        onDeleteItem(selectedItemId)
        e.preventDefault()
        return
      }

      // Nudge selected item with Arrow Keys
      if (selectedItemId) {
        const selectedItem = board.items.find((i) => i.id === selectedItemId)
        if (!selectedItem) return

        const step = e.shiftKey ? 20 : 5
        let dx = 0
        let dy = 0

        if (e.key === "ArrowLeft") dx = -step
        else if (e.key === "ArrowRight") dx = step
        else if (e.key === "ArrowUp") dy = -step
        else if (e.key === "ArrowDown") dy = step

        if (dx !== 0 || dy !== 0) {
          onUpdateItem({
            ...selectedItem,
            x: Math.max(0, selectedItem.x + dx),
            y: Math.max(0, selectedItem.y + dy),
          })
          e.preventDefault()
        }
      }
    },
    [selectedItemId, board.items, onDeleteItem, onUpdateItem, onUndo, onRedo]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectItem(null)
    }
  }

  return (
    <main
      onClick={handleCanvasClick}
      className={cn(
        "relative flex-1 w-full h-full min-h-[600px] overflow-auto select-none transition-colors duration-300 p-8 flex flex-col justify-start items-center",
        showGrid && "bg-grid-pattern"
      )}
      style={{
        backgroundColor: board.backgroundColor || "#FDFBF7",
        backgroundImage: showGrid
          ? "radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px)"
          : undefined,
        backgroundSize: showGrid ? "20px 20px" : undefined,
      }}
    >
      {/* Scalable Canvas Workspace Container */}
      <div
        onClick={handleCanvasClick}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "top center",
          width: "100%",
          maxWidth: "1200px",
          minHeight: "750px",
          position: "relative",
          transition: "transform 0.15s ease-out",
        }}
        className="relative my-auto"
      >
        {board.items.length === 0 ? (
          <EmptyBoard onLoadPreset={onLoadPreset} onOpenSidebar={onOpenSidebar} />
        ) : (
          board.items.map((item) => (
            <MoodBoardItem
              key={item.id}
              item={item}
              isSelected={selectedItemId === item.id}
              zoomLevel={zoomLevel}
              showGrid={showGrid}
              gridSize={20}
              onSelect={(id) => onSelectItem(id)}
              onUpdate={onUpdateItem}
              onDuplicate={onDuplicateItem}
              onDelete={onDeleteItem}
              onZIndexChange={onZIndexChange}
            />
          ))
        )}
      </div>
    </main>
  )
}
