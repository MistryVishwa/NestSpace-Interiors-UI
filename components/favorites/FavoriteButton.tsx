"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/useFavorites"
import type { FavoriteDesign } from "@/types/favorite"

interface FavoriteButtonProps {
  design: FavoriteDesign
  variant?: "icon" | "button" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  showLabel?: boolean
  label?: string
}

export function FavoriteButton({
  design,
  variant = "icon",
  size = "md",
  className,
  showLabel = false,
  label,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isMounted } = useFavorites()
  const active = isMounted && isFavorite(design.id)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(design)
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const buttonSizes = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={active ? `Remove ${design.title} from favorites` : `Add ${design.title} to favorites`}
        aria-pressed={active}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "w-10 h-10 bg-background/80 hover:bg-background backdrop-blur-md shadow-md text-foreground hover:scale-110 active:scale-95",
          active && "text-rose-500 hover:text-rose-600 bg-background/95",
          className
        )}
      >
        <Heart
          className={cn(
            iconSizes[size],
            "transition-all duration-300",
            active ? "fill-rose-500 text-rose-500 scale-110" : "text-foreground/80 hover:text-foreground"
          )}
        />
        {showLabel && (
          <span className="ml-2 font-medium">
            {label || (active ? "Saved" : "Favorite")}
          </span>
        )}
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant={variant === "outline" ? "outline" : "ghost"}
      onClick={handleClick}
      aria-label={active ? `Remove ${design.title} from favorites` : `Add ${design.title} to favorites`}
      aria-pressed={active}
      className={cn(
        "rounded-full transition-all duration-300 group gap-2 cursor-pointer",
        buttonSizes[size],
        active
          ? "border-rose-500/40 text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
          : "hover:bg-muted text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-all duration-300 group-hover:scale-110",
          active ? "fill-rose-500 text-rose-500" : "text-muted-foreground group-hover:text-foreground"
        )}
      />
      <span>{label || (active ? "Saved to Favorites" : "Save Favorite")}</span>
    </Button>
  )
}
