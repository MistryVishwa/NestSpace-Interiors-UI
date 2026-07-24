"use client"

import * as React from "react"
import { MoveDiagonal } from "lucide-react"

interface ResizeHandleProps {
  onResizeStart: (e: React.MouseEvent | React.TouchEvent) => void
}

export function ResizeHandle({ onResizeStart }: ResizeHandleProps) {
  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation()
        onResizeStart(e)
      }}
      onTouchStart={(e) => {
        e.stopPropagation()
        onResizeStart(e)
      }}
      className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md cursor-nwse-resize hover:scale-110 active:scale-95 transition-transform z-30"
      title="Drag to resize"
      aria-label="Resize handle"
    >
      <MoveDiagonal className="h-3 w-3" />
    </div>
  )
}
