"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { SearchX, RotateCcw } from "lucide-react"

interface EmptyComparisonProps {
  onResetFilters: () => void
  searchQuery?: string
}

export function EmptyComparison({ onResetFilters, searchQuery }: EmptyComparisonProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 sm:p-12 my-8 rounded-3xl bg-card border border-dashed border-border/80 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
        No Comparison Projects Found
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        {searchQuery ? (
          <>
            We couldn&apos;t find any design transformations matching &quot;
            <span className="font-semibold text-foreground">{searchQuery}</span>
            &quot;. Try adjusting your search query or room filter.
          </>
        ) : (
          "No projects match your current filter selections. Please select another room type or design style."
        )}
      </p>
      <Button
        onClick={onResetFilters}
        className="h-10 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold text-sm"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  )
}
