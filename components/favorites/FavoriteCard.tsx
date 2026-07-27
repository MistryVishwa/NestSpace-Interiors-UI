"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Trash2, Tag, Home, Sparkles, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { FavoriteDesign } from "@/types/favorite"
import { RemoveFavoriteDialog } from "./RemoveFavoriteDialog"

interface FavoriteCardProps {
  design: FavoriteDesign
  onRemove: (id: string) => void
}

export function FavoriteCard({ design, onRemove }: FavoriteCardProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
        {/* Cover Image Header */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image
            src={design.coverImage || "/images/portfolio-1.jpg"}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Room & Style Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md text-foreground shadow-xs">
              <Home className="h-3 w-3 text-primary" />
              {design.roomType}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground shadow-xs">
              <Sparkles className="h-3 w-3" />
              {design.style}
            </span>
          </div>

          {/* Quick Remove Button Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={() => setShowRemoveModal(true)}
              aria-label={`Remove ${design.title} from favorites`}
              className="w-9 h-9 rounded-full bg-background/80 hover:bg-rose-500 text-foreground hover:text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Overlay Title on Image */}
          <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
            <h3 className="font-serif text-xl font-bold line-clamp-1 group-hover:text-primary-foreground transition-colors">
              {design.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {design.description}
            </p>

            {/* Meta attributes */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
              {design.budgetRange && (
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <DollarSign className="h-3.5 w-3.5 text-primary" />
                  <span>{design.budgetRange}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{design.style} Interior</span>
              </div>
            </div>
          </div>

          {/* Card Footer CTA */}
          <div className="pt-3 flex items-center justify-between gap-2">
            <Link
              href={`/portfolio/${design.slug}`}
              className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 tracking-wide uppercase group/link"
            >
              <span>View Project</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRemoveModal(true)}
              className="text-xs text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg px-2.5 h-8"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <RemoveFavoriteDialog
        open={showRemoveModal}
        onOpenChange={setShowRemoveModal}
        onConfirm={() => onRemove(design.id)}
        title={`Remove "${design.title}"?`}
        description="Are you sure you want to remove this design from your saved favorites list?"
        confirmText="Remove"
      />
    </>
  )
}
