import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { CollectionHero } from "@/components/collections/CollectionHero"
import { CollectionClientPage } from "@/components/collections/CollectionClientPage"
import {
  getCollections,
  getCollectionCategories,
  getCollectionStyles,
  getCollectionStats,
} from "@/lib/collections"

export const metadata: Metadata = {
  title: "Design Inspiration Collections",
  description:
    "Explore curated interior design themes and inspiration collections by room type, style, and spatial aesthetic at NestSpace Interiors.",
  openGraph: {
    title: "Design Inspiration Collections | NestSpace Interiors",
    description:
      "Handpicked interior design collections grouping luxury residential, modern living, Scandinavian kitchen, and workspace projects.",
    url: "https://nestspace-interiors.vercel.app/collections",
    images: [
      {
        url: "/images/portfolio-1.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Design Inspiration Collections",
      },
    ],
  },
}

export default function CollectionsPage() {
  const collections = getCollections()
  const categories = getCollectionCategories()
  const styles = getCollectionStyles()
  const stats = getCollectionStats()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <CollectionHero />
      <CollectionClientPage
        initialCollections={collections}
        categories={categories}
        styles={styles}
        stats={stats}
      />
      <CTASection />
      <Footer />
    </main>
  )
}
