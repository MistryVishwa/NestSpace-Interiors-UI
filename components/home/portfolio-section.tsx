"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    image: "/images/portfolio-1.jpg",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    image: "/images/portfolio-3.jpg",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    image: "/images/portfolio-4.jpg",
  },
  {
    id: "elegant-dining",
    title: "Elegant Dining",
    category: "Home",
    image: "/images/portfolio-5.jpg",
  },
  {
    id: "penthouse-living",
    title: "Penthouse Living",
    category: "Luxury",
    image: "/images/portfolio-6.jpg",
  },
]

export function PortfolioSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Featured Projects
            </h2>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.id}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden image-zoom"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-serif text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
              {/* Default Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-primary-foreground font-medium">
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
