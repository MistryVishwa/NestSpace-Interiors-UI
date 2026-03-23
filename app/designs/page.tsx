"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, ZoomIn } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining", "Luxury"]

const allDesigns = [
  { id: 1, title: "Contemporary Living Space", category: "Living Room", image: "/images/portfolio-1.jpg", size: "tall" },
  { id: 2, title: "Modern Chef's Kitchen", category: "Kitchen", image: "/images/portfolio-2.jpg", size: "regular" },
  { id: 3, title: "Executive Corner Office", category: "Office", image: "/images/portfolio-3.jpg", size: "wide" },
  { id: 4, title: "Spa-Inspired Bathroom", category: "Bathroom", image: "/images/portfolio-4.jpg", size: "regular" },
  { id: 5, title: "Elegant Dining Room", category: "Dining", image: "/images/portfolio-5.jpg", size: "tall" },
  { id: 6, title: "Luxury Penthouse Suite", category: "Luxury", image: "/images/portfolio-6.jpg", size: "regular" },
  { id: 7, title: "Cozy Master Bedroom", category: "Bedroom", image: "/images/hero-interior.jpg", size: "regular" },
  { id: 8, title: "Creative Studio Space", category: "Office", image: "/images/about-hero.jpg", size: "wide" },
  { id: 9, title: "Minimalist Living Area", category: "Living Room", image: "/images/portfolio-5.jpg", size: "regular" },
  { id: 10, title: "Gourmet Kitchen Island", category: "Kitchen", image: "/images/portfolio-2.jpg", size: "tall" },
  { id: 11, title: "Tranquil Guest Bedroom", category: "Bedroom", image: "/images/portfolio-1.jpg", size: "regular" },
  { id: 12, title: "Modern Powder Room", category: "Bathroom", image: "/images/portfolio-4.jpg", size: "regular" },
  { id: 13, title: "Grand Dining Hall", category: "Dining", image: "/images/portfolio-5.jpg", size: "wide" },
  { id: 14, title: "Private Wine Cellar", category: "Luxury", image: "/images/portfolio-6.jpg", size: "tall" },
  { id: 15, title: "Open Concept Kitchen", category: "Kitchen", image: "/images/portfolio-2.jpg", size: "regular" },
  { id: 16, title: "Home Office Nook", category: "Office", image: "/images/portfolio-3.jpg", size: "regular" },
]

export default function AllDesignsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<{ image: string; title: string; category: string } | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const headerReveal = useScrollReveal()

  const filteredDesigns = activeFilter === "All"
    ? allDesigns
    : allDesigns.filter(design => design.category === activeFilter)

  const handleFilterChange = (category: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFilter(category)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-36 pb-24 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary)_0%,transparent_50%)] opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div 
            ref={headerReveal.ref}
            className={cn(
              "max-w-3xl mx-auto text-center reveal",
              headerReveal.isVisible && "visible"
            )}
          >
            <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Design Gallery
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              All Our Designs
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Explore our complete collection of interior designs across all categories and styles.
            </p>
          </div>
        </div>
      </section>

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
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="masonry-item group cursor-pointer"
                onClick={() => setLightboxImage({ image: design.image, title: design.title, category: design.category })}
              >
                <div 
                  className={cn(
                    "relative rounded-2xl overflow-hidden image-zoom",
                    design.size === "tall" ? "aspect-[3/4]" : design.size === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
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
              Showing {filteredDesigns.length} of {allDesigns.length} designs
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-6xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
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

      <CTASection />
      <Footer />
    </main>
  )
}
