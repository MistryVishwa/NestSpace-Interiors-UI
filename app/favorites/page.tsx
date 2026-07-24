"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useFavorites } from "@/hooks/useFavorites"
import { FavoritesHero } from "@/components/favorites/FavoritesHero"
import { FavoritesToolbar } from "@/components/favorites/FavoritesToolbar"
import { FavoritesGrid } from "@/components/favorites/FavoritesGrid"
import { EmptyFavorites } from "@/components/favorites/EmptyFavorites"

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites, isMounted } = useFavorites()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoomType, setSelectedRoomType] = useState("All")
  const [selectedStyle, setSelectedStyle] = useState("All")

  // Extract unique room types and styles from saved items or default set
  const roomTypes = useMemo(() => {
    const set = new Set<string>()
    favorites.forEach((item) => {
      if (item.roomType) set.add(item.roomType)
    })
    return Array.from(set).sort()
  }, [favorites])

  const styles = useMemo(() => {
    const set = new Set<string>()
    favorites.forEach((item) => {
      if (item.style) set.add(item.style)
    })
    return Array.from(set).sort()
  }, [favorites])

  // Filter logic
  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.style.toLowerCase().includes(q) ||
        item.roomType.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)

      const matchesRoom = selectedRoomType === "All" || item.roomType === selectedRoomType
      const matchesStyle = selectedStyle === "All" || item.style === selectedStyle

      return matchesSearch && matchesRoom && matchesStyle
    })
  }, [favorites, searchQuery, selectedRoomType, selectedStyle])

  const hasFilterActive = searchQuery.trim() !== "" || selectedRoomType !== "All" || selectedStyle !== "All"

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <FavoritesHero />

      {/* Main Content Section */}
      <section className="py-12 pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {!isMounted ? (
            // Loading skeleton while mounting client state
            <div className="py-20 text-center text-muted-foreground text-sm animate-pulse">
              Loading your saved favorite designs...
            </div>
          ) : favorites.length === 0 ? (
            // Empty State when no items are saved
            <EmptyFavorites />
          ) : (
            // Favorites Content
            <div>
              {/* Toolbar */}
              <FavoritesToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedRoomType={selectedRoomType}
                onRoomTypeChange={setSelectedRoomType}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                roomTypes={roomTypes}
                styles={styles}
                totalFavoritesCount={favorites.length}
                filteredCount={filteredFavorites.length}
                onClearAll={clearFavorites}
              />

              {/* Grid or Filtered Empty State */}
              {filteredFavorites.length === 0 ? (
                <EmptyFavorites
                  hasFilterActive={hasFilterActive}
                  onResetFilters={() => {
                    setSearchQuery("")
                    setSelectedRoomType("All")
                    setSelectedStyle("All")
                  }}
                />
              ) : (
                <FavoritesGrid favorites={filteredFavorites} onRemove={removeFavorite} />
              )}
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
