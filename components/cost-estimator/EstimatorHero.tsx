import Link from "next/link";
import { Calculator, ChevronRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EstimatorHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background pt-24 pb-12 lg:pt-28 lg:pb-16 border-b border-border/40">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center text-xs sm:text-sm text-muted-foreground mb-6"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/60" />
          <span className="text-foreground font-medium" aria-current="page">
            Cost Estimator
          </span>
        </nav>

        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Calculator className="h-3.5 w-3.5 mr-1" />
              Interactive Planning Tool
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-foreground mb-4">
            Interior Cost <span className="text-gradient">Estimator</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
            Plan your dream interior with total clarity. Estimate realistic budget requirements based on room area, design styles, material grades, furniture packages, and custom add-ons.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 shadow-xs">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Instant Real-Time</p>
                <p className="text-[11px] text-muted-foreground">Live cost calculation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 shadow-xs">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">100% Transparent</p>
                <p className="text-[11px] text-muted-foreground">Detailed breakdown</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 shadow-xs">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Timeline Estimate</p>
                <p className="text-[11px] text-muted-foreground">Schedule forecasts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
