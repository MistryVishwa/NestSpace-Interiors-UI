import * as React from "react"
import { Compass, Sparkles } from "lucide-react"

export function CollectionHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-background">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md mb-6 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Curated Interior Design Collections</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight mb-6">
          Explore Our <span className="text-gradient">Design Inspiration</span> Collections
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          Discover handpicked themes, architectural concepts, and curated room transformations tailored to inspire your next dream interior project.
        </p>

        {/* Decorative Line */}
        <div className="flex justify-center items-center gap-3">
          <div className="h-px w-12 bg-border" />
          <Compass className="h-4 w-4 text-primary animate-pulse" />
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  )
}
