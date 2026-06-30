import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ruler, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareBar } from "@/components/blog/share-bar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { projects, type ProjectId } from "@/lib/portfolio-data"
import { RecordProjectView } from "./record-project-view"


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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nestspace-interiors.vercel.app/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://nestspace-interiors.vercel.app/portfolio",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://nestspace-interiors.vercel.app/portfolio/${id}`,
      },
    ],
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <RecordProjectView id={id} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-0">
        <div className="relative h-[60vh] min-h-125">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            style={{ viewTransitionName: `project-${id}` } as React.CSSProperties}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/portfolio">Portfolio</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{project.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Link href="/portfolio" className="inline-flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </div>

            <span className="text-primary font-medium uppercase tracking-wider text-sm block">
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

            <ShareBar
              title={project.title}
              className="mt-0 pt-6 border-t-0"
              label="Share this project"
              contentType="project"
            />

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
              <div key={index} className="relative aspect-4/3 rounded-lg overflow-hidden image-zoom">
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
              <div className="relative aspect-4/3 rounded-lg overflow-hidden mb-4">
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
              <div className="relative aspect-4/3 rounded-lg overflow-hidden mb-4">
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
      <ScrollToTop />
    </main>
  )
}
