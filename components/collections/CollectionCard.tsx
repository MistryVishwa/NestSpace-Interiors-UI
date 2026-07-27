import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Layers, Sparkles } from "lucide-react"
import { Collection } from "@/lib/collections"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CollectionCardProps {
  collection: Collection
  className?: string
  priority?: boolean
}

export function CollectionCard({
  collection,
  className,
  priority = false,
}: CollectionCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 luxury-card",
        className
      )}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted image-zoom">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground backdrop-blur-md border border-border/50 px-3 py-1 font-medium text-xs shadow-sm"
          >
            {collection.category}
          </Badge>

          {collection.featured && (
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md px-3 py-1 text-xs font-semibold shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>

        {/* Floating Count Badge */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md border border-border/50 shadow-sm">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>{collection.projectCount} Projects</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          {/* Style indicator */}
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            {collection.style} Theme
          </span>

          {/* Collection Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            <Link
              href={`/collections/${collection.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {collection.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Tags & Action Footer */}
        <div className="mt-6 pt-4 border-t border-border/40 flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {collection.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground transition-colors group-hover:bg-muted"
              >
                #{tag}
              </span>
            ))}
            {collection.tags.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                +{collection.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-primary pt-1">
            <span>Explore Collection</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </article>
  )
}
