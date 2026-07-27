import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Sparkles,
  Tag,
} from "lucide-react"
import {
  getCollectionBySlug,
  getCollections,
  Collection,
} from "@/lib/collections"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CollectionCard } from "@/components/collections/CollectionCard"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const collections = getCollections()
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    return {
      title: "Collection Not Found",
    }
  }

  return {
    title: `${collection.title} | Inspiration Collections`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} - NestSpace Design Inspiration`,
      description: collection.description,
      images: [
        {
          url: collection.coverImage,
          width: 1200,
          height: 630,
          alt: collection.title,
        },
      ],
    },
  }
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const allCollections = getCollections()
  const relatedCollections = allCollections
    .filter((c) => c.slug !== collection.slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header & Hero Container */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-muted/30 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap"
          >
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/collections"
              className="hover:text-foreground transition-colors"
            >
              Collections
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none">
              {collection.title}
            </span>
          </nav>

          {/* Back Button */}
          <div className="mb-8">
            <Link href="/collections">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-border/80 text-foreground hover:bg-card shadow-xs"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Collections
              </Button>
            </Link>
          </div>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 font-medium text-xs px-3 py-1"
                >
                  {collection.category}
                </Badge>

                <Badge
                  variant="outline"
                  className="border-border text-foreground font-medium text-xs px-3 py-1"
                >
                  {collection.style} Style
                </Badge>

                {collection.featured && (
                  <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs px-3 py-1 flex items-center gap-1 font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Featured Theme
                  </Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {collection.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {collection.description}
              </p>

              {/* Tag Chips */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span>Theme Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-lg bg-card border border-border/60 px-3 py-1 text-xs font-medium text-foreground shadow-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Bar inside Detail Hero */}
              <div className="pt-4 flex items-center gap-6 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {collection.projectCount} Curated Spaces
                  </span>
                </div>
              </div>
            </div>

            {/* Right Large Cover Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 shadow-xl image-zoom">
                <Image
                  src={collection.coverImage}
                  alt={collection.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Projects in this Collection
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore individual room designs and spatial transformations included in the {collection.title} collection.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/40"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted image-zoom">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-background/90 text-foreground text-xs backdrop-blur-md">
                      {project.roomType}
                    </Badge>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-primary">
                      {project.style} Design
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Portfolio Link if available */}
                  {project.portfolioSlug && (
                    <div className="mt-6 pt-4 border-t border-border/40">
                      <Link
                        href={`/portfolio#${project.portfolioSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <span>View Portfolio Showcase</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Collections Section */}
      {relatedCollections.length > 0 && (
        <section className="py-16 bg-muted/20 border-t border-border/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  More Inspiration
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Related Collections
                </h2>
              </div>
              <Link href="/collections">
                <Button variant="ghost" className="gap-2 text-sm text-primary hover:text-primary">
                  <span>View All Collections</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCollections.map((rel) => (
                <CollectionCard key={rel.id} collection={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </main>
  )
}
