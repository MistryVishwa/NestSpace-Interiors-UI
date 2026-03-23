import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ruler, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = {
  "modern-living-room": {
    title: "Modern Living Room",
    category: "Home",
    location: "Manhattan, NY",
    date: "2024",
    area: "850 sq ft",
    duration: "6 weeks",
    heroImage: "/images/portfolio-1.jpg",
    description: "This contemporary living room transformation was designed for a young professional couple seeking a sophisticated yet comfortable space in their Manhattan apartment. The design features clean lines, a neutral color palette with warm accents, and carefully curated furniture pieces that maximize both style and functionality.",
    challenge: "The main challenge was to create an open, airy feel in a relatively compact space while accommodating the clients' extensive book collection and entertainment needs.",
    solution: "We implemented custom built-in shelving that serves as both a display unit and room divider, creating defined zones without sacrificing the open floor plan. The use of mirrors strategically placed opposite the windows amplifies natural light, making the space feel larger.",
    gallery: [
      "/images/portfolio-1.jpg",
      "/images/portfolio-5.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-6.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-3.jpg",
      after: "/images/portfolio-1.jpg",
    },
  },
  "luxury-kitchen": {
    title: "Luxury Kitchen",
    category: "Kitchen",
    location: "Beverly Hills, CA",
    date: "2024",
    area: "400 sq ft",
    duration: "8 weeks",
    heroImage: "/images/portfolio-2.jpg",
    description: "A complete kitchen transformation featuring premium materials and state-of-the-art appliances. This modular kitchen design combines stunning aesthetics with smart functionality, maximizing every inch of space with innovative storage solutions.",
    challenge: "The clients desired a chef-worthy kitchen that could handle professional cooking while maintaining the elegance expected of a Beverly Hills residence.",
    solution: "We selected commercial-grade appliances integrated seamlessly into custom cabinetry. The marble countertops and brass fixtures add luxury, while deep drawers and pull-out organizers ensure everything has its place.",
    gallery: [
      "/images/portfolio-2.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-4.jpg",
      "/images/hero-interior.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-3.jpg",
      after: "/images/portfolio-2.jpg",
    },
  },
  "executive-office": {
    title: "Executive Office",
    category: "Office",
    location: "Chicago, IL",
    date: "2023",
    area: "1,200 sq ft",
    duration: "10 weeks",
    heroImage: "/images/portfolio-3.jpg",
    description: "An executive workspace designed for a tech company CEO, balancing the need for a commanding presence with the flexibility for collaborative work. The design reflects the company's innovative spirit while providing a refined environment for high-stakes meetings.",
    challenge: "Creating a space that could serve as both a private executive office and a meeting room for up to 8 people, while incorporating the latest technology for video conferencing.",
    solution: "A convertible workspace with a motorized partition allows the space to transform from intimate office to conference room. Integrated technology is hidden when not in use, maintaining the clean aesthetic.",
    gallery: [
      "/images/portfolio-3.jpg",
      "/images/about-hero.jpg",
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-1.jpg",
      after: "/images/portfolio-3.jpg",
    },
  },
  "spa-bathroom": {
    title: "Spa Bathroom",
    category: "Luxury",
    location: "Miami, FL",
    date: "2024",
    area: "250 sq ft",
    heroImage: "/images/portfolio-4.jpg",
    duration: "5 weeks",
    description: "A spa-like bathroom retreat featuring a freestanding tub, rain shower, and premium marble finishes throughout. This luxury bathroom brings the resort experience home.",
    challenge: "Transforming a dated bathroom into a spa-like sanctuary while working within the constraints of the existing plumbing layout.",
    solution: "By relocating the vanity and installing a freestanding tub, we completely changed the flow of the space. Heated floors, ambient lighting, and a steam shower complete the spa experience.",
    gallery: [
      "/images/portfolio-4.jpg",
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-1.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-2.jpg",
      after: "/images/portfolio-4.jpg",
    },
  },
  "elegant-dining": {
    title: "Elegant Dining",
    category: "Home",
    location: "San Francisco, CA",
    date: "2023",
    area: "300 sq ft",
    duration: "4 weeks",
    heroImage: "/images/portfolio-5.jpg",
    description: "A formal dining room designed for memorable gatherings, featuring a custom dining table, statement lighting, and carefully curated artwork.",
    challenge: "Creating a space that feels intimate for everyday family meals while being impressive enough for formal entertaining.",
    solution: "Adjustable lighting allows the mood to shift from casual to formal. The extendable dining table accommodates 6-12 guests, and the sideboard provides ample storage for fine china.",
    gallery: [
      "/images/portfolio-5.jpg",
      "/images/portfolio-1.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-2.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-3.jpg",
      after: "/images/portfolio-5.jpg",
    },
  },
  "penthouse-living": {
    title: "Penthouse Living",
    category: "Luxury",
    location: "New York, NY",
    date: "2024",
    area: "3,500 sq ft",
    duration: "16 weeks",
    heroImage: "/images/portfolio-6.jpg",
    description: "A complete penthouse renovation featuring double-height ceilings, a custom spiral staircase, and breathtaking city views. This luxury residence showcases the pinnacle of contemporary design.",
    challenge: "Maximizing the stunning views while creating intimate living spaces within the vast open floor plan.",
    solution: "Strategic furniture groupings and custom millwork create distinct zones while maintaining visual flow. Floor-to-ceiling windows remain unobstructed to frame the city skyline.",
    gallery: [
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-4.jpg",
      "/images/portfolio-5.jpg",
    ],
    beforeAfter: {
      before: "/images/about-hero.jpg",
      after: "/images/portfolio-6.jpg",
    },
  },
  "cozy-bedroom": {
    title: "Cozy Bedroom",
    category: "Home",
    location: "Seattle, WA",
    date: "2023",
    area: "450 sq ft",
    duration: "4 weeks",
    heroImage: "/images/hero-interior.jpg",
    description: "A serene bedroom retreat with warm textures and soft lighting, designed to promote rest and relaxation.",
    challenge: "Creating a peaceful sanctuary that feels separate from the busy home office adjacent to the space.",
    solution: "Sound-dampening materials, blackout curtains, and a carefully chosen color palette create an oasis of calm. The custom headboard with integrated reading lights adds functionality.",
    gallery: [
      "/images/hero-interior.jpg",
      "/images/portfolio-1.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-4.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-3.jpg",
      after: "/images/hero-interior.jpg",
    },
  },
  "modern-workspace": {
    title: "Modern Workspace",
    category: "Office",
    location: "Austin, TX",
    date: "2024",
    area: "2,800 sq ft",
    duration: "12 weeks",
    heroImage: "/images/about-hero.jpg",
    description: "A collaborative open office designed for a creative agency, featuring flexible workstations and inspiring breakout spaces.",
    challenge: "Accommodating 30 employees in an open plan while providing privacy options and reducing noise distractions.",
    solution: "Phone booths, acoustic panels, and strategic layout create quiet zones. The central collaboration area encourages teamwork while perimeter desks offer focused work options.",
    gallery: [
      "/images/about-hero.jpg",
      "/images/portfolio-3.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-6.jpg",
    ],
    beforeAfter: {
      before: "/images/portfolio-1.jpg",
      after: "/images/about-hero.jpg",
    },
  },
}

type ProjectId = keyof typeof projects

export function generateStaticParams() {
  return Object.keys(projects).map((id) => ({ id }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects[id as ProjectId]

  if (!project) {
    notFound()
  }

  const projectIds = Object.keys(projects)
  const currentIndex = projectIds.indexOf(id)
  const prevProject = currentIndex > 0 ? projectIds[currentIndex - 1] : null
  const nextProject = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-0">
        <div className="relative h-[60vh] min-h-[500px]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Link href="/portfolio" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>

            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              {project.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              {project.title}
            </h1>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Location</p>
                  <p className="font-medium text-foreground">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Year</p>
                  <p className="font-medium text-foreground">{project.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Area</p>
                  <p className="font-medium text-foreground">{project.area}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Duration</p>
                  <p className="font-medium text-foreground">{project.duration}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-8 py-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Project Gallery
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {project.gallery.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden image-zoom">
                <Image
                  src={image}
                  alt={`${project.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Before & After
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={project.beforeAfter.before}
                  alt="Before"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium text-muted-foreground">Before</p>
            </div>
            <div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={project.beforeAfter.after}
                  alt="After"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium text-primary">After</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            {prevProject ? (
              <Link href={`/portfolio/${prevProject}`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Project
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/portfolio/${nextProject}`}>
                <Button variant="ghost" className="gap-2">
                  Next Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
