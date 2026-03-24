"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const categories = ["All", "Home", "Office", "Kitchen", "Luxury"]

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    location: "Manhattan, NY",
    image: "/images/portfolio-1.jpg",
    description: "A contemporary living space featuring clean lines and natural materials.",
    size: "tall",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    location: "Beverly Hills, CA",
    image: "/images/portfolio-2.jpg",
    description: "A stunning modular kitchen with premium finishes and smart storage.",
    size: "regular",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    location: "Chicago, IL",
    image: "/images/portfolio-3.jpg",
    description: "An executive workspace designed for productivity and elegance.",
    size: "regular",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    location: "Miami, FL",
    image: "/images/portfolio-4.jpg",
    description: "A spa-like bathroom retreat with marble finishes and ambient lighting.",
    size: "tall",
  },
  {
    id: "elegant-dining",
    title: "Elegant Dining",
    category: "Home",
    location: "San Francisco, CA",
    image: "/images/portfolio-5.jpg",
    description: "A formal dining room designed for memorable gatherings.",
    size: "regular",
  },
  {
    id: "penthouse-living",
    title: "Penthouse Living",
    category: "Luxury",
    location: "New York, NY",
    image: "/images/portfolio-6.jpg",
    description: "A luxurious penthouse with panoramic city views.",
    size: "regular",
  },
  {
    id: "cozy-bedroom",
    title: "Cozy Bedroom",
    category: "Home",
    location: "Seattle, WA",
    image: "/images/hero-interior.jpg",
    description: "A serene bedroom retreat with warm textures and soft lighting.",
    size: "tall",
  },
  {
    id: "modern-workspace",
    title: "Modern Workspace",
    category: "Office",
    location: "Austin, TX",
    image: "/images/about-hero.jpg",
    description: "A collaborative open office designed for innovation.",
    size: "regular",
  },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const headerReveal = useScrollReveal()

  const filteredItems = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter)

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
              Our Portfolio
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Explore Our Projects
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Browse through our collection of completed projects spanning residential, commercial, and luxury spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
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
                    item.size === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/70 to-transparent group-hover:opacity-0 transition-opacity duration-500">
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
              variant="outline" 
              size="lg" 
              className="h-14 px-10 rounded-full border-primary/35 bg-background text-primary shadow-sm hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
            >
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
