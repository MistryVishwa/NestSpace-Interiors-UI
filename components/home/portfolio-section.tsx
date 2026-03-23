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
    <section className="py-40 bg-secondary/40 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-16 xl:px-20 relative">
        {/* Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">
              Our Portfolio
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground text-balance mb-6">
              Featured Projects
            </h2>
            <div className="decorative-line mb-6" />
            <p className="text-muted-foreground text-xl lg:text-2xl leading-relaxed font-light">
              Explore our curated collection of thoughtfully designed spaces that showcase excellence.
            </p>
          </div>
          <Link href="/portfolio">
            <Button 
              variant="outline" 
              size="lg"
              className="group border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground h-14 px-10 rounded-2xl transition-all duration-500 text-base font-medium"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
                "masonry-item block group relative rounded-3xl overflow-hidden image-zoom reveal-scale",
                visibleItems[index] && "visible",
                item.size === "tall" && "aspect-[3/4]",
                item.size === "medium" && "aspect-[4/3]"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
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
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-primary text-sm font-medium uppercase tracking-[0.15em] mb-3">
                  {item.category}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-primary-foreground font-serif text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Default Label */}
              <div className="absolute bottom-0 left-0 right-0 p-8 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-[0.15em]">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-serif font-medium text-xl mt-1">
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
