"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"
import { type PortfolioItem } from "./portfolio-gallery"

interface RecentlyViewedStripProps {
  allItems: PortfolioItem[]
}

/**
 * Horizontal scroll strip showing up to 4 recently viewed portfolio
 * projects, read from localStorage. Hidden on first visit (< 2 items)
 * and hidden server-side to avoid hydration mismatch.
 */
export function RecentlyViewedStrip({ allItems }: RecentlyViewedStripProps) {
  const { getRecentlyViewed } = useRecentlyViewed()
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setRecentIds(getRecentlyViewed())
    setMounted(true)
  }, [getRecentlyViewed])

  // Don't render until client-side hydration is complete
  if (!mounted) return null

  const recentItems = recentIds
    .map((id) => allItems.find((item) => item.id === id))
    .filter((item): item is PortfolioItem => item !== undefined)

  // Need at least 2 items for the strip to be useful
  if (recentItems.length < 2) return null

  return (
    <div className="mb-12 animate-in fade-in slide-in-from-top-2 duration-500">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
          <Clock className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
          Recently Viewed
        </h2>
        <div className="flex-1 h-px bg-border/50 ml-2" />
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
        {recentItems.map((item, index) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.id}`}
            className="group relative shrink-0 w-44 sm:w-52 rounded-xl overflow-hidden snap-start
                       ring-1 ring-border/40 hover:ring-primary/40 transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 176px, 208px"
              />

              {/* Gradient overlay — always visible at bottom, stronger on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent transition-opacity duration-300" />

              {/* Arrow icon on hover */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
              </div>

              {/* Title — always shown at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="block text-[10px] font-medium text-primary-foreground/60 uppercase tracking-wider mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-medium text-sm leading-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
