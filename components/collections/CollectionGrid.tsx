import * as React from "react"
import { Collection } from "@/lib/collections"
import { CollectionCard } from "./CollectionCard"
import { cn } from "@/lib/utils"

interface CollectionGridProps {
  collections: Collection[]
  className?: string
}

export function CollectionGrid({ collections, className }: CollectionGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10",
        className
      )}
    >
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          priority={index < 3}
        />
      ))}
    </div>
  )
}
