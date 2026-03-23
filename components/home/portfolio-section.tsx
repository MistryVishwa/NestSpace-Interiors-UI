"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    image: "/images/portfolio-1.jpg",
    size: "large",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
    size: "small",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    image: "/images/portfolio-3.jpg",
    size: "small",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    image: "/images/portfolio-4.jpg",
    size: "medium",
  },
  {
    id: "elegant-dining",
    title: "Elegant Dining",
    category: "Home",
    image: "/images/portfolio-5.jpg",
    size: "medium",
  },
  {
    id: "penthouse-living",
    title: "Penthouse Living",
    category: "Luxury",
    image: "/images/portfolio-6.jpg",
    size: "large",
  },
]

export function PortfolioSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(portfolioItems.length)

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Work
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
              Explore our collection of thoughtfully designed spaces that showcase our commitment to excellence.
            </p>
          </div>
          <Link href="/portfolio">
            <Button 
              variant="outline" 
              size="lg"
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 px-8 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Masonry Portfolio Grid */}
        <div className="masonry-grid">
          {portfolioItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.id}`}
              ref={setRef(index)}
              className={cn(
                "masonry-item block group relative rounded-2xl overflow-hidden image-zoom reveal-scale",
                visibleItems[index] && "visible",
                item.size === "large" && "aspect-[4/5]",
                item.size === "medium" && "aspect-[4/4]",
                item.size === "small" && "aspect-[4/3]"
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-primary-foreground font-serif text-2xl lg:text-3xl font-semibold">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Default Label - Subtle */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/70 to-transparent group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-medium text-lg">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
