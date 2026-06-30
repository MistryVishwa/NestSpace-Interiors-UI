"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Search } from "lucide-react"
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RecentlyViewedStrip } from "./recently-viewed-strip"

const ITEMS_PER_PAGE = 4

export interface PortfolioItem {
  id: string
  title: string
  category: string
  location: string
  date: string
  image: string
  description: string
  size: string
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
  categories: string[]
}

export function PortfolioGallery({ items, categories }: PortfolioGalleryProps) {
  const {
    category,
    year,
    city,
    uniqueYears,
    uniqueCities,
    filteredItems,
    isFiltered,
    setCategory,
    setYear,
    setCity,
    clearFilters,
  } = usePortfolioFilters(items)

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = (type: "category" | "year" | "city", value: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (type === "category") setCategory(value)
      else if (type === "year") setYear(value)
      else if (type === "city") setCity(value)
      setVisibleCount(ITEMS_PER_PAGE)
      setIsTransitioning(false)
    }, 200)
  }

  const handleClearFilters = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      clearFilters()
      setVisibleCount(ITEMS_PER_PAGE)
      setIsTransitioning(false)
    }, 200)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Recently Viewed Strip */}
        <RecentlyViewedStrip allItems={items} />

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border/40">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                onClick={() => handleFilterChange("category", cat)}
                className={cn(
                  "px-5 h-10 rounded-full text-sm font-medium transition-all duration-300",
                  category === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/15"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Year:</span>
              <Select value={year} onValueChange={(val) => handleFilterChange("year", val)}>
                <SelectTrigger className="w-[125px] h-10 rounded-xl bg-muted/50 border-border/40 text-sm focus:ring-1 focus:ring-primary/25 hover:bg-muted/80 transition-colors">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/40">
                  {uniqueYears.map((y) => (
                    <SelectItem key={y} value={y} className="rounded-lg">
                      {y === "All" ? "All Years" : y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">City:</span>
              <Select value={city} onValueChange={(val) => handleFilterChange("city", val)}>
                <SelectTrigger className="w-[145px] h-10 rounded-xl bg-muted/50 border-border/40 text-sm focus:ring-1 focus:ring-primary/25 hover:bg-muted/80 transition-colors">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/40">
                  {uniqueCities.map((c) => (
                    <SelectItem key={c} value={c} className="rounded-lg">
                      {c === "All" ? "All Cities" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Link */}
            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors ml-2 underline underline-offset-4 focus:outline-none cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{visibleItems.length}</span> of{" "}
            <span className="font-medium text-foreground">{filteredItems.length}</span> project{filteredItems.length !== 1 && "s"}
          </p>
        </div>

        {/* Masonry Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center w-full">
            <div className="rounded-full bg-muted p-5 mb-2">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">No projects found</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              No projects match your active filters. Try changing your category, year, or city.
            </p>
            <Button onClick={handleClearFilters} variant="outline" className="mt-2 rounded-full">
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div 
              className={cn(
                "masonry-grid transition-opacity duration-200",
                isTransitioning ? "opacity-0" : "opacity-100"
              )}
            >
              {visibleItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.id}`}
                  className="masonry-item block group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div 
                    className={cn(
                      "relative rounded-2xl overflow-hidden image-zoom",
                      item.size === "tall" ? "aspect-3/4" : "aspect-4/3"
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      style={{ viewTransitionName: `project-${item.id}` } as React.CSSProperties}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Content on Hover */}
                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">
                        {item.category} — {item.location}
                      </span>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-primary-foreground font-serif text-2xl lg:text-3xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-primary-foreground/70 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Default Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-foreground/70 to-transparent group-hover:opacity-0 transition-opacity duration-500">
                      <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-primary-foreground font-medium text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-20">
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  className="h-14 px-10 rounded-full border border-primary/40 bg-secondary/40 text-foreground backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_14px_40px_rgba(201,138,63,0.28)] hover:-translate-y-0.5"
                >
                  Load More Projects
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
