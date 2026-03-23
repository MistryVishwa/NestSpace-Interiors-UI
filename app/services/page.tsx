import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Home, Building2, UtensilsCrossed, Crown, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    id: "home-interior",
    icon: Home,
    title: "Home Interior",
    tagline: "Transform your home into a sanctuary",
    description: "Our residential design services cover everything from single room makeovers to complete home transformations. We work closely with you to understand your lifestyle, preferences, and needs to create spaces that are both beautiful and functional.",
    features: [
      "Living room and bedroom design",
      "Custom furniture selection",
      "Color consultation and palette creation",
      "Lighting design and placement",
      "Art and accessory curation",
      "Space planning and optimization",
    ],
    image: "/images/portfolio-1.jpg",
  },
  {
    id: "office-design",
    icon: Building2,
    title: "Office Design",
    tagline: "Create inspiring workspaces",
    description: "We design offices that boost productivity, foster creativity, and reflect your brand identity. From startups to established corporations, we create workspaces that your team will love.",
    features: [
      "Open plan and private office layouts",
      "Conference room design",
      "Reception and lobby areas",
      "Breakout and collaboration spaces",
      "Ergonomic furniture solutions",
      "Brand integration and signage",
    ],
    image: "/images/portfolio-3.jpg",
  },
  {
    id: "modular-kitchen",
    icon: UtensilsCrossed,
    title: "Modular Kitchen",
    tagline: "Where function meets elegance",
    description: "The kitchen is the heart of every home. Our modular kitchen designs combine stunning aesthetics with smart functionality, maximizing every inch of space with innovative storage solutions.",
    features: [
      "Custom cabinet design and installation",
      "Premium countertop selection",
      "Appliance integration",
      "Smart storage solutions",
      "Lighting for task and ambiance",
      "Backsplash and finish selection",
    ],
    image: "/images/portfolio-2.jpg",
  },
  {
    id: "luxury-spaces",
    icon: Crown,
    title: "Luxury Spaces",
    tagline: "Experience the pinnacle of design",
    description: "For those who desire the extraordinary, our luxury design services offer access to exclusive materials, bespoke furniture, and world-class craftsmanship. We create spaces that are truly one-of-a-kind.",
    features: [
      "Bespoke furniture and millwork",
      "Rare and exotic materials",
      "Art advisory and acquisition",
      "Smart home integration",
      "Private spa and wellness areas",
      "Wine cellars and entertainment spaces",
    ],
    image: "/images/portfolio-6.jpg",
  },
]

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "We begin with an in-depth discussion to understand your vision, requirements, and budget.",
  },
  {
    step: "02",
    title: "Concept Development",
    description: "Our team creates mood boards, 3D visualizations, and detailed design concepts for your approval.",
  },
  {
    step: "03",
    title: "Design Refinement",
    description: "We refine the designs based on your feedback, finalizing every detail before execution.",
  },
  {
    step: "04",
    title: "Execution",
    description: "Our project managers oversee the implementation, ensuring quality and timely completion.",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Comprehensive Design Solutions
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From concept to completion, we offer end-to-end interior design services tailored to your unique needs and vision.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {service.title}
                  </h2>
                  <p className="text-primary font-medium mb-4">{service.tagline}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              How We Work
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our streamlined process ensures a smooth journey from initial concept to final reveal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <Card key={item.step} className="bg-card border-border relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <span className="font-serif text-6xl font-bold text-primary/10 absolute -top-2 -left-2 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </span>
                  <div className="relative">
                    <h3 className="font-semibold text-xl text-foreground mb-3 mt-8">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Tailored Pricing for Every Project
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every project is unique, and so is our pricing. We offer flexible packages based on your specific needs, scope, and budget. Contact us for a personalized consultation and detailed quote.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
