"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export interface PortfolioItem {
  id: string
  title: string
  category: string
  location: string
  image: string
  description: string
  size: string
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
  categories: string[]
}

export function PortfolioGallery({ items, categories }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(item => item.category === activeFilter)

  const handleFilterChange = (category: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFilter(category)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onClick={() => handleFilterChange(category)}
              className={cn(
                "px-6 h-11 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div 
          className={cn(
            "masonry-grid transition-opacity duration-200",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          {filteredItems.map((item, index) => (
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
        <div className="text-center mt-20">
          <Button
            size="lg"
            className="h-14 px-10 rounded-full border border-primary/40 bg-secondary/40 text-foreground backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_14px_40px_rgba(201,138,63,0.28)] hover:-translate-y-0.5"
          >
            Load More Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
