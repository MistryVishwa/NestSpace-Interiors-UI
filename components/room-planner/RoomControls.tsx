"use client"

import * as React from "react"
import { RotateCw, Copy, Trash2 } from "lucide-react"

interface RoomControlsProps {
  onRotate: () => void
  onDuplicate: () => void
  onDelete: () => void
}

export function RoomControls({
  onRotate,
  onDuplicate,
  onDelete,
}: RoomControlsProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-background/95 border border-border shadow-lg rounded-xl px-2 py-1 z-40 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onRotate}
        className="p-1 rounded-lg hover:bg-muted text-foreground transition-colors"
        title="Rotate 90°"
        aria-label="Rotate"
      >
        <RotateCw className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={onDuplicate}
        className="p-1 rounded-lg hover:bg-muted text-foreground transition-colors"
        title="Duplicate item"
        aria-label="Duplicate"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="p-1 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
        title="Delete item"
        aria-label="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
