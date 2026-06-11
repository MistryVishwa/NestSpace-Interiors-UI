import Image from "next/image";
import heroImage from "@/public/images/hero-interior.jpg";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* Background Image - Large & Immersive */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Luxury interior design"
          fill
          className="object-cover scale-[1.02]"
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
        />

        {/* Premium Multi-Layer Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-background/50" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-accent/5" />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)] opacity-40" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute top-1/3 right-1/3 w-100 sm:w-125 lg:w-150 h-100 sm:h-125 lg:h-150 bg-primary/8 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-pulse duration-3000" />
      <div className="absolute bottom-1/4 left-1/4 w-75 sm:w-87.5 lg:w-100 h-75 sm:h-87.5 lg:h-100 bg-accent/6 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] animate-pulse duration-3000 delay-1500" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 fill-mode-both ">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium tracking-wide text-xs sm:text-sm">
              Interior Design Studio
            </span>
          </div>

          {/* Headline - Elegant sizing: 32px mobile, 40px tablet, 56px desktop */}
          <h1 className="font-serif text-[2.1rem] sm:text-[2.6rem] lg:text-[5.5rem] font-bold text-foreground leading-[1.1] mb-5 sm:mb-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both text-balance">
            Design Your
            <span className="block text-gradient mt-1">Dream Space</span>
          </h1>

          {/* Subheadline - 16px mobile, 18px tablet, 20px desktop */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400 fill-mode-both">
            We craft bespoke interiors that transform ordinary spaces into
            extraordinary sanctuaries of elegance and comfort.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-600 fill-mode-both">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm font-medium rounded-xl border border-primary/20 bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(201,138,63,0.22)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_14px_40px_rgba(201,138,63,0.32)] hover:-translate-y-0.5"
            >
              <Link href="/portfolio">
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm font-medium rounded-full border border-primary/25 bg-background/20 text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              <Link href="/contact">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Book Consultation
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-border/40 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-800 fill-mode-both">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                500+
              </span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                Projects Delivered
              </span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                15+
              </span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                Years Experience
              </span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                25+
              </span>
              <span className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                Design Awards
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
