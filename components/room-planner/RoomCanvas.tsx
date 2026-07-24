"use client"

import * as React from "react"
import {
  FurnitureTemplate,
  PlacedFurniture,
  RoomPreset,
} from "@/types/room-planner"
import { FURNITURE_TEMPLATES } from "@/lib/roomPlannerData"
import { GridCanvas } from "./GridCanvas"
import { RotationHandle } from "./RotationHandle"
import { ResizeHandle } from "./ResizeHandle"
import { RoomControls } from "./RoomControls"
import { EmptyPlanner } from "./EmptyPlanner"
import {
  Sofa,
  Armchair,
  Table,
  Tv,
  Bed,
  BedDouble,
  Box,
  DoorClosed,
  Utensils,
  CircleDot,
  Columns3,
  Laptop,
  Library,
  Flower2,
  Grid as GridIcon,
  Lamp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sofa,
  Armchair,
  Table,
  Tv,
  Bed,
  BedDouble,
  Box,
  DoorClosed,
  Utensils,
  CircleDot,
  Columns3,
  Laptop,
  Library,
  Flower2,
  Grid: GridIcon,
  Lamp,
}

interface RoomCanvasProps {
  roomPreset: RoomPreset
  placedItems: PlacedFurniture[]
  selectedId: string | null
  showGrid: boolean
  zoom: number
  onSelectItem: (id: string | null) => void
  onAddItem: (template: FurnitureTemplate, pos?: { x: number; y: number }) => void
  onUpdateItem: (id: string, updates: Partial<PlacedFurniture>) => void
  onRotateItem: (id: string) => void
  onDuplicateItem: (id: string) => void
  onRemoveItem: (id: string) => void
  onOpenMobileCatalog?: () => void
}

export function RoomCanvas({
  roomPreset,
  placedItems,
  selectedId,
  showGrid,
  zoom,
  onSelectItem,
  onAddItem,
  onUpdateItem,
  onRotateItem,
  onDuplicateItem,
  onRemoveItem,
  onOpenMobileCatalog,
}: RoomCanvasProps) {
  const canvasRef = React.useRef<HTMLDivElement>(null)

  // Dragging state inside canvas
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const dragOffsetRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Resizing state
  const [resizingId, setResizingId] = React.useState<string | null>(null)
  const resizeStartRef = React.useRef<{
    startX: number
    startY: number
    startW: number
    startH: number
  }>({ startX: 0, startY: 0, startW: 0, startH: 0 })

  // Handle Dragover & Drop from Sidebar
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!canvasRef.current) return

    const dataStr = e.dataTransfer.getData("application/json")
    if (!dataStr) return

    try {
      const template: FurnitureTemplate = JSON.parse(dataStr)
      const rect = canvasRef.current.getBoundingClientRect()
      const dropX = (e.clientX - rect.left) / zoom - template.width / 2
      const dropY = (e.clientY - rect.top) / zoom - template.height / 2

      onAddItem(template, { x: dropX, y: dropY })
    } catch {
      // Invalid drag data
    }
  }

  // Handle Mouse/Touch Pointer Down on Item
  const handlePointerDownItem = (
    e: React.MouseEvent | React.TouchEvent,
    item: PlacedFurniture
  ) => {
    e.stopPropagation()
    onSelectItem(item.instanceId)
    setDraggingId(item.instanceId)

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const itemCanvasX = item.x * zoom + rect.left
      const itemCanvasY = item.y * zoom + rect.top

      dragOffsetRef.current = {
        x: (clientX - itemCanvasX) / zoom,
        y: (clientY - itemCanvasY) / zoom,
      }
    }
  }

  // Handle Pointer Move for Canvas Drag / Resize
  const handlePointerMove = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      // Item Movement
      if (draggingId) {
        const mouseX = (clientX - rect.left) / zoom
        const mouseY = (clientY - rect.top) / zoom

        const newX = mouseX - dragOffsetRef.current.x
        const newY = mouseY - dragOffsetRef.current.y

        onUpdateItem(draggingId, { x: newX, y: newY })
      }

      // Item Resizing
      if (resizingId) {
        const deltaX = (clientX - resizeStartRef.current.startX) / zoom
        const deltaY = (clientY - resizeStartRef.current.startY) / zoom

        const item = placedItems.find((i) => i.instanceId === resizingId)
        if (!item) return

        const template = FURNITURE_TEMPLATES.find((t) => t.id === item.templateId)
        const minW = template?.minWidth || 40
        const maxW = template?.maxWidth || 300
        const minH = template?.minHeight || 40
        const maxH = template?.maxHeight || 300

        const newW = Math.max(minW, Math.min(maxW, resizeStartRef.current.startW + deltaX))
        const newH = Math.max(minH, Math.min(maxH, resizeStartRef.current.startH + deltaY))

        onUpdateItem(resizingId, { width: Math.round(newW), height: Math.round(newH) })
      }
    },
    [draggingId, resizingId, zoom, onUpdateItem, placedItems]
  )

  // Handle Pointer Up
  const handlePointerUp = React.useCallback(() => {
    setDraggingId(null)
    setResizingId(null)
  }, [])

  // Attach global event listeners during active drag/resize
  React.useEffect(() => {
    if (draggingId || resizingId) {
      window.addEventListener("mousemove", handlePointerMove)
      window.addEventListener("touchmove", handlePointerMove)
      window.addEventListener("mouseup", handlePointerUp)
      window.addEventListener("touchend", handlePointerUp)

      return () => {
        window.removeEventListener("mousemove", handlePointerMove)
        window.removeEventListener("touchmove", handlePointerMove)
        window.removeEventListener("mouseup", handlePointerUp)
        window.removeEventListener("touchend", handlePointerUp)
      }
    }
  }, [draggingId, resizingId, handlePointerMove, handlePointerUp])

  // Keyboard Shortcuts (Arrow movement, Delete, Rotate R key)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      const item = placedItems.find((i) => i.instanceId === selectedId)
      if (!item) return

      const step = e.shiftKey ? 20 : 5

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onUpdateItem(selectedId, { x: item.x - step })
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        onUpdateItem(selectedId, { x: item.x + step })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        onUpdateItem(selectedId, { y: item.y - step })
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        onUpdateItem(selectedId, { y: item.y + step })
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        onRemoveItem(selectedId)
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault()
        onRotateItem(selectedId)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId, placedItems, onUpdateItem, onRemoveItem, onRotateItem])

  // Handle Resize Start
  const handleResizeStart = (
    e: React.MouseEvent | React.TouchEvent,
    instanceId: string
  ) => {
    const item = placedItems.find((i) => i.instanceId === instanceId)
    if (!item) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setResizingId(instanceId)
    resizeStartRef.current = {
      startX: clientX,
      startY: clientY,
      startW: item.width,
      startH: item.height,
    }
  }

  return (
    <div className="relative w-full flex-1 flex items-center justify-center p-4 sm:p-8 bg-card/40 border border-border/80 rounded-2xl overflow-auto min-h-[480px]">
      {/* Zoomable Container */}
      <div
        className="relative transition-transform duration-150 ease-out origin-center"
        style={{
          width: roomPreset.width,
          height: roomPreset.height,
          transform: `scale(${zoom})`,
        }}
      >
        {/* Canvas Drop Area */}
        <div
          ref={canvasRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => onSelectItem(null)}
          className="relative w-full h-full bg-background rounded-xl shadow-inner select-none overflow-hidden"
          style={{ width: roomPreset.width, height: roomPreset.height }}
        >
          {/* Grid Background */}
          <GridCanvas
            width={roomPreset.width}
            height={roomPreset.height}
            gridSize={roomPreset.gridSize}
            showGrid={showGrid}
          />

          {/* Empty State Overlay */}
          {placedItems.length === 0 && (
            <EmptyPlanner onOpenCatalog={onOpenMobileCatalog} />
          )}

          {/* Placed Furniture Items */}
          {placedItems.map((item) => {
            const isSelected = selectedId === item.instanceId
            const IconComponent = ICON_MAP[item.iconName] || Box

            return (
              <div
                key={item.instanceId}
                onMouseDown={(e) => handlePointerDownItem(e, item)}
                onTouchStart={(e) => handlePointerDownItem(e, item)}
                className={cn(
                  "absolute flex items-center justify-center rounded-xl transition-shadow cursor-move z-20 group",
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg"
                    : "hover:ring-1 hover:ring-primary/50 shadow-sm"
                )}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.width,
                  height: item.height,
                  backgroundColor: item.color,
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: isSelected ? 50 : item.zIndex,
                }}
              >
                {/* Item Label & Icon */}
                <div className="flex flex-col items-center justify-center p-1 text-white text-center pointer-events-none">
                  <IconComponent className="h-5 w-5 drop-shadow-xs" />
                  <span className="text-[10px] font-semibold tracking-tight truncate max-w-full drop-shadow-xs mt-0.5">
                    {item.name}
                  </span>
                </div>

                {/* Selected Item Rotation Handle */}
                {isSelected && (
                  <RotationHandle
                    onRotate={() => onRotateItem(item.instanceId)}
                  />
                )}

                {/* Selected Item Resize Handle */}
                {isSelected && (
                  <ResizeHandle
                    onResizeStart={(e) => handleResizeStart(e, item.instanceId)}
                  />
                )}

                {/* Floating Context Controls */}
                {isSelected && (
                  <RoomControls
                    onRotate={() => onRotateItem(item.instanceId)}
                    onDuplicate={() => onDuplicateItem(item.instanceId)}
                    onDelete={() => onRemoveItem(item.instanceId)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
