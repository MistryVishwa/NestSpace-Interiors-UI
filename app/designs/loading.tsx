import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loading state for the Designs gallery masonry grid.
 * Rendered automatically by Next.js App Router while the page suspends.
 * Mirrors the real grid: 16 items with the same size distribution as
 * allDesigns in page.tsx (tall / wide / regular) to prevent layout shift.
 */

// Matches the size distribution of the real allDesigns array in page.tsx
const skeletonItems = [
  { size: "tall" },    // Contemporary Living Space
  { size: "regular" }, // Modern Chef's Kitchen
  { size: "wide" },    // Executive Corner Office
  { size: "regular" }, // Spa-Inspired Bathroom
  { size: "tall" },    // Elegant Dining Room
  { size: "regular" }, // Luxury Penthouse Suite
  { size: "regular" }, // Cozy Master Bedroom
  { size: "wide" },    // Creative Studio Space
  { size: "regular" }, // Minimalist Living Area
  { size: "tall" },    // Gourmet Kitchen Island
  { size: "regular" }, // Tranquil Guest Bedroom
  { size: "regular" }, // Modern Powder Room
  { size: "wide" },    // Grand Dining Hall
  { size: "tall" },    // Private Wine Cellar
  { size: "regular" }, // Open Concept Kitchen
  { size: "regular" }, // Home Office Nook
]

// Category filter labels matching the real categories array in page.tsx
const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining", "Luxury"]

export default function DesignsLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero section placeholder */}
      <section className="pt-36 pb-24 bg-linear-to-b from-secondary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary)_0%,transparent_50%)] opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-4 w-36 mx-auto rounded-full" />
            <Skeleton className="h-16 w-3/4 mx-auto rounded-xl" />
            <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* Gallery section placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filter buttons placeholder */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((label) => (
              <Skeleton
                key={label}
                className="h-10 w-24 rounded-full"
              />
            ))}
          </div>

          {/* Masonry grid skeleton — mirrors the real grid structure */}
          <div className="masonry-grid" aria-label="Loading design gallery…" aria-busy="true">
            {skeletonItems.map((item, index) => (
              <div key={index} className="masonry-item">
                <Skeleton
                  className={[
                    "rounded-2xl w-full",
                    item.size === "tall"
                      ? "aspect-3/4"
                      : item.size === "wide"
                        ? "aspect-video"
                        : "aspect-4/3",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>

          {/* Results count placeholder */}
          <div className="text-center mt-16">
            <Skeleton className="h-10 w-56 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    </main>
  )
}
