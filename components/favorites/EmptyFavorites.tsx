"use client"

import Link from "next/link"
import { Heart, Compass, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyFavoritesProps {
  hasFilterActive?: boolean
  onResetFilters?: () => void
}

export function EmptyFavorites({ hasFilterActive = false, onResetFilters }: EmptyFavoritesProps) {
  if (hasFilterActive) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-muted/80 flex items-center justify-center mb-6 shadow-inner">
          <Compass className="h-10 w-10 text-muted-foreground animate-spin-slow" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          No matching designs found
        </h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          We couldn&apos;t find any saved favorite designs matching your active search or filter criteria.
        </p>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="outline" className="rounded-full px-6">
            Reset Search Filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-28 px-6 text-center max-w-lg mx-auto">
      {/* Decorative Illustration */}
      <div className="relative mb-8">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-br from-primary/20 via-primary/5 to-transparent flex items-center justify-center shadow-lg border border-primary/20">
          <Heart className="h-12 w-12 text-primary stroke-[1.5]" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 animate-bounce">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
        No favorite designs yet
      </h2>

      <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-md">
        Bookmark your favorite living rooms, kitchens, offices, and luxury spaces while browsing our portfolio. They will appear here for easy reference.
      </p>

      <Button
        asChild
        size="lg"
        className="rounded-full h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 font-medium"
      >
        <Link href="/portfolio" className="inline-flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Explore Portfolio</span>
        </Link>
      </Button>
    </div>
  )
}
