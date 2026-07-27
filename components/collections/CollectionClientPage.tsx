"use client"

import * as React from "react"
import { Collection, CollectionStatsData } from "@/lib/collections"
import { CollectionSearch } from "./CollectionSearch"
import { CollectionFilters } from "./CollectionFilters"
import { CollectionGrid } from "./CollectionGrid"
import { CollectionEmptyState } from "./CollectionEmptyState"
import { CollectionStats } from "./CollectionStats"

interface CollectionClientPageProps {
  initialCollections: Collection[]
  categories: string[]
  styles: string[]
  stats: CollectionStatsData
}

export function CollectionClientPage({
  initialCollections,
  categories,
  styles,
  stats,
}: CollectionClientPageProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = React.useState<string | null>(null)

  const filteredCollections = React.useMemo(() => {
    return initialCollections.filter((collection) => {
      // Category filter
      if (selectedCategory && collection.category !== selectedCategory) {
        return false
      }

      // Style filter
      if (selectedStyle && collection.style !== selectedStyle) {
        return false
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim()
        const matchesTitle = collection.title.toLowerCase().includes(query)
        const matchesDesc = collection.description.toLowerCase().includes(query)
        const matchesCategory = collection.category.toLowerCase().includes(query)
        const matchesStyle = collection.style.toLowerCase().includes(query)
        const matchesTags = collection.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        )

        return matchesTitle || matchesDesc || matchesCategory || matchesStyle || matchesTags
      }

      return true
    })
  }, [initialCollections, searchQuery, selectedCategory, selectedStyle])

  const handleResetFilters = React.useCallback(() => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedStyle(null)
  }, [])

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-12 pb-24">
      {/* Metrics Bar */}
      <CollectionStats stats={stats} />

      {/* Controls Container: Search & Filters */}
      <div className="space-y-8 my-10">
        <CollectionSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery("")}
        />

        <CollectionFilters
          categories={categories}
          styles={styles}
          selectedCategory={selectedCategory}
          selectedStyle={selectedStyle}
          onSelectCategory={setSelectedCategory}
          onSelectStyle={setSelectedStyle}
          onResetFilters={handleResetFilters}
          totalResultsCount={filteredCollections.length}
        />
      </div>

      {/* Main Grid or Empty State */}
      {filteredCollections.length > 0 ? (
        <CollectionGrid collections={filteredCollections} />
      ) : (
        <CollectionEmptyState
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedStyle={selectedStyle}
          onReset={handleResetFilters}
        />
      )}
    </section>
  )
}
