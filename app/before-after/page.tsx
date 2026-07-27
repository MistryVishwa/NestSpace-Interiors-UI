import { Metadata } from "next"
import { getAllComparisons } from "@/lib/beforeAfterData"
import { BeforeAfterHero } from "@/components/before-after/BeforeAfterHero"
import { ComparisonGallery } from "@/components/before-after/ComparisonGallery"

export const metadata: Metadata = {
  title: "Before & After Interior Transformations | NestSpace",
  description:
    "Explore interactive before and after image comparisons of NestSpace interior design transformations. Drag, compare, and experience room optimizations in 4K resolution.",
  openGraph: {
    title: "Before & After Interior Transformations | NestSpace",
    description:
      "Interactive before and after image comparisons of NestSpace interior design transformations.",
    images: ["/images/hero-interior.jpg"],
  },
}

export default function BeforeAfterPage() {
  const projects = getAllComparisons()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BeforeAfterHero />
      <ComparisonGallery projects={projects} />
    </main>
  )
}
