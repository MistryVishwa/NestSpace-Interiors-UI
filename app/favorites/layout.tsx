import { Metadata } from "next"
import { absoluteUrl } from "@/lib/url"

export const metadata: Metadata = {
  title: "Saved Favorites",
  description:
    "View and manage your bookmarked interior design concepts, room layouts, and style inspirations saved from NestSpace Interiors.",
  keywords: [
    "saved interior designs",
    "favorite room ideas",
    "bookmarked interiors",
    "nestspace favorites",
    "interior design collection",
  ],
  openGraph: {
    title: "Saved Favorites | NestSpace Interiors",
    description:
      "View and manage your bookmarked interior design concepts and style inspirations.",
    url: absoluteUrl("/favorites"),
    type: "website",
    images: [
      {
        url: "/images/portfolio-1.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interiors Saved Favorites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saved Favorites | NestSpace Interiors",
    description:
      "View and manage your bookmarked interior design concepts and style inspirations.",
    images: ["/images/portfolio-1.jpg"],
  },
}

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
