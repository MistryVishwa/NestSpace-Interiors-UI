"use client"

import React, { useState, useRef, useCallback } from "react"
import { BoardItem as BoardItemType } from "@/types/mood-board"
import { ImageItem } from "./ImageItem"
import { ColorItem } from "./ColorItem"
import { MaterialItem } from "./MaterialItem"
import { TextureItem } from "./TextureItem"
import { FurnitureItem } from "./FurnitureItem"
import { cn } from "@/lib/utils"
import {
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  RotateCw,
  StickyNote,
  Grip,
  Edit2,
  Check,
} from "lucide-react"

interface MoodBoardItemProps {
  item: BoardItemType
  isSelected: boolean
  zoomLevel: number
  showGrid: boolean
  gridSize?: number
  onSelect: (id: string, e: React.MouseEvent | React.TouchEvent) => void
  onUpdate: (updatedItem: BoardItemType) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onZIndexChange: (id: string, direction: "up" | "down") => void
}

export const MoodBoardItem: React.FC<MoodBoardItemProps> = ({
  item,
  isSelected,
  zoomLevel,
  showGrid,
  gridSize = 20,
  onSelect,
  onUpdate,
  onDuplicate,
  onDelete,
  onZIndexChange,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [noteText, setNoteText] = useState(item.noteData?.text || item.title || "")
  const dragStartPos = useRef({ x: 0, y: 0 })
  const itemStartPos = useRef({ x: item.x, y: item.y })
  const itemStartSize = useRef({ width: item.width, height: item.height })

  const snapToGrid = useCallback(
    (val: number) => {
      if (!showGrid) return val
      return Math.round(val / gridSize) * gridSize
    },
    [showGrid, gridSize]
  )

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isEditingNote) return
    e.stopPropagation()
    onSelect(item.id, e)

    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    itemStartPos.current = { x: item.x, y: item.y }

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const dx = (moveEvt.clientX - dragStartPos.current.x) / zoomLevel
      const dy = (moveEvt.clientY - dragStartPos.current.y) / zoomLevel

      const newX = snapToGrid(Math.max(0, itemStartPos.current.x + dx))
      const newY = snapToGrid(Math.max(0, itemStartPos.current.y + dy))

      onUpdate({
        ...item,
        x: newX,
        y: newY,
      })
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  // Resize handler
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    itemStartSize.current = { width: item.width, height: item.height }

    const handleResizeMove = (moveEvt: PointerEvent) => {
      const dx = (moveEvt.clientX - dragStartPos.current.x) / zoomLevel
      const dy = (moveEvt.clientY - dragStartPos.current.y) / zoomLevel

      const newW = Math.max(140, snapToGrid(itemStartSize.current.width + dx))
      const newH = Math.max(100, snapToGrid(itemStartSize.current.height + dy))

      onUpdate({
        ...item,
        width: newW,
        height: newH,
      })
    }

    const handleResizeUp = () => {
      setIsResizing(false)
      window.removeEventListener("pointermove", handleResizeMove)
      window.removeEventListener("pointerup", handleResizeUp)
    }

    window.addEventListener("pointermove", handleResizeMove)
    window.addEventListener("pointerup", handleResizeUp)
  }

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentRot = item.rotation || 0
    const nextRot = (currentRot + 15) % 360
    onUpdate({
      ...item,
      rotation: nextRot,
    })
  }

  const handleSaveNote = () => {
    setIsEditingNote(false)
    onUpdate({
      ...item,
      title: noteText.slice(0, 30),
      noteData: {
        ...item.noteData,
        text: noteText,
      },
    })
  }

  // Content Renderer
  const renderItemContent = () => {
    switch (item.type) {
      case "image":
        return (
          <ImageItem
            imageData={item.imageData}
            title={item.title}
            frameStyle={item.frameStyle}
          />
        )
      case "color":
        return <ColorItem colorData={item.colorData} title={item.title} />
      case "material":
        return <MaterialItem materialData={item.materialData} title={item.title} />
      case "texture":
        return <TextureItem textureData={item.textureData} title={item.title} />
      case "furniture":
        return (
          <FurnitureItem furnitureData={item.furnitureData} title={item.title} />
        )
      case "note":
        return (
          <div
            className="w-full h-full p-4 rounded-xl shadow-md border border-amber-300/50 dark:border-amber-700/50 flex flex-col justify-between"
            style={{
              backgroundColor:
                item.noteData?.backgroundColor || "rgba(254, 243, 199, 0.95)",
              color: item.noteData?.textColor || "#451a03",
            }}
          >
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider">
                <StickyNote className="w-3.5 h-3.5" />
                <span>Designer Note</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingNote(!isEditingNote)}
                className="p-1 hover:bg-black/10 rounded transition-colors"
                title="Edit Note"
              >
                {isEditingNote ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Edit2 className="w-3.5 h-3.5 opacity-70" />
                )}
              </button>
            </div>

            {isEditingNote ? (
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onBlur={handleSaveNote}
                autoFocus
                className="w-full h-full bg-transparent resize-none border-none outline-none text-xs font-sans leading-relaxed focus:ring-0"
              />
            ) : (
              <p className="text-xs font-medium leading-relaxed flex-1 overflow-y-auto whitespace-pre-wrap">
                {item.noteData?.text || item.title || "Click edit icon to add note..."}
              </p>
            )}
          </div>
        )
      default:
        return (
          <div className="w-full h-full bg-muted rounded-xl p-3 text-xs flex items-center justify-center">
            {item.title}
          </div>
        )
    }
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        position: "absolute",
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
        zIndex: item.zIndex,
        transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
      }}
      className={cn(
        "group touch-none select-none cursor-grab active:cursor-grabbing transition-shadow duration-200",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-50",
        isDragging && "opacity-90 shadow-2xl scale-[1.01]"
      )}
    >
      {/* Content */}
      <div className="w-full h-full pointer-events-auto">{renderItemContent()}</div>

      {/* Selected Action Toolbar */}
      {isSelected && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover/95 backdrop-blur-md border border-border text-popover-foreground px-2 py-1 rounded-lg shadow-xl flex items-center gap-1 z-50 animate-in fade-in zoom-in-95"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onZIndexChange(item.id, "up")
            }}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            title="Bring Forward"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onZIndexChange(item.id, "down")
            }}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            title="Send Backward"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleRotate}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            title="Rotate Item"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-3.5 bg-border my-auto mx-0.5" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate(item.id)
            }}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            title="Duplicate Item"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item.id)
            }}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
            title="Delete Item"
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </button>
        </div>
      )}

      {/* Resize Handle */}
      {isSelected && (
        <div
          onPointerDown={handleResizePointerDown}
          className={cn(
            "absolute -bottom-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center cursor-se-resize z-50 hover:scale-125 transition-transform",
            isResizing && "scale-125 bg-amber-500"
          )}
          title="Drag to resize"
        >
          <Grip className="w-3 h-3 rotate-45" />
        </div>
      )}
    </div>
  )
}
