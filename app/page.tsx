import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { StatsSection } from "@/components/home/stats-section"
import { CTASection } from "@/components/home/cta-section"
import { ProcessSection } from "@/components/home/process-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
