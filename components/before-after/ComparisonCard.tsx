"use client"

import React, { useState } from "react"
import { ComparisonProject } from "@/types/before-after"
import { BeforeAfterSlider } from "./BeforeAfterSlider"
import { Button } from "@/components/ui/button"
import { Maximize2, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react"

interface ComparisonCardProps {
  project: ComparisonProject
  onSelectProject: (project: ComparisonProject) => void
  onOpenFullscreen: (project: ComparisonProject) => void
}

export function ComparisonCard({
  project,
  onSelectProject,
  onOpenFullscreen,
}: ComparisonCardProps) {
  const [sliderPos, setSliderPos] = useState<number>(50)

  return (
    <div className="group relative flex flex-col rounded-3xl bg-card border border-border/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Top Slider Preview */}
      <div className="relative p-2 bg-muted/30 border-b border-border/40">
        <BeforeAfterSlider
          beforeImage={project.beforeImage}
          afterImage={project.afterImage}
          roomType={project.roomType}
          style={project.style}
          aspectRatio="aspect-[16/10]"
          initialPosition={sliderPos}
          onPositionChange={setSliderPos}
          showControls={false}
          showLabels={true}
        />

        {/* Quick Fullscreen Button Overlay */}
        <button
          type="button"
          onClick={() => onOpenFullscreen(project)}
          className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/60 text-foreground opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-md"
          title="Open in Fullscreen"
          aria-label={`Open ${project.title} in fullscreen comparison viewer`}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
        {/* Header Tags & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {project.roomType}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              {project.style}
            </span>
          </div>
          {project.location && (
            <span className="flex items-center gap-1 text-muted-foreground font-medium">
              <MapPin className="w-3 h-3" />
              {project.location}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Key Stats Bar */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-muted/40 border border-border/40 text-center">
            {project.stats.spaceSaved && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Space</p>
                <p className="text-xs font-bold text-foreground">{project.stats.spaceSaved}</p>
              </div>
            )}
            {project.stats.lightIncrease && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Light</p>
                <p className="text-xs font-bold text-primary">{project.stats.lightIncrease}</p>
              </div>
            )}
            {project.stats.satisfactionScore && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Rating</p>
                <p className="text-xs font-bold text-emerald-500">{project.stats.satisfactionScore}</p>
              </div>
            )}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 mt-auto border-t border-border/40">
          {project.duration && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {project.duration}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenFullscreen(project)}
              className="h-9 px-3 rounded-xl border-border/60 text-xs font-semibold hover:bg-muted"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-primary" />
              Fullscreen
            </Button>
            <Button
              size="sm"
              onClick={() => onSelectProject(project)}
              className="h-9 px-3.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              Focus
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
