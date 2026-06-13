import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Compass } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description:
    "The page you are looking for doesn't exist. Head back to the NestSpace Interiors homepage to explore our luxury interior design portfolio.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* 404 Hero */}
      <section className="flex-1 flex items-center justify-center pt-32 pb-20 bg-secondary/30 relative overflow-hidden">
        {/* Decorative blobs — mirrors the CTASection aesthetic */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative text-center">
          {/* Eyebrow label */}
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in">
            Error
          </p>

          {/* Large gradient "404" */}
          <h1
            className="font-serif font-bold text-gradient leading-none mb-6 animate-fade-in animate-delay-100"
            style={{ fontSize: "clamp(7rem, 20vw, 16rem)" }}
          >
            404
          </h1>

          {/* Decorative divider */}
          <div className="decorative-line mx-auto mb-8 animate-fade-in animate-delay-200" />

          {/* Sub-heading */}
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance animate-fade-in animate-delay-200">
            This Page Doesn&apos;t Exist
          </h2>

          {/* Supporting copy */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-fade-in animate-delay-300">
            It seems you&apos;ve wandered off the blueprint. The page you&apos;re
            looking for may have been moved, renamed, or never existed. Let us
            guide you back to something beautiful.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-delay-400">
            <Link href="/">
              <Button
                id="not-found-home-cta"
                size="lg"
                className="h-12 px-8 text-sm font-medium rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl hover:shadow-primary/35 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <Link href="/portfolio">
              <Button
                id="not-found-portfolio-cta"
                size="lg"
                variant="outline"
                className="h-12 px-8 text-sm font-medium rounded-full border-border hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all duration-300"
              >
                <Compass className="mr-2 h-4 w-4" />
                Explore Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
