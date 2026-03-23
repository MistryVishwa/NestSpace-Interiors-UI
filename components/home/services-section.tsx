"use client"

import Image from "next/image"
import { Home, Building2, UtensilsCrossed, Crown, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Home,
    title: "Home Interior",
    description: "Transform your home into a personalized sanctuary with our comprehensive residential design services.",
    href: "/services#home-interior",
    image: "/images/portfolio-1.jpg",
    features: ["Living Rooms", "Bedrooms", "Dining Areas"],
  },
  {
    icon: Building2,
    title: "Office Design",
    description: "Create inspiring workspaces that boost productivity and reflect your brand identity.",
    href: "/services#office-design",
    image: "/images/portfolio-3.jpg",
    features: ["Corporate Offices", "Co-working Spaces", "Conference Rooms"],
  },
  {
    icon: UtensilsCrossed,
    title: "Modular Kitchen",
    description: "Design functional and stylish kitchens with smart storage and premium finishes.",
    href: "/services#modular-kitchen",
    image: "/images/portfolio-2.jpg",
    features: ["Island Kitchens", "L-Shaped", "Parallel Kitchens"],
  },
  {
    icon: Crown,
    title: "Luxury Spaces",
    description: "Experience the pinnacle of design excellence with our exclusive luxury services.",
    href: "/services#luxury-spaces",
    image: "/images/portfolio-6.jpg",
    features: ["Penthouses", "Villas", "Private Residences"],
  },
]

export function ServicesSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(services.length)

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--accent)_0%,transparent_50%)] opacity-[0.03]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 text-balance leading-tight">
            Our Services
          </h2>
          <div className="decorative-line mx-auto mb-4 sm:mb-5" />
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            From concept to completion, we provide end-to-end interior design solutions tailored to your unique vision.
          </p>
        </div>

        {/* Services Grid - Large Cards with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              href={service.href}
              ref={setRef(index)}
              className={cn(
                "group relative rounded-2xl overflow-hidden luxury-card reveal",
                visibleItems[index] && "visible"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground transition-colors duration-500" />
                </div>

                {/* Title & Arrow */}
                <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-primary-foreground">
                    {service.title}
                  </h3>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500">
                    <ArrowUpRight className="h-4 w-4 text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                <p className="text-primary-foreground/80 leading-relaxed mb-4 text-sm sm:text-base line-clamp-2">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-2.5 py-1 text-xs rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 border border-primary-foreground/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
