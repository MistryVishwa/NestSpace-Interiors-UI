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
      <div className="absolute top-1/3 right-1/3 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-primary/8 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[350px] lg:w-[400px] h-[300px] sm:h-[350px] lg:h-[400px] bg-accent/6 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-5xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 lg:mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-primary font-medium tracking-wide text-xs sm:text-sm">
              Award-Winning Interior Design Studio
            </span>
          </div>

          {/* Headline - Significantly larger with better responsive scaling */}
          <h1 
            className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] 2xl:text-[8rem] font-bold text-foreground leading-[1.02] mb-6 sm:mb-8 lg:mb-10 animate-fade-up opacity-0 text-balance"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Design Your
            <span className="block text-gradient mt-1 sm:mt-2">Dream Space</span>
          </h1>

          {/* Subheadline - Better responsive sizing */}
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mb-8 sm:mb-10 lg:mb-14 leading-relaxed max-w-2xl animate-fade-up opacity-0 font-light"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            We craft bespoke interiors that transform ordinary spaces into extraordinary sanctuaries of elegance and comfort.
          </p>

          {/* CTA Buttons - Better responsive sizing */}
          <div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 animate-fade-up opacity-0"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 text-sm sm:text-base lg:text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all duration-500 rounded-xl sm:rounded-2xl btn-glow"
              >
                Explore Our Work
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 text-sm sm:text-base lg:text-lg font-medium border-foreground/15 bg-background/40 backdrop-blur-md hover:bg-foreground/5 hover:border-foreground/25 transition-all duration-500 rounded-xl sm:rounded-2xl"
              >
                <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Better responsive layout */}
          <div 
            className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-border/40 animate-fade-up opacity-0"
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">500+</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-wide">Projects Delivered</span>
            </div>
            <div className="w-px h-10 sm:h-12 lg:h-14 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">15+</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-wide">Years Experience</span>
            </div>
            <div className="w-px h-10 sm:h-12 lg:h-14 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">25+</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-wide">Design Awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 sm:gap-3 animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
          <span className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium">Scroll</span>
          <div className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-foreground/20 rounded-full flex justify-center p-1.5 sm:p-2">
            <div className="w-1 h-2.5 sm:w-1.5 sm:h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
