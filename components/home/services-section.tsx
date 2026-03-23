"use client"

import { Home, Building2, UtensilsCrossed, Crown, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Home,
    title: "Home Interior",
    description: "Transform your home into a personalized sanctuary with our comprehensive residential design services that blend aesthetics with functionality.",
    href: "/services#home-interior",
    features: ["Living Rooms", "Bedrooms", "Dining Areas"],
  },
  {
    icon: Building2,
    title: "Office Design",
    description: "Create inspiring workspaces that boost productivity, reflect your brand identity, and foster collaboration among your team.",
    href: "/services#office-design",
    features: ["Corporate Offices", "Co-working Spaces", "Conference Rooms"],
  },
  {
    icon: UtensilsCrossed,
    title: "Modular Kitchen",
    description: "Design functional and stylish kitchens with smart storage solutions, premium finishes, and ergonomic layouts.",
    href: "/services#modular-kitchen",
    features: ["Island Kitchens", "L-Shaped", "Parallel Kitchens"],
  },
  {
    icon: Crown,
    title: "Luxury Spaces",
    description: "Experience the pinnacle of design excellence with our exclusive luxury interior services for the most discerning clients.",
    href: "/services#luxury-spaces",
    features: ["Penthouses", "Villas", "Private Residences"],
  },
]

export function ServicesSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(services.length)

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-20 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
            From concept to completion, we provide end-to-end interior design solutions tailored to your unique vision and lifestyle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              href={service.href}
              ref={setRef(index)}
              className={cn(
                "group relative p-8 lg:p-10 rounded-2xl bg-card border border-border hover:border-primary/30 premium-card reveal",
                visibleItems[index] && "visible"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 text-base lg:text-lg">
                {service.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span 
                    key={feature}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
