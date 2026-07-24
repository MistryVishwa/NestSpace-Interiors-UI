"use client"

import React from "react"
import { Sparkles, LayoutGrid, Plus, Palette, Layers } from "lucide-react"
import { PRESET_MOOD_BOARDS } from "@/lib/moodBoardData"
import { PresetBoard } from "@/types/mood-board"

interface EmptyBoardProps {
  onLoadPreset: (preset: PresetBoard) => void
  onOpenSidebar?: () => void
}

export const EmptyBoard: React.FC<EmptyBoardProps> = ({
  onLoadPreset,
  onOpenSidebar,
}) => {
  return (
    <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center p-8 text-center bg-card/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-border/80 my-auto">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 animate-float shadow-inner">
        <LayoutGrid className="w-8 h-8" />
      </div>

      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
        Your Canvas is Ready
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        Start by selecting materials, color swatches, textures, and furniture references from the sidebar, or load one of our curated design presets.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Browse Asset Library</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onLoadPreset(PRESET_MOOD_BOARDS[0])}
          className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent hover:text-accent-foreground text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Load Japandi Preset</span>
        </button>
      </div>

      {/* Preset Quick Chips */}
      <div className="mt-8 pt-6 border-t border-border/60 max-w-lg w-full">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
          Popular Inspirations
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {PRESET_MOOD_BOARDS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLoadPreset(preset)}
              className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground text-xs font-medium flex items-center gap-1.5 transition-colors border border-border/40"
            >
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
