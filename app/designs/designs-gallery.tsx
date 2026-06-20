"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

export interface DesignItem {
  id: number
  title: string
  category: string
  image: string
  size: string
}

interface DesignsGalleryProps {
  designs: DesignItem[]
  categories: string[]
}

export function DesignsGallery({ designs, categories }: DesignsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const filteredDesigns = activeFilter === "All"
    ? designs
    : designs.filter((design) => design.category === activeFilter)

  const lightboxImage = lightboxIndex !== null ? filteredDesigns[lightboxIndex] : null

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredDesigns.length) % filteredDesigns.length
    )
  }, [filteredDesigns.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredDesigns.length
    )
  }, [filteredDesigns.length])

  // Keyboard navigation: Escape → close, ArrowLeft/Right → prev/next
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      else if (e.key === "ArrowLeft") goToPrev()
      else if (e.key === "ArrowRight") goToNext()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext])

  // Move focus to close button when lightbox opens
  useEffect(() => {
    if (lightboxIndex !== null) {
      closeBtnRef.current?.focus()
    }
  }, [lightboxIndex])

  const handleFilterChange = (category: string) => {
    // Close lightbox if the filtered set changes under us
    setLightboxIndex(null)
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFilter(category)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <>
      {/* Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => handleFilterChange(category)}
                size="sm"
                className={cn(
                  "px-5 h-10 rounded-full text-sm font-medium transition-all duration-300",
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
            {filteredDesigns.map((design, index) => (
              <div
                key={design.id}
                className="masonry-item group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div
                  className={cn(
                    "relative rounded-2xl overflow-hidden image-zoom",
                    design.size === "tall"
                      ? "aspect-3/4"
                      : design.size === "wide"
                        ? "aspect-16/10"
                        : "aspect-4/3"
                  )}
                >
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
                      {design.category}
                    </span>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-primary-foreground font-serif text-xl font-semibold">
                        {design.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <ZoomIn className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-16">
            <span className="inline-block px-6 py-3 rounded-full bg-muted text-muted-foreground text-sm">
              Showing {filteredDesigns.length} of {designs.length} designs
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${lightboxImage.title}`}
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <span className="absolute top-7 left-1/2 -translate-x-1/2 text-background/60 text-sm font-medium select-none">
            {lightboxIndex + 1} / {filteredDesigns.length}
          </span>

          {/* Prev button */}
          <button
            aria-label="Previous image"
            className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); goToPrev() }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            aria-label="Next image"
            className="absolute right-4 sm:right-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); goToNext() }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full aspect-video rounded-2xl overflow-hidden">
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-20 left-0 right-0 text-center">
              <span className="text-background/60 text-sm font-medium uppercase tracking-wider">
                {lightboxImage.category}
              </span>
              <h3 className="text-background font-serif text-2xl font-semibold mt-1">
                {lightboxImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
