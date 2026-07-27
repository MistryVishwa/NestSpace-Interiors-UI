import { Metadata } from "next"
import * as React from "react"
import { Suspense } from "react"
import CompareClient from "./CompareClient"

export const metadata: Metadata = {
  title: "Compare Interior Designs | NestSpace",
  description:
    "Evaluate interior design projects side-by-side. Compare room styles, materials, color palettes, furniture arrangements, square footage, and budget ranges.",
  keywords: [
    "interior design comparison",
    "compare interior designs",
    "living room vs kitchen",
    "interior materials comparison",
    "color palette comparison",
    "interior budget estimator",
    "NestSpace",
  ],
  openGraph: {
    title: "Compare Interior Designs | NestSpace",
    description:
      "Evaluate interior design projects side-by-side. Compare styles, materials, color palettes, and budget ranges.",
    url: "https://nestspace.com/compare",
    siteName: "NestSpace Interiors",
    images: [
      {
        url: "/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interior Design Comparison Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Interior Designs | NestSpace",
    description:
      "Side-by-side interior design comparison tool. Evaluate styles, materials, color palettes, and budget ranges.",
    images: ["/images/hero-interior.jpg"],
  },
}

export default function ComparePage() {
  return (
    <main className="min-w-0 min-h-screen bg-background pt-20 sm:pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
              Loading interior comparison tool...
            </div>
          }
        >
          <CompareClient />
        </Suspense>
      </div>
    </main>
  )
}
