import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { MoodBoard } from "@/components/mood-board/MoodBoard"

export const metadata: Metadata = {
  title: "Interior Mood Board Builder | NestSpace Interiors",
  description:
    "Curate, organize, and visualize your interior spatial inspiration. Drag and drop materials, color swatches, textures, and furniture references into a custom mood board.",
  openGraph: {
    title: "Interior Mood Board Builder | NestSpace Interiors",
    description:
      "Interactive interior design mood board builder for materials, color palettes, textures, and furniture arrangements.",
    url: "https://nestspace-interiors.vercel.app/mood-board",
    images: [
      {
        url: "/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interior Mood Board Builder",
      },
    ],
  },
}

export default function MoodBoardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20">
      <Navigation />
      <MoodBoard />
      <CTASection />
      <Footer />
    </main>
  )
}
