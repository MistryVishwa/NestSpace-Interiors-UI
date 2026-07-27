"use client"

import * as React from "react"
import {
  Undo2,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
  Grid,
  Magnet,
  Maximize2,
  RotateCw,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ToolbarProps {
  canUndo: boolean
  snapToGrid: boolean
  showGrid: boolean
  zoom: number
  selectedId: string | null
  onUndo: () => void
  onReset: () => void
  onClear: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onToggleSnap: (enabled: boolean) => void
  onToggleGrid: (enabled: boolean) => void
  onRotateSelected?: () => void
  onDuplicateSelected?: () => void
  onDeleteSelected?: () => void
}

export function Toolbar({
  canUndo,
  snapToGrid,
  showGrid,
  zoom,
  selectedId,
  onUndo,
  onReset,
  onClear,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleSnap,
  onToggleGrid,
  onRotateSelected,
  onDuplicateSelected,
  onDeleteSelected,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl p-2.5 sm:p-3 shadow-md mb-4">
      {/* Left Action Buttons: Undo, Reset, Clear */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-9 px-3 gap-1.5 rounded-xl border-border text-xs font-medium"
          aria-label="Undo last action"
        >
          <Undo2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Undo</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="h-9 px-3 gap-1.5 rounded-xl border-border text-xs font-medium text-muted-foreground hover:text-foreground"
          aria-label="Reset room to default"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 px-3 gap-1.5 rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label="Clear all furniture"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </div>

      {/* Selected Item Quick Action Contextual Controls */}
      {selectedId && (
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-2 py-1">
          <span className="text-xs font-semibold text-primary px-1 hidden md:inline">
            Selected:
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRotateSelected}
            className="h-8 w-8 rounded-lg text-primary hover:bg-primary/20"
            aria-label="Rotate selected furniture 90 degrees"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onDuplicateSelected}
            className="h-8 w-8 rounded-lg text-primary hover:bg-primary/20"
            aria-label="Duplicate selected furniture"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onDeleteSelected}
            className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/20"
            aria-label="Delete selected furniture"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Right Canvas Toggles: Grid, Snap, Zoom */}
      <div className="flex items-center gap-1.5">
        {/* Toggle Grid */}
        <Button
          variant={showGrid ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleGrid(!showGrid)}
          className={cn(
            "h-9 px-2.5 gap-1.5 rounded-xl border-border text-xs font-medium",
            showGrid && "bg-primary/15 text-primary border-primary/30"
          )}
          aria-label="Toggle background grid lines"
        >
          <Grid className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Grid</span>
        </Button>

        {/* Snap to Grid */}
        <Button
          variant={snapToGrid ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleSnap(!snapToGrid)}
          className={cn(
            "h-9 px-2.5 gap-1.5 rounded-xl border-border text-xs font-medium",
            snapToGrid && "bg-primary/15 text-primary border-primary/30"
          )}
          aria-label="Toggle snap to grid"
        >
          <Magnet className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Snap</span>
        </Button>

        {/* Zoom Controls */}
        <div className="flex items-center gap-0.5 border border-border rounded-xl p-0.5 bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            disabled={zoom <= 0.6}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Zoom out canvas"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          <button
            type="button"
            onClick={onResetZoom}
            className="px-2 text-xs font-mono font-medium text-foreground hover:text-primary focus-visible:outline-none"
            aria-label="Reset zoom to 100%"
          >
            {Math.round(zoom * 100)}%
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            disabled={zoom >= 1.5}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Zoom in canvas"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
