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
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--accent)_0%,transparent_50%)] opacity-[0.03]" />
      
      <div className="container mx-auto px-6 lg:px-16 xl:px-20 relative">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-4xl mx-auto mb-24 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">
            What We Offer
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 text-balance">
            Our Services
          </h2>
          <div className="decorative-line mx-auto mb-8" />
          <p className="text-muted-foreground text-xl lg:text-2xl leading-relaxed font-light">
            From concept to completion, we provide end-to-end interior design solutions tailored to your unique vision.
          </p>
        </div>

        {/* Services Grid - Large Cards with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              href={service.href}
              ref={setRef(index)}
              className={cn(
                "group relative rounded-3xl overflow-hidden luxury-card reveal",
                visibleItems[index] && "visible"
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Large Background Image */}
              <div className="relative h-[400px] lg:h-[480px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-10 lg:p-12 flex flex-col justify-end">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <service.icon className="h-8 w-8 text-primary-foreground transition-colors duration-500" />
                </div>

                {/* Title & Arrow */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-foreground">
                    {service.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500">
                    <ArrowUpRight className="h-5 w-5 text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                <p className="text-primary-foreground/80 leading-relaxed mb-6 text-lg font-light">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-4 py-1.5 text-sm rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 border border-primary-foreground/10"
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
