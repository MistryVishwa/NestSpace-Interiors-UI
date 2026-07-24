import * as React from "react"
import { MousePointerClick, Plus, Sparkles } from "lucide-react"

interface EmptyPlannerProps {
  onOpenCatalog?: () => void
}

export function EmptyPlanner({ onOpenCatalog }: EmptyPlannerProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 animate-pulse">
        <MousePointerClick className="h-7 w-7" />
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-1">
        Your Room Canvas is Empty
      </h3>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-4 leading-relaxed">
        Select furniture items from the sidebar catalog to start arranging your room layout.
      </p>

      {onOpenCatalog && (
        <button
          type="button"
          onClick={onOpenCatalog}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Browse Furniture Catalog</span>
        </button>
      )}
    </div>
  )
}
