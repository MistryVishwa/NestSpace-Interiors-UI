"use client"

import { useFavorites } from "@/hooks/useFavorites"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoritesCounterProps {
  className?: string
  showIcon?: boolean
}

export function FavoritesCounter({ className, showIcon = true }: FavoritesCounterProps) {
  const { favoriteCount, isMounted } = useFavorites()
  const count = isMounted ? favoriteCount : 0

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase shadow-xs",
        className
      )}
      aria-label={`${count} favorite designs saved`}
    >
      {showIcon && <Heart className="h-3.5 w-3.5 fill-primary text-primary animate-pulse" />}
      <span>
        {count} {count === 1 ? "Saved Design" : "Saved Designs"}
      </span>
    </div>
  )
}
