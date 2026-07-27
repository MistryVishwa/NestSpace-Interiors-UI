"use client"

import * as React from "react"
import { FurnitureTemplate } from "@/types/room-planner"
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
  Plus,
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

interface FurnitureItemProps {
  template: FurnitureTemplate
  onAdd: (template: FurnitureTemplate) => void
}

export function FurnitureItem({ template, onAdd }: FurnitureItemProps) {
  const IconComponent = ICON_MAP[template.iconName] || Box

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(template))
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onAdd(template)}
      className="group relative flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex items-center gap-3">
        {/* Color Badge Icon Box */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105"
          style={{ backgroundColor: template.color }}
        >
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Text Info */}
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {template.name}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {template.width}px × {template.height}px
          </span>
        </div>
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onAdd(template)
        }}
        className="w-7 h-7 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors shadow-xs"
        aria-label={`Add ${template.name} to room canvas`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
