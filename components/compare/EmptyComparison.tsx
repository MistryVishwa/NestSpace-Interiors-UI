import * as React from "react"
import Image from "next/image"
import { Scale, Sparkles, Plus, ArrowRight, Dices } from "lucide-react"
import { CompareProject, PRESET_COMPARISONS, PresetComparison } from "@/lib/compareData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EmptyComparisonProps {
  projects: CompareProject[]
  projectA: CompareProject | null
  projectB: CompareProject | null
  onSelectProject: (project: CompareProject) => void
  onSelectPreset: (preset: PresetComparison) => void
}

export function EmptyComparison({
  projects,
  projectA,
  projectB,
  onSelectProject,
  onSelectPreset,
}: EmptyComparisonProps) {
  const missingSlot = !projectA ? "A" : "B"

  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner Prompt for Selection */}
      <div className="rounded-3xl border border-dashed border-border/80 bg-card/60 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20 shadow-xs">
          <Scale className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {!projectA && !projectB
              ? "Select Two Designs to Compare"
              : `Select Project ${missingSlot} to Complete Comparison`}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {!projectA && !projectB
              ? "Choose any two interior projects from our portfolio above or pick one of our featured comparison pairings below."
              : `You have selected "${(projectA || projectB)?.title}". Choose a second project for Slot ${missingSlot} to analyze side-by-side differences.`}
          </p>
        </div>
      </div>

      {/* Featured Presets Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Curated Comparison Presets</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Handpicked design matchups comparing distinct architectural styles and room layouts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_COMPARISONS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="group text-left p-5 rounded-3xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2 mb-4">
                <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-semibold">
                  {preset.tag}
                </Badge>
                <h4 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {preset.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <span>Compare Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Select Portfolio Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">
              Pick from Portfolio Projects
            </h3>
            <p className="text-xs text-muted-foreground">
              Click any project to assign it to Slot {missingSlot}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {projects.map((proj) => {
            const isAlreadySelected = projectA?.id === proj.id || projectB?.id === proj.id

            return (
              <div
                key={proj.id}
                className={cn(
                  "group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 flex flex-col",
                  isAlreadySelected
                    ? "border-primary/40 opacity-60 bg-muted/40"
                    : "border-border/80 hover:border-primary/50 hover:shadow-md"
                )}
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={proj.coverImage}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-md text-[10px] font-medium border border-border/40">
                      {proj.roomType}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-foreground line-clamp-1">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {proj.style}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
                    <span className="font-medium">{proj.budgetRange}</span>
                    <Button
                      type="button"
                      disabled={isAlreadySelected}
                      size="sm"
                      onClick={() => onSelectProject(proj)}
                      className={cn(
                        "h-8 text-xs px-3 rounded-xl gap-1 font-semibold",
                        isAlreadySelected
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAlreadySelected ? "Selected" : `Add to ${missingSlot}`}</span>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
