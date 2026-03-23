"use client"

import { Home, Building2, UtensilsCrossed, Crown } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Home,
    title: "Home Interior",
    description: "Transform your home into a personalized sanctuary with our comprehensive residential design services.",
    href: "/services#home-interior",
  },
  {
    icon: Building2,
    title: "Office Design",
    description: "Create inspiring workspaces that boost productivity and reflect your brand's identity.",
    href: "/services#office-design",
  },
  {
    icon: UtensilsCrossed,
    title: "Modular Kitchen",
    description: "Design functional and stylish kitchens with smart storage solutions and premium finishes.",
    href: "/services#modular-kitchen",
  },
  {
    icon: Crown,
    title: "Luxury Spaces",
    description: "Experience the pinnacle of design excellence with our exclusive luxury interior services.",
    href: "/services#luxury-spaces",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From concept to completion, we provide end-to-end interior design solutions tailored to your unique needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
