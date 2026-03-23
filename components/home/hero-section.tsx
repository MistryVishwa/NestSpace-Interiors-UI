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
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 animate-fade-up opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium tracking-wide text-xs sm:text-sm">
              Award-Winning Interior Design Studio
            </span>
          </div>

          {/* Headline - Elegant sizing: 32px mobile, 40px tablet, 56px desktop */}
          <h1 
            className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-5 sm:mb-6 animate-fade-up opacity-0 text-balance"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Design Your
            <span className="block text-gradient mt-1">Dream Space</span>
          </h1>

          {/* Subheadline - 16px mobile, 18px tablet, 20px desktop */}
          <p 
            className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-xl animate-fade-up opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            We craft bespoke interiors that transform ordinary spaces into extraordinary sanctuaries of elegance and comfort.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 rounded-xl"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm font-medium border-foreground/15 bg-background/40 backdrop-blur-md hover:bg-foreground/5 hover:border-foreground/25 transition-all duration-500 rounded-xl"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-border/40 animate-fade-up opacity-0"
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">500+</span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">Projects Delivered</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">15+</span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">Years Experience</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">25+</span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">Design Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
