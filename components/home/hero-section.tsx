"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury interior design"
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Premium Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium tracking-wide text-sm">
              Award-Winning Interior Design
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.05] mb-8 animate-fade-up opacity-0 text-balance"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Design Your
            <span className="block text-gradient">Dream Space</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl animate-fade-up opacity-0"
            style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
          >
            We craft modern, elegant interiors that transform ordinary spaces into extraordinary sanctuaries of style and comfort.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-5 animate-fade-up opacity-0"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          >
            <Link href="/portfolio">
              <Button 
                size="lg" 
                className="h-14 px-10 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 text-base font-medium border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-foreground/5 transition-all duration-300"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-up opacity-0"
            style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-foreground">500+</span>
              <span className="text-sm text-muted-foreground">Projects Delivered</span>
            </div>
            <div className="w-px h-12 bg-border/50 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground">Years Experience</span>
            </div>
            <div className="w-px h-12 bg-border/50 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-foreground">25+</span>
              <span className="text-sm text-muted-foreground">Design Awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
