"use client"

import type { FavoriteDesign } from "@/types/favorite"
import { FavoriteCard } from "./FavoriteCard"

interface FavoritesGridProps {
  favorites: FavoriteDesign[]
  onRemove: (id: string) => void
}

export function FavoritesGrid({ favorites, onRemove }: FavoritesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {favorites.map((design) => (
        <div key={design.id} className="h-full">
          <FavoriteCard design={design} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}
