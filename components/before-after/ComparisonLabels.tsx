"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Sparkles, History } from "lucide-react"

interface ComparisonLabelsProps {
  beforeLabel?: string
  afterLabel?: string
  roomType?: string
  style?: string
  position?: "top" | "bottom"
  className?: string
  sliderPosition?: number
}

export function ComparisonLabels({
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  roomType,
  style,
  position = "top",
  className,
  sliderPosition = 50,
}: ComparisonLabelsProps) {
  // Hide labels if slider is near extreme edges for visual cleanliness
  const hideBefore = sliderPosition <= 12
  const hideAfter = sliderPosition >= 88

  const verticalPosClass = position === "top" ? "top-4 sm:top-6" : "bottom-4 sm:bottom-6"

  return (
    <div
      className={cn(
        "aria-hidden:hidden pointer-events-none absolute inset-x-0 z-20 flex items-center justify-between px-4 sm:px-6 transition-opacity duration-300",
        verticalPosClass,
        className
      )}
    >
      {/* Before Label */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/60 shadow-lg text-foreground transition-all duration-300 transform",
          hideBefore ? "opacity-0 scale-90 translate-x-[-10px]" : "opacity-100 scale-100 translate-x-0"
        )}
      >
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <History className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
        <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase">
          {beforeLabel}
        </span>
      </div>

      {/* Center Metadata Badge (Optional) */}
      {(roomType || style) && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-primary/20 text-xs text-muted-foreground shadow-sm">
          {roomType && <span className="font-medium text-foreground">{roomType}</span>}
          {roomType && style && <span className="text-muted-foreground/40">•</span>}
          {style && <span className="text-primary font-medium">{style}</span>}
        </div>
      )}

      {/* After Label */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md border border-primary/30 shadow-lg transition-all duration-300 transform",
          hideAfter ? "opacity-0 scale-90 translate-x-[10px]" : "opacity-100 scale-100 translate-x-0"
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-primary-foreground/90 animate-spin-slow hidden sm:block" />
        <span className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase">
          {afterLabel}
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
    </div>
  )
}
