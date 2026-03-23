"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const categories = ["All", "Home", "Office", "Kitchen", "Luxury"]

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    location: "Manhattan, NY",
    image: "/images/portfolio-1.jpg",
    description: "A contemporary living space featuring clean lines and natural materials.",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    location: "Beverly Hills, CA",
    image: "/images/portfolio-2.jpg",
    description: "A stunning modular kitchen with premium finishes and smart storage.",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    location: "Chicago, IL",
    image: "/images/portfolio-3.jpg",
    description: "An executive workspace designed for productivity and elegance.",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    location: "Miami, FL",
    image: "/images/portfolio-4.jpg",
    description: "A spa-like bathroom retreat with marble finishes and ambient lighting.",
  },
  {
    id: "elegant-dining",
    title: "Elegant Dining",
    category: "Home",
    location: "San Francisco, CA",
    image: "/images/portfolio-5.jpg",
    description: "A formal dining room designed for memorable gatherings.",
  },
  {
    id: "penthouse-living",
    title: "Penthouse Living",
    category: "Luxury",
    location: "New York, NY",
    image: "/images/portfolio-6.jpg",
    description: "A luxurious penthouse with panoramic city views.",
  },
  {
    id: "cozy-bedroom",
    title: "Cozy Bedroom",
    category: "Home",
    location: "Seattle, WA",
    image: "/images/hero-interior.jpg",
    description: "A serene bedroom retreat with warm textures and soft lighting.",
  },
  {
    id: "modern-workspace",
    title: "Modern Workspace",
    category: "Office",
    location: "Austin, TX",
    image: "/images/about-hero.jpg",
    description: "A collaborative open office designed for innovation.",
  },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredItems = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Portfolio
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Explore Our Projects
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Browse through our collection of completed projects spanning residential, commercial, and luxury spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-6",
                  activeFilter === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary"
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 image-zoom">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-background font-medium border border-background/50 px-6 py-2 rounded-full">
                      View Project
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
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
