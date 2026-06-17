import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PortfolioGallery } from "./portfolio-gallery"

const categories = ["All", "Home", "Office", "Kitchen", "Luxury"]

const portfolioItems = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    category: "Home",
    location: "Manhattan, NY",
    image: "/images/portfolio-1.jpg",
    description: "A contemporary living space featuring clean lines and natural materials.",
    size: "tall",
  },
  {
    id: "luxury-kitchen",
    title: "Luxury Kitchen",
    category: "Kitchen",
    location: "Beverly Hills, CA",
    image: "/images/portfolio-2.jpg",
    description: "A stunning modular kitchen with premium finishes and smart storage.",
    size: "regular",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    location: "Chicago, IL",
    image: "/images/portfolio-3.jpg",
    description: "An executive workspace designed for productivity and elegance.",
    size: "regular",
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    category: "Luxury",
    location: "Miami, FL",
    image: "/images/portfolio-4.jpg",
    description: "A spa-like bathroom retreat with marble finishes and ambient lighting.",
    size: "tall",
  },
  {
    id: "elegant-dining",
    title: "Elegant Dining",
    category: "Home",
    location: "San Francisco, CA",
    image: "/images/portfolio-5.jpg",
    description: "A formal dining room designed for memorable gatherings.",
    size: "regular",
  },
  {
    id: "penthouse-living",
    title: "Penthouse Living",
    category: "Luxury",
    location: "New York, NY",
    image: "/images/portfolio-6.jpg",
    description: "A luxurious penthouse with panoramic city views.",
    size: "regular",
  },
  {
    id: "cozy-bedroom",
    title: "Cozy Bedroom",
    category: "Home",
    location: "Seattle, WA",
    image: "/images/hero-interior.jpg",
    description: "A serene bedroom retreat with warm textures and soft lighting.",
    size: "tall",
  },
  {
    id: "modern-workspace",
    title: "Modern Workspace",
    category: "Office",
    location: "Austin, TX",
    image: "/images/about-hero.jpg",
    description: "A collaborative open office designed for innovation.",
    size: "regular",
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-36 pb-24 bg-linear-to-b from-secondary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary)_0%,transparent_50%)] opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Portfolio
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Explore Our Projects
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Browse through our collection of completed projects spanning residential, commercial, and luxury spaces.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid Client Island */}
      <PortfolioGallery items={portfolioItems} categories={categories} />

      <CTASection />
      <Footer />
    </main>
  )
}
