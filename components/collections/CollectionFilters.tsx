"use client"

import * as React from "react"
import { Filter, SlidersHorizontal, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CollectionFiltersProps {
  categories: string[]
  styles: string[]
  selectedCategory: string | null
  selectedStyle: string | null
  onSelectCategory: (category: string | null) => void
  onSelectStyle: (style: string | null) => void
  onResetFilters: () => void
  totalResultsCount: number
}

export function CollectionFilters({
  categories,
  styles,
  selectedCategory,
  selectedStyle,
  onSelectCategory,
  onSelectStyle,
  onResetFilters,
  totalResultsCount,
}: CollectionFiltersProps) {
  const hasActiveFilters = selectedCategory !== null || selectedStyle !== null

  return (
    <div className="space-y-6 bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filter Collections</span>
          <Badge variant="outline" className="ml-2 font-mono text-xs">
            {totalResultsCount} Results
          </Badge>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs text-muted-foreground hover:text-primary h-8 px-2"
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Category Chips */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Room Category
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              selectedCategory === null
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-foreground border-border/80 hover:bg-muted hover:border-border"
            )}
          >
            {selectedCategory === null && <Check className="h-3 w-3" />}
            All Categories
          </button>

          {categories.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(isSelected ? null : category)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-foreground border-border/80 hover:bg-muted hover:border-border"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Style Chips */}
      <div className="space-y-2.5 pt-2 border-t border-border/40">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Design Style
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectStyle(null)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              selectedStyle === null
                ? "bg-primary/90 text-primary-foreground border-primary shadow-sm"
                : "bg-background text-foreground border-border/80 hover:bg-muted hover:border-border"
            )}
          >
            {selectedStyle === null && <Check className="h-3 w-3" />}
            All Styles
          </button>

          {styles.map((style) => {
            const isSelected = selectedStyle === style
            return (
              <button
                key={style}
                type="button"
                onClick={() => onSelectStyle(isSelected ? null : style)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "bg-primary/90 text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-foreground border-border/80 hover:bg-muted hover:border-border"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {style}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
