import * as React from "react"
import { CollectionStatsData } from "@/lib/collections"
import { Layers, LayoutGrid, Palette, Sparkles } from "lucide-react"

interface CollectionStatsProps {
  stats: CollectionStatsData
}

export function CollectionStats({ stats }: CollectionStatsProps) {
  const items = [
    {
      label: "Design Collections",
      value: stats.totalCollections,
      icon: LayoutGrid,
    },
    {
      label: "Curated Room Projects",
      value: stats.totalProjects,
      icon: Layers,
    },
    {
      label: "Aesthetic Styles",
      value: stats.styleCount,
      icon: Palette,
    },
    {
      label: "Room Categories",
      value: stats.categoryCount,
      icon: Sparkles,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-10">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md text-center transition-all duration-300 hover:border-primary/40 hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {item.value}
            </span>
            <span className="text-xs font-medium text-muted-foreground mt-1">
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
