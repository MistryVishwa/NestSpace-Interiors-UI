"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ComparisonProject } from "@/types/before-after"
import { BeforeAfterSlider } from "./BeforeAfterSlider"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ZoomOut, RotateCcw, Columns2, Sliders, Sparkles, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface FullscreenViewerProps {
  project: ComparisonProject | null
  isOpen: boolean
  onClose: () => void
}

export function FullscreenViewer({ project, isOpen, onClose }: FullscreenViewerProps) {
  const [zoomScale, setZoomScale] = useState<number>(1)
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider")
  const [sliderPosition, setSliderPosition] = useState<number>(50)

  // Reset state when closing or changing project
  useEffect(() => {
    if (isOpen) {
      setZoomScale(1)
      setSliderPosition(50)
      setViewMode("slider")
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, project])

  // ESC key handler to close viewer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !project) return null

  const handleZoomIn = () => setZoomScale((prev) => Math.min(3, prev + 0.5))
  const handleZoomOut = () => setZoomScale((prev) => Math.max(1, prev - 0.5))
  const handleResetZoom = () => setZoomScale(1)

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-modal-title"
    >
      {/* Header Bar */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-border/60 bg-card/60 shrink-0 z-20">
        <div className="flex items-center gap-3 max-w-xl">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 id="fullscreen-modal-title" className="font-serif text-base sm:text-lg font-bold text-foreground truncate">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{project.roomType}</span>
              <span>•</span>
              <span className="text-primary">{project.style}</span>
              {project.location && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    {project.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center p-1 bg-muted/60 rounded-xl border border-border/40">
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                viewMode === "slider" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sliders className="w-3.5 h-3.5" />
              Slider
            </button>
            <button
              type="button"
              onClick={() => setViewMode("side-by-side")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                viewMode === "side-by-side" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Columns2 className="w-3.5 h-3.5" />
              Side-by-Side
            </button>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Close fullscreen modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 relative overflow-auto flex items-center justify-center p-4 sm:p-8">
        <div
          className="w-full max-w-6xl transition-transform duration-200 ease-out my-auto"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: "center center",
          }}
        >
          {viewMode === "slider" ? (
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              roomType={project.roomType}
              style={project.style}
              aspectRatio="aspect-[16/9]"
              initialPosition={sliderPosition}
              onPositionChange={setSliderPosition}
              showControls={false}
              priority
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before Card */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-lg bg-neutral-900 group">
                <Image src={project.beforeImage} alt={`Before ${project.title}`} fill className="object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-foreground">
                  BEFORE
                </div>
              </div>
              {/* After Card */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-primary/40 shadow-lg bg-neutral-900 group">
                <Image src={project.afterImage} alt={`After ${project.title}`} fill className="object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider">
                  AFTER
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Floating Toolbar */}
      <footer className="p-3 sm:p-4 border-t border-border/60 bg-card/80 backdrop-blur-xl shrink-0 z-20 flex flex-wrap items-center justify-between gap-3">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1 hidden sm:inline">Zoom:</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoomScale <= 1}
            className="h-8 w-8 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs font-semibold min-w-[3rem] text-center">{Math.round(zoomScale * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoomScale >= 3}
            className="h-8 w-8 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          {zoomScale > 1 && (
            <Button variant="ghost" size="sm" onClick={handleResetZoom} className="h-8 text-xs rounded-lg">
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Project Description Snippet */}
        <div className="hidden lg:block max-w-md text-xs text-muted-foreground truncate">
          <span className="font-semibold text-foreground mr-1">Designer Note:</span>
          {project.designerNotes}
        </div>

        {/* Controls Info */}
        <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
          <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">ESC</kbd> to exit</span>
        </div>
      </footer>
    </div>
  )
}
