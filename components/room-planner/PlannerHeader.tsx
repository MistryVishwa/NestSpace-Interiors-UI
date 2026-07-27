"use client"

import * as React from "react"
import { RoomType } from "@/types/room-planner"
import { ROOM_PRESETS } from "@/lib/roomPlannerData"
import { LayoutGrid, Sparkles, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PlannerHeaderProps {
  roomType: RoomType
  onRoomTypeChange: (type: RoomType) => void
  onToggleMobileSidebar?: () => void
}

export function PlannerHeader({
  roomType,
  onRoomTypeChange,
  onToggleMobileSidebar,
}: PlannerHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/80 backdrop-blur-md border border-border/80 rounded-2xl p-4 sm:p-6 shadow-sm mb-6">
      {/* Title & Badge */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            Interactive Room Planner
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3" />
            2D Canvas
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Drag, resize, rotate, and arrange virtual furniture to experiment with your room layout.
        </p>
      </div>

      {/* Right Controls: Room Type Dropdown & Mobile Toggle */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleMobileSidebar}
            className="lg:hidden gap-2 rounded-xl border-border text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Furniture Catalog</span>
          </Button>
        )}

        <div className="flex items-center gap-2">
          <label htmlFor="room-preset-select" className="text-xs font-medium text-muted-foreground hidden sm:block whitespace-nowrap">
            Room Type:
          </label>
          <Select
            value={roomType}
            onValueChange={(val) => onRoomTypeChange(val as RoomType)}
          >
            <SelectTrigger
              id="room-preset-select"
              aria-label="Select room type preset"
              className="w-44 h-10 rounded-xl bg-background border-border text-foreground text-sm font-medium focus:ring-2 focus:ring-primary"
            >
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border bg-popover">
              {Object.values(ROOM_PRESETS).map((preset) => (
                <SelectItem key={preset.type} value={preset.type} className="text-sm font-medium">
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
