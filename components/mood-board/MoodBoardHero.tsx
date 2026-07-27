"use client"

import React from "react"
import { Sparkles, LayoutGrid, Palette, Download, Layers } from "lucide-react"

interface MoodBoardHeroProps {
  onStartNew?: () => void
  onExplorePresets?: () => void
}

export const MoodBoardHero: React.FC<MoodBoardHeroProps> = ({
  onStartNew,
  onExplorePresets,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background py-12 md:py-16">
      {/* Decorative Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NestSpace Interior Mood Board Builder</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-foreground mb-4 leading-tight">
            Curate Your Spatial <span className="text-gradient">Inspiration</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            Collect, compose, and visualize materials, textures, furniture pieces, and custom color palettes in a freeform drag-and-drop workspace.
          </p>

          {/* Feature Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-lg text-left mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Freeform Canvas</h4>
                <p className="text-[11px] text-muted-foreground">Drag, resize & layer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Material Library</h4>
                <p className="text-[11px] text-muted-foreground">Swatches & textures</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Auto-Save</h4>
                <p className="text-[11px] text-muted-foreground">Saved locally</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">High-Res Export</h4>
                <p className="text-[11px] text-muted-foreground">PNG & PDF export</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
