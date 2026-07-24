"use client"

import React from "react"
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Trash2,
  SlidersHorizontal,
  Check,
  Download,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MoodBoardToolbarProps {
  canUndo: boolean
  canRedo: boolean
  zoomLevel: number
  showGrid: boolean
  isSaved: boolean
  itemCount: number
  onUndo: () => void
  onRedo: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onToggleGrid: () => void
  onClearBoard: () => void
  onResetPresetBoard: () => void
  onOpenExportPanel: () => void
  onToggleMobileSidebar: () => void
}

export const MoodBoardToolbar: React.FC<MoodBoardToolbarProps> = ({
  canUndo,
  canRedo,
  zoomLevel,
  showGrid,
  isSaved,
  itemCount,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleGrid,
  onClearBoard,
  onResetPresetBoard,
  onOpenExportPanel,
  onToggleMobileSidebar,
}) => {
  const zoomPercent = Math.round(zoomLevel * 100)

  return (
    <header className="w-full bg-card/90 backdrop-blur-md border-b border-border px-4 py-2.5 flex items-center justify-between gap-2 z-20 shadow-sm">
      {/* Left Action Tools */}
      <div className="flex items-center gap-1.5">
        {/* Mobile Toggle Drawer Button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg bg-muted text-foreground hover:bg-accent transition-colors flex items-center gap-1 text-xs font-semibold"
          title="Toggle Asset Drawer"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span>Assets</span>
        </button>

        {/* Undo & Redo */}
        <div className="flex items-center bg-muted/60 rounded-lg p-0.5 border border-border">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className={cn(
              "p-1.5 rounded-md text-foreground transition-colors",
              canUndo
                ? "hover:bg-card hover:shadow-sm"
                : "opacity-40 cursor-not-allowed"
            )}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className={cn(
              "p-1.5 rounded-md text-foreground transition-colors",
              canRedo
                ? "hover:bg-card hover:shadow-sm"
                : "opacity-40 cursor-not-allowed"
            )}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:block w-px h-5 bg-border mx-1" />

        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center bg-muted/60 rounded-lg p-0.5 border border-border text-xs">
          <button
            type="button"
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.5}
            className="p-1.5 rounded-md hover:bg-card hover:shadow-sm text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onResetZoom}
            className="px-2 font-mono font-medium text-foreground hover:text-primary transition-colors"
            title="Reset Zoom to 100%"
          >
            {zoomPercent}%
          </button>

          <button
            type="button"
            onClick={onZoomIn}
            disabled={zoomLevel >= 1.6}
            className="p-1.5 rounded-md hover:bg-card hover:shadow-sm text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Toggle */}
        <button
          type="button"
          onClick={onToggleGrid}
          className={cn(
            "p-1.5 rounded-lg border transition-all flex items-center gap-1 text-xs font-medium",
            showGrid
              ? "bg-primary/10 border-primary/30 text-primary font-semibold"
              : "bg-muted/60 border-border text-muted-foreground hover:text-foreground"
          )}
          title="Toggle Grid Alignment"
        >
          <Grid className="w-4 h-4" />
          <span className="hidden md:inline">Grid</span>
        </button>
      </div>

      {/* Middle Save Status */}
      <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 font-medium">
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Saved locally</span>
            </>
          ) : (
            <span>Saving changes...</span>
          )}
        </span>
        <span className="text-[11px] opacity-75">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </div>

      {/* Right Export & Reset Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onResetPresetBoard}
          className="p-1.5 rounded-lg border border-border bg-muted/50 text-foreground hover:bg-muted text-xs font-medium transition-colors flex items-center gap-1"
          title="Reset to Default Preset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Reset</span>
        </button>

        <button
          type="button"
          onClick={onClearBoard}
          className="p-1.5 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 text-xs font-medium transition-colors flex items-center gap-1"
          title="Clear all canvas items"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Clear</span>
        </button>

        <button
          type="button"
          onClick={onOpenExportPanel}
          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export Board</span>
        </button>
      </div>
    </header>
  )
}
