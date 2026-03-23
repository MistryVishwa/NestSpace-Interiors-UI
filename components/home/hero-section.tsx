"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Image - Large & Immersive */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury interior design"
          fill
          className="object-cover scale-[1.02]"
          priority
          sizes="100vw"
        />
        
        {/* Premium Multi-Layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)] opacity-40" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-20 relative z-10 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium tracking-wide text-sm">
              Award-Winning Interior Design Studio
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-foreground leading-[1.02] mb-10 animate-fade-up opacity-0 text-balance"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Design Your
            <span className="block text-gradient mt-2">Dream Space</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-14 leading-relaxed max-w-2xl animate-fade-up opacity-0 font-light"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            We craft bespoke interiors that transform ordinary spaces into extraordinary sanctuaries of elegance and comfort.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-6 animate-fade-up opacity-0"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <Link href="/portfolio">
              <Button 
                size="lg" 
                className="h-16 px-12 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all duration-500 rounded-2xl btn-glow"
              >
                Explore Our Work
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-lg font-medium border-foreground/15 bg-background/40 backdrop-blur-md hover:bg-foreground/5 hover:border-foreground/25 transition-all duration-500 rounded-2xl"
              >
                <Play className="mr-3 h-5 w-5 fill-current" />
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap items-center gap-12 mt-20 pt-10 border-t border-border/40 animate-fade-up opacity-0"
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-foreground">500+</span>
              <span className="text-sm text-muted-foreground mt-1 tracking-wide">Projects Delivered</span>
            </div>
            <div className="w-px h-14 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground mt-1 tracking-wide">Years Experience</span>
            </div>
            <div className="w-px h-14 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-foreground">25+</span>
              <span className="text-sm text-muted-foreground mt-1 tracking-wide">Design Awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
          <span className="text-xs text-muted-foreground tracking-[0.25em] uppercase font-medium">Scroll</span>
          <div className="w-7 h-12 border-2 border-foreground/20 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
