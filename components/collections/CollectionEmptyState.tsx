import * as React from "react"
import { SearchX, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollectionEmptyStateProps {
  searchQuery: string
  selectedCategory: string | null
  selectedStyle: string | null
  onReset: () => void
}

export function CollectionEmptyState({
  searchQuery,
  selectedCategory,
  selectedStyle,
  onReset,
}: CollectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl border border-dashed border-border/80 bg-card/40 my-8">
      <div className="w-16 h-16 rounded-2xl bg-muted/80 text-muted-foreground flex items-center justify-center mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
        No Collections Found
      </h3>

      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        We couldn&apos;t find any design collections matching your criteria
        {searchQuery && (
          <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span>
        )}
        {selectedCategory && (
          <span> in category <strong className="text-foreground">&quot;{selectedCategory}&quot;</strong></span>
        )}
        {selectedStyle && (
          <span> with style <strong className="text-foreground">&quot;{selectedStyle}&quot;</strong></span>
        )}.
      </p>

      <Button
        onClick={onReset}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md rounded-xl"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Search &amp; Filters
      </Button>
    </div>
  )
}
