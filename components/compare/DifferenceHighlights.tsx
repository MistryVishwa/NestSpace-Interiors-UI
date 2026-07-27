import * as React from "react"
import { Sparkles, Layers, DollarSign, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react"
import { CompareProject, getComparisonDiff } from "@/lib/compareData"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DifferenceHighlightsProps {
  projectA: CompareProject
  projectB: CompareProject
}

export function DifferenceHighlights({ projectA, projectB }: DifferenceHighlightsProps) {
  const diff = React.useMemo(() => {
    return getComparisonDiff(projectA, projectB)
  }, [projectA, projectB])

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Visual & Metric Difference Analysis
          </h2>
          <p className="text-xs text-muted-foreground">
            Summary of key contrasts, shared elements, and spatial efficiency.
          </p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Shared Elements */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Shared Design Elements
            </span>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              {diff.matchingMaterials.length} Common
            </Badge>
          </div>
          {diff.matchingMaterials.length > 0 ? (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Matching material finishes:</p>
              <div className="flex flex-wrap gap-1">
                {diff.matchingMaterials.map((m, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[11px] bg-background/80 text-foreground border border-border/50">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground leading-relaxed">
              No overlapping materials. Each design utilizes a completely distinct palette and material composition.
            </p>
          )}
        </div>

        {/* Card 2: Material & Style Contrast */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Material & Aesthetic Contrast
            </span>
            <Badge variant="outline" className="text-[10px] bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300">
              Distinct
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">{projectA.title}</strong> prioritizes{" "}
            <span className="text-primary font-medium">{projectA.materials.slice(0, 2).join(" & ")}</span>, while{" "}
            <strong className="text-foreground font-semibold">{projectB.title}</strong> features{" "}
            <span className="text-primary font-medium">{projectB.materials.slice(0, 2).join(" & ")}</span>.
          </p>
        </div>

        {/* Card 3: Value & Efficiency Indicator */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Cost & Area Efficiency
            </span>
            <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/30 text-primary">
              Benchmark
            </Badge>
          </div>

          <div className="space-y-1 text-xs">
            {diff.betterValueProject === "equal" ? (
              <p className="text-muted-foreground">Both projects share similar cost per sq ft ratios.</p>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">
                  {diff.betterValueProject === "A" ? projectA.title : projectB.title}
                </strong>{" "}
                delivers higher spatial budget efficiency (
                <span className="font-semibold text-primary">
                  ~${diff.betterValueProject === "A" ? diff.costPerSqFtA : diff.costPerSqFtB} / sq ft
                </span>{" "}
                vs ~${diff.betterValueProject === "A" ? diff.costPerSqFtB : diff.costPerSqFtA} / sq ft).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
