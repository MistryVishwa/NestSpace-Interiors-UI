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
      className="py-32 bg-foreground text-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--foreground)_100%)] opacity-50" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-background/80 text-sm font-medium">Start Your Transformation</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-balance leading-tight">
            Ready to Transform
            <span className="block text-primary">Your Space?</span>
          </h2>
          
          <p className="text-background/70 text-lg sm:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and create something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="h-14 px-10 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 text-base font-medium border-background/30 text-background hover:bg-background/10 transition-all duration-300"
              >
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-background/10">
            <span className="text-background/50 text-sm">Trusted by industry leaders</span>
            <div className="flex gap-6">
              <div className="text-background/30 font-serif text-lg font-bold">Forbes</div>
              <div className="text-background/30 font-serif text-lg font-bold">AD</div>
              <div className="text-background/30 font-serif text-lg font-bold">ELLE</div>
              <div className="text-background/30 font-serif text-lg font-bold">Vogue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
