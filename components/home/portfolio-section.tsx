"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    image: "/images/portfolio-1.jpg",
    size: "tall",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
    size: "medium",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    image: "/images/portfolio-3.jpg",
    size: "medium",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    image: "/images/portfolio-4.jpg",
    size: "tall",
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
    size: "tall",
  },
]

export function PortfolioSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(portfolioItems.length)

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-14 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
              Our Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance mb-3 sm:mb-4 leading-tight">
              Featured Projects
            </h2>
            <div className="decorative-line mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Explore our curated collection of thoughtfully designed spaces that showcase excellence.
            </p>
          </div>
          <Link href="/portfolio" className="shrink-0">
            <Button 
              variant="outline" 
              size="lg"
              className="group border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground h-10 sm:h-11 px-5 sm:px-6 rounded-xl transition-all duration-500 text-sm font-medium"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                "masonry-item block group relative rounded-xl sm:rounded-2xl overflow-hidden image-zoom reveal-scale",
                visibleItems[index] && "visible",
                item.size === "tall" && "aspect-[3/4]",
                item.size === "medium" && "aspect-[4/3]"
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Default Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Content on Hover */}
              <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-primary text-xs font-medium uppercase tracking-[0.1em] mb-1.5 sm:mb-2">
                  {item.category}
                </span>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="text-primary-foreground font-serif text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Default Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-primary-foreground/60 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em]">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-serif font-medium text-base sm:text-lg mt-0.5">
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
