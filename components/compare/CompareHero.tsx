import * as React from "react"
import { Layers, Sparkles, Scale, CheckCircle2 } from "lucide-react"

export function CompareHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-muted/60 via-muted/30 to-background border border-border/60 p-6 sm:p-10 lg:p-12 mb-8 sm:mb-12 shadow-sm">
      {/* Decorative background glow */}
      <div 
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-70" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl opacity-50" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Interactive Side-by-Side Comparison</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Compare Interior Designs
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Evaluate styles, materials, color swatches, furniture setups, and estimated budget ranges side by side to discover the perfect aesthetic for your space.
        </p>

        {/* Features / Highlights Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2 bg-background/80 px-3.5 py-2 rounded-xl border border-border/50 shadow-2xs">
            <Scale className="w-4 h-4 text-primary" />
            <span>Side-by-Side Specifications</span>
          </div>
          <div className="flex items-center gap-2 bg-background/80 px-3.5 py-2 rounded-xl border border-border/50 shadow-2xs">
            <Layers className="w-4 h-4 text-primary" />
            <span>Material & Color Match Analysis</span>
          </div>
          <div className="flex items-center gap-2 bg-background/80 px-3.5 py-2 rounded-xl border border-border/50 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Cost & Efficiency Metrics</span>
          </div>
        </div>
      </div>
    </section>
  )
}
