"use client"

import React, { useState } from "react"
import { PRESET_MOOD_BOARDS } from "@/lib/moodBoardData"
import { PresetBoard } from "@/types/mood-board"
import { Edit3, Check, Sparkles, Paintbrush, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface BoardControlsProps {
  boardTitle: string
  boardDescription: string
  backgroundColor: string
  onUpdateTitle: (title: string, desc: string) => void
  onUpdateBgColor: (color: string) => void
  onLoadPreset: (preset: PresetBoard) => void
}

export const BoardControls: React.FC<BoardControlsProps> = ({
  boardTitle,
  boardDescription,
  backgroundColor,
  onUpdateTitle,
  onUpdateBgColor,
  onLoadPreset,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(boardTitle)
  const [desc, setDesc] = useState(boardDescription)
  const [showPresetMenu, setShowPresetMenu] = useState(false)

  const handleSaveTitle = () => {
    setIsEditing(false)
    onUpdateTitle(title, desc)
  }

  const bgOptions = [
    { label: "Warm Ivory", value: "#FDFBF7" },
    { label: "Pure White", value: "#FFFFFF" },
    { label: "Soft Cream", value: "#F5F0EB" },
    { label: "Light Taupe", value: "#EAE7E1" },
    { label: "Slate Noir", value: "#18181B" },
  ]

  return (
    <div className="w-full bg-card border-b border-border px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      {/* Title & Description Editor */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2 max-w-xl">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Board Title"
              className="px-2.5 py-1 bg-muted border border-input rounded-md text-sm font-serif font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary flex-1"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief description..."
              className="px-2.5 py-1 bg-muted border border-input rounded-md text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary flex-1"
            />
            <button
              type="button"
              onClick={handleSaveTitle}
              className="p-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group">
            <h2 className="text-base md:text-lg font-serif font-bold text-foreground truncate">
              {boardTitle || "Untitled Mood Board"}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1 text-muted-foreground hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity"
              title="Edit Board Title"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            {boardDescription && (
              <span className="hidden lg:inline text-xs text-muted-foreground truncate border-l border-border pl-2.5">
                {boardDescription}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Preset Loader & Background Selector */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        {/* Canvas Background Swatches */}
        <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-lg border border-border">
          <Paintbrush className="w-3.5 h-3.5 text-muted-foreground ml-1" />
          <div className="flex items-center gap-1">
            {bgOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdateBgColor(opt.value)}
                className={cn(
                  "w-4 h-4 rounded-full border border-border transition-transform",
                  backgroundColor === opt.value
                    ? "ring-2 ring-primary ring-offset-1 scale-110"
                    : "hover:scale-105 opacity-80"
                )}
                style={{ backgroundColor: opt.value }}
                title={opt.label}
              />
            ))}
          </div>
        </div>

        {/* Preset Boards Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresetMenu(!showPresetMenu)}
            className="px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Preset Board</span>
          </button>

          {showPresetMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-popover border border-border rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 block">
                Inspirational Preset Boards
              </span>
              <div className="space-y-1 mt-1">
                {PRESET_MOOD_BOARDS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      onLoadPreset(preset)
                      setShowPresetMenu(false)
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-accent hover:text-accent-foreground text-xs transition-colors flex items-start gap-2 group"
                  >
                    <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {preset.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
