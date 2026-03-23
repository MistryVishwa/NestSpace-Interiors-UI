"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury interior design"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-2xl">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Premium Interior Design
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 text-balance" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Design Your Dream Space
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            We create modern, elegant interiors for homes and offices. Transform your space into a sanctuary of style and comfort with our expert design services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Link href="/portfolio">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5 px-8">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
