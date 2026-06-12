import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loading state for the Portfolio masonry grid.
 * Rendered automatically by Next.js App Router while the page suspends.
 * Mirrors the real grid: 8 items with alternating tall (aspect-3/4) and
 * regular (aspect-4/3) shapes to prevent layout shift on load.
 */

// Matches the shape of the real portfolioItems array in page.tsx
const skeletonItems = [
  { size: "tall" },    // Modern Living Room
  { size: "regular" }, // Luxury Kitchen
  { size: "regular" }, // Executive Office
  { size: "tall" },    // Spa Bathroom
  { size: "regular" }, // Elegant Dining
  { size: "regular" }, // Penthouse Living
  { size: "tall" },    // Cozy Bedroom
  { size: "regular" }, // Modern Workspace
]

export default function PortfolioLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero section placeholder */}
      <section className="pt-36 pb-24 bg-linear-to-b from-secondary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary)_0%,transparent_50%)] opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-4 w-32 mx-auto rounded-full" />
            <Skeleton className="h-16 w-3/4 mx-auto rounded-xl" />
            <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* Portfolio Grid section placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filter buttons placeholder */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["All", "Home", "Office", "Kitchen", "Luxury"].map((label) => (
              <Skeleton
                key={label}
                className="h-11 w-20 rounded-full"
              />
            ))}
          </div>

          {/* Masonry grid skeleton — mirrors the real grid structure */}
          <div className="masonry-grid" aria-label="Loading portfolio items…" aria-busy="true">
            {skeletonItems.map((item, index) => (
              <div key={index} className="masonry-item">
                <Skeleton
                  className={[
                    "rounded-2xl w-full",
                    item.size === "tall" ? "aspect-3/4" : "aspect-4/3",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>

          {/* Load More button placeholder */}
          <div className="text-center mt-20">
            <Skeleton className="h-14 w-48 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    </main>
  )
}
