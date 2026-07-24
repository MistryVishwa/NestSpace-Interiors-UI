"use client"

import * as React from "react"
import { 
  Palette, 
  Home, 
  Sparkles, 
  DollarSign, 
  Maximize2, 
  Package, 
  Armchair, 
  Award, 
  Clock, 
  User, 
  Filter,
  CheckCircle2
} from "lucide-react"
import { CompareProject, getComparisonDiff } from "@/lib/compareData"
import { FeatureRow } from "./FeatureRow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ComparisonTableProps {
  projectA: CompareProject
  projectB: CompareProject
  differencesOnly?: boolean
  onToggleDifferencesOnly?: () => void
}

export function ComparisonTable({
  projectA,
  projectB,
  differencesOnly = false,
  onToggleDifferencesOnly,
}: ComparisonTableProps) {
  const diff = React.useMemo(() => {
    return getComparisonDiff(projectA, projectB)
  }, [projectA, projectB])

  return (
    <div className="space-y-6">
      {/* Header & Filter Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border/80 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <span>Detailed Specifications Comparison</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Side-by-side evaluation of design characteristics, materials, and features.
          </p>
        </div>

        {onToggleDifferencesOnly && (
          <Button
            type="button"
            variant={differencesOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleDifferencesOnly}
            className={cn(
              "text-xs font-semibold rounded-xl gap-2 shrink-0 transition-all",
              differencesOnly
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border-border/80 hover:border-primary hover:text-primary"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{differencesOnly ? "Showing Differences Only" : "Filter Differences Only"}</span>
          </Button>
        )}
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto rounded-3xl border border-border/80 bg-card shadow-sm">
        <table className="w-full text-left border-collapse min-w-[640px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-border/80 bg-muted/40">
              <th className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/4 sm:w-1/5">
                Specification
              </th>
              <th className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-primary w-3/8 sm:w-2/5 border-l border-border/40">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">
                    A
                  </span>
                  <span className="truncate">{projectA.title}</span>
                </div>
              </th>
              <th className="py-4 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-accent-foreground w-3/8 sm:w-2/5 border-l border-border/40">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-foreground flex items-center justify-center font-mono text-xs font-bold">
                    B
                  </span>
                  <span className="truncate">{projectB.title}</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Section 1: Overview & Specs */}
            <tr className="bg-muted/30 border-b border-border/60">
              <td colSpan={3} className="py-2.5 px-4 sm:px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Overview & Dimensions
              </td>
            </tr>

            <FeatureRow
              label="Room Type"
              icon={<Home className="w-4 h-4" />}
              valueA={projectA.roomType}
              valueB={projectB.roomType}
              isMatch={diff.sameRoomType}
              differencesOnly={differencesOnly}
            />

            <FeatureRow
              label="Design Style"
              icon={<Sparkles className="w-4 h-4" />}
              valueA={projectA.style}
              valueB={projectB.style}
              isMatch={diff.sameStyle}
              differencesOnly={differencesOnly}
            />

            <FeatureRow
              label="Budget Range"
              icon={<DollarSign className="w-4 h-4" />}
              valueA={projectA.budgetRange}
              valueB={projectB.budgetRange}
              isMatch={projectA.budgetRange === projectB.budgetRange}
              differencesOnly={differencesOnly}
            />

            <FeatureRow
              label="Cost per Sq Ft"
              icon={<DollarSign className="w-4 h-4" />}
              valueA={`~$${diff.costPerSqFtA} / sq ft`}
              valueB={`~$${diff.costPerSqFtB} / sq ft`}
              isMatch={diff.costPerSqFtA === diff.costPerSqFtB}
              advantage={diff.betterValueProject === "equal" ? null : diff.betterValueProject}
              advantageNote="Higher Cost Efficiency"
              differencesOnly={differencesOnly}
              description="Estimated budget divided by space area"
            />

            <FeatureRow
              label="Total Area"
              icon={<Maximize2 className="w-4 h-4" />}
              valueA={projectA.area}
              valueB={projectB.area}
              isMatch={projectA.areaSqFt === projectB.areaSqFt}
              advantage={projectA.areaSqFt > projectB.areaSqFt ? "A" : projectB.areaSqFt > projectA.areaSqFt ? "B" : null}
              advantageNote="Larger Footprint"
              differencesOnly={differencesOnly}
            />

            <FeatureRow
              label="Timeline / Duration"
              icon={<Clock className="w-4 h-4" />}
              valueA={projectA.duration}
              valueB={projectB.duration}
              isMatch={projectA.duration === projectB.duration}
              differencesOnly={differencesOnly}
            />

            <FeatureRow
              label="Lead Designer"
              icon={<User className="w-4 h-4" />}
              valueA={projectA.designer}
              valueB={projectB.designer}
              isMatch={projectA.designer === projectB.designer}
              differencesOnly={differencesOnly}
            />

            {/* Section 2: Materials & Palette */}
            <tr className="bg-muted/30 border-b border-border/60">
              <td colSpan={3} className="py-2.5 px-4 sm:px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Materials & Color Palette
              </td>
            </tr>

            <FeatureRow
              label="Color Swatches"
              icon={<Palette className="w-4 h-4" />}
              type="color-palette"
              valueA={projectA.colorPalette}
              valueB={projectB.colorPalette}
              isMatch={false}
              differencesOnly={differencesOnly}
              description="Curated color tones and accents"
            />

            <FeatureRow
              label="Primary Materials"
              icon={<Package className="w-4 h-4" />}
              type="badge-list"
              valueA={projectA.materials}
              valueB={projectB.materials}
              isMatch={diff.matchingMaterials.length === Math.max(projectA.materials.length, projectB.materials.length)}
              differencesOnly={differencesOnly}
              description="Surface finishes, woods, and metals"
            />

            {/* Section 3: Furniture & Features */}
            <tr className="bg-muted/30 border-b border-border/60">
              <td colSpan={3} className="py-2.5 px-4 sm:px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Furniture & Design Features
              </td>
            </tr>

            <FeatureRow
              label="Featured Furniture"
              icon={<Armchair className="w-4 h-4" />}
              type="bullet-list"
              valueA={projectA.furniture}
              valueB={projectB.furniture}
              isMatch={false}
              differencesOnly={differencesOnly}
              description="Key statement pieces and seating"
            />

            <FeatureRow
              label="Key Highlights"
              icon={<Award className="w-4 h-4" />}
              type="highlight-list"
              valueA={projectA.highlights}
              valueB={projectB.highlights}
              isMatch={false}
              differencesOnly={differencesOnly}
              description="Special architectural or smart home features"
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
