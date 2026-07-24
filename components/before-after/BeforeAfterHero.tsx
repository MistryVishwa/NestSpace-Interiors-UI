"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Sliders, ShieldCheck, ArrowDown } from "lucide-react"

export function BeforeAfterHero() {
  const handleScrollToGallery = () => {
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Glow Orbs & Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 shadow-sm animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Interactive Before & After Showcase</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Witness the Art of <span className="text-primary underline decoration-primary/30 decoration-wavy">Transformation</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Drag our interactive split-slider to compare original room spaces with finished NestSpace interior creations in 4K clarity.
        </p>

        {/* Stats Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto my-8 sm:my-10">
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-md text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">50+</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">Full Room Transformations</div>
          </div>
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-md text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground">100%</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">Client Satisfaction</div>
          </div>
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-md text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-500">4K</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">Interactive Detail Viewer</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={handleScrollToGallery}
            className="h-12 px-6 sm:px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 font-semibold text-sm sm:text-base transition-all duration-300"
          >
            <Sliders className="w-4 h-4 mr-2" />
            Explore Comparisons
            <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
          </Button>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 sm:px-8 rounded-2xl border-border/80 text-foreground hover:bg-muted font-semibold text-sm sm:text-base"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
              Request Your Transformation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
