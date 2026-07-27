import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { RoomPlanner } from "@/components/room-planner/RoomPlanner"

export const metadata: Metadata = {
  title: "Interactive 2D Room Planner",
  description:
    "Design and experiment with virtual room layouts. Drag, resize, rotate, and position furniture to visualize your interior space before starting your project.",
  openGraph: {
    title: "Interactive Room Planner | NestSpace Interiors",
    description:
      "Virtual 2D room planning tool for living rooms, bedrooms, kitchens, and executive offices.",
    url: "https://nestspace-interiors.vercel.app/room-planner",
    images: [
      {
        url: "/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interactive Room Planner",
      },
    ],
  },
}

export default function RoomPlannerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <Navigation />
      <RoomPlanner />
      <CTASection />
      <Footer />
    </main>
  )
}
