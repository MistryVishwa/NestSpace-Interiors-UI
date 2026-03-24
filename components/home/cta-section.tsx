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
      className="py-16 sm:py-20 lg:py-24 bg-foreground text-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-primary/15 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-accent/8 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--foreground)_100%)] opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/10 border border-background/20 mb-5 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-background/80 text-xs font-medium">Start Your Transformation</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-balance leading-tight">
            Ready to Transform
            <span className="block text-primary">Your Space?</span>
          </h2>
          
          <p className="text-background/70 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss your project and create something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-11 px-6 sm:px-8 text-sm font-medium rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:border-accent/60 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-11 px-6 sm:px-8 text-sm font-medium rounded-full border border-background/20 bg-background/5 text-background hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-5 mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-background/10">
            <span className="text-background/50 text-xs">Trusted by industry leaders</span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              <div className="text-background/30 font-serif text-sm font-bold">Forbes</div>
              <div className="text-background/30 font-serif text-sm font-bold">AD</div>
              <div className="text-background/30 font-serif text-sm font-bold">ELLE</div>
              <div className="text-background/30 font-serif text-sm font-bold">Vogue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
