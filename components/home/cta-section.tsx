"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

export function CTASection() {
  const sectionReveal = useScrollReveal()

  return (
    <section 
      ref={sectionReveal.ref}
      className="py-20 sm:py-28 lg:py-32 bg-foreground text-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-primary/20 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-accent/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--foreground)_100%)] opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background/10 border border-background/20 mb-6 sm:mb-8">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-background/80 text-xs sm:text-sm font-medium">Start Your Transformation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 lg:mb-8 text-balance leading-tight">
            Ready to Transform
            <span className="block text-primary">Your Space?</span>
          </h2>
          
          <p className="text-background/70 text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss your project and create something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 sm:h-13 lg:h-14 px-6 sm:px-8 lg:px-10 text-sm sm:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl sm:rounded-2xl"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-12 sm:h-13 lg:h-14 px-6 sm:px-8 lg:px-10 text-sm sm:text-base font-medium border-background/30 text-background hover:bg-background/10 transition-all duration-300 rounded-xl sm:rounded-2xl"
              >
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-background/10">
            <span className="text-background/50 text-xs sm:text-sm">Trusted by industry leaders</span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className="text-background/30 font-serif text-base sm:text-lg font-bold">Forbes</div>
              <div className="text-background/30 font-serif text-base sm:text-lg font-bold">AD</div>
              <div className="text-background/30 font-serif text-base sm:text-lg font-bold">ELLE</div>
              <div className="text-background/30 font-serif text-base sm:text-lg font-bold">Vogue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
