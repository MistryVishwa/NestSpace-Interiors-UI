"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining", "Luxury"]

const allDesigns = [
  {
    id: 1,
    title: "Contemporary Living Space",
    category: "Living Room",
    image: "/images/portfolio-1.jpg",
  },
  {
    id: 2,
    title: "Modern Chef's Kitchen",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: 3,
    title: "Executive Corner Office",
    category: "Office",
    image: "/images/portfolio-3.jpg",
  },
  {
    id: 4,
    title: "Spa-Inspired Bathroom",
    category: "Bathroom",
    image: "/images/portfolio-4.jpg",
  },
  {
    id: 5,
    title: "Elegant Dining Room",
    category: "Dining",
    image: "/images/portfolio-5.jpg",
  },
  {
    id: 6,
    title: "Luxury Penthouse Suite",
    category: "Luxury",
    image: "/images/portfolio-6.jpg",
  },
  {
    id: 7,
    title: "Cozy Master Bedroom",
    category: "Bedroom",
    image: "/images/hero-interior.jpg",
  },
  {
    id: 8,
    title: "Creative Studio Space",
    category: "Office",
    image: "/images/about-hero.jpg",
  },
  {
    id: 9,
    title: "Minimalist Living Area",
    category: "Living Room",
    image: "/images/portfolio-5.jpg",
  },
  {
    id: 10,
    title: "Gourmet Kitchen Island",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: 11,
    title: "Tranquil Guest Bedroom",
    category: "Bedroom",
    image: "/images/portfolio-1.jpg",
  },
  {
    id: 12,
    title: "Modern Powder Room",
    category: "Bathroom",
    image: "/images/portfolio-4.jpg",
  },
  {
    id: 13,
    title: "Grand Dining Hall",
    category: "Dining",
    image: "/images/portfolio-5.jpg",
  },
  {
    id: 14,
    title: "Private Wine Cellar",
    category: "Luxury",
    image: "/images/portfolio-6.jpg",
  },
  {
    id: 15,
    title: "Open Concept Kitchen",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: 16,
    title: "Home Office Nook",
    category: "Office",
    image: "/images/portfolio-3.jpg",
  },
]

export default function AllDesignsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredDesigns = activeFilter === "All"
    ? allDesigns
    : allDesigns.filter(design => design.category === activeFilter)

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Design Gallery
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              All Our Designs
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our complete collection of interior designs across all categories and styles.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                size="sm"
                className={cn(
                  "px-4",
                  activeFilter === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary"
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredDesigns.map((design, index) => (
              <div
                key={design.id}
                className={cn(
                  "break-inside-avoid mb-4 group cursor-pointer",
                  index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                )}
                onClick={() => setLightboxImage(design.image)}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">
                      {design.category}
                    </span>
                    <h3 className="text-primary-foreground font-serif text-xl font-semibold">
                      {design.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-12 text-muted-foreground">
            Showing {filteredDesigns.length} of {allDesigns.length} designs
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background/80 hover:text-background transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Full size design"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <CTASection />
      <Footer />
    </main>
  )
}
