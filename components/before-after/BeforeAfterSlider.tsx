"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ComparisonLabels } from "./ComparisonLabels"
import { ComparisonControls } from "./ComparisonControls"
import { ChevronsLeftRight } from "lucide-react"

export interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  roomType?: string
  style?: string
  aspectRatio?: string
  initialPosition?: number
  onPositionChange?: (position: number) => void
  onToggleFullscreen?: () => void
  showControls?: boolean
  showLabels?: boolean
  className?: string
  altBefore?: string
  altAfter?: string
  priority?: boolean
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  roomType,
  style,
  aspectRatio = "aspect-[16/10]",
  initialPosition = 50,
  onPositionChange,
  onToggleFullscreen,
  showControls = true,
  showLabels = true,
  className,
  altBefore = "Before interior renovation",
  altAfter = "After interior design transformation",
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState<number>(initialPosition)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [prevInitialPosition, setPrevInitialPosition] = useState<number>(initialPosition)
  if (prevInitialPosition !== initialPosition) {
    setPrevInitialPosition(initialPosition)
    if (!isDragging) {
      setPosition(initialPosition)
    }
  }

  const updatePosition = useCallback(
    (newPosition: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(newPosition * 10) / 10))
      setPosition(clamped)
      if (onPositionChange) {
        onPositionChange(clamped)
      }
    },
    [onPositionChange]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.width <= 0) return

      const clientX = event.clientX
      const offsetX = clientX - rect.left
      const percentage = (offsetX / rect.width) * 100
      updatePosition(percentage)
    },
    [updatePosition]
  )

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
    handlePointerMove(event)
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    try {
      if ((event.target as HTMLElement).hasPointerCapture(event.pointerId)) {
        ;(event.target as HTMLElement).releasePointerCapture(event.pointerId)
      }
    } catch {
      // Ignore fallback pointer capture release error if already released
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 1 : 5
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault()
        updatePosition(position - step)
        break
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault()
        updatePosition(position + step)
        break
      case "Home":
        event.preventDefault()
        updatePosition(0)
        break
      case "End":
        event.preventDefault()
        updatePosition(100)
        break
      default:
        break
    }
  }

  // Active images based on flip status
  const currentBefore = isFlipped ? afterImage : beforeImage
  const currentAfter = isFlipped ? beforeImage : afterImage
  const currentBeforeLabel = isFlipped ? afterLabel : beforeLabel
  const currentAfterLabel = isFlipped ? beforeLabel : afterLabel

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      {/* Interactive Canvas Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Before and after image comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation="horizontal"
        onPointerDown={handlePointerDown}
        onPointerMove={isDragging ? handlePointerMove : undefined}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-2xl bg-neutral-900 select-none touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow",
          aspectRatio,
          isDragging ? "cursor-ew-resize" : "cursor-pointer"
        )}
      >
        {/* Underlay Image (BEFORE) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={currentBefore}
            alt={altBefore}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Overlay Image (AFTER) with CSS clip-path */}
        <div
          className="absolute inset-0 w-full h-full transition-none"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <Image
            src={currentAfter}
            alt={altAfter}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Badge Labels Overlay */}
        {showLabels && (
          <ComparisonLabels
            beforeLabel={currentBeforeLabel}
            afterLabel={currentAfterLabel}
            roomType={roomType}
            style={style}
            sliderPosition={position}
          />
        )}

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        />

        {/* Handle Icon Button */}
        <div
          className={cn(
            "absolute top-1/2 z-40 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-background/95 text-foreground shadow-2xl backdrop-blur-md transition-transform duration-150 pointer-events-none",
            "w-10 h-10 sm:w-12 sm:h-12",
            isDragging ? "scale-110 ring-4 ring-primary/40" : "hover:scale-105"
          )}
          style={{ left: `${position}%` }}
        >
          <ChevronsLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
        </div>
      </div>

      {/* Control Toolbar */}
      {showControls && (
        <ComparisonControls
          sliderPosition={position}
          onPositionChange={updatePosition}
          onToggleFullscreen={onToggleFullscreen}
          isFlipped={isFlipped}
          onToggleFlip={() => setIsFlipped((prev) => !prev)}
        />
      )}
    </div>
  )
}
