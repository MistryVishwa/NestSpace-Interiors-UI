"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Maximize2, RotateCcw, ArrowLeftRight, HelpCircle } from "lucide-react"

interface ComparisonControlsProps {
  sliderPosition: number
  onPositionChange: (pos: number) => void
  onToggleFullscreen?: () => void
  isFlipped?: boolean
  onToggleFlip?: () => void
  className?: string
  showFullscreenButton?: boolean
}

export function ComparisonControls({
  sliderPosition,
  onPositionChange,
  onToggleFullscreen,
  isFlipped = false,
  onToggleFlip,
  className,
  showFullscreenButton = true,
}: ComparisonControlsProps) {
  const PRESETS = [
    { label: "Before", pos: 0 },
    { label: "25%", pos: 25 },
    { label: "50%", pos: 50 },
    { label: "75%", pos: 75 },
    { label: "After", pos: 100 },
  ]

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-md",
        className
      )}
    >
      {/* Preset Position Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {PRESETS.map((preset) => {
          const isActive = Math.abs(sliderPosition - preset.pos) < 2
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onPositionChange(preset.pos)}
              className={cn(
                "px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-label={`Set comparison split to ${preset.label}`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
        {/* Flip toggle button */}
        {onToggleFlip && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFlip}
            className={cn(
              "h-8 sm:h-9 px-2.5 sm:px-3 text-xs rounded-xl border-border/60 transition-all",
              isFlipped && "bg-primary/10 border-primary text-primary"
            )}
            title="Swap Before / After positions"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Flip</span>
          </Button>
        )}

        {/* Reset button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPositionChange(50)}
          disabled={sliderPosition === 50}
          className="h-8 sm:h-9 px-2.5 sm:px-3 text-xs rounded-xl border-border/60"
          title="Reset to 50/50 split"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:mr-1" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        {/* Fullscreen button */}
        {showFullscreenButton && onToggleFullscreen && (
          <Button
            variant="default"
            size="sm"
            onClick={onToggleFullscreen}
            className="h-8 sm:h-9 px-3 sm:px-4 text-xs rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            title="Open Fullscreen Comparison"
          >
            <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
            <span>Fullscreen</span>
          </Button>
        )}
      </div>

      {/* Keyboard Shortcut Hint (Desktop) */}
      <div className="w-full pt-1 hidden md:flex items-center justify-between text-[11px] text-muted-foreground/70 border-t border-border/40 mt-1">
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          Drag slider or focus and use <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">→</kbd> arrow keys to adjust split.
        </span>
        <span>Hold Shift + Arrow for fine adjustments</span>
      </div>
    </div>
  )
}
