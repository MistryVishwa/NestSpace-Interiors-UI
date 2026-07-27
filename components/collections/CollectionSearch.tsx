"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CollectionSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
}

export function CollectionSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
}: CollectionSearchProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="collection-search" className="sr-only">
        Search inspiration collections by title, category, style, or tag
      </label>

      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          id="collection-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search collections by title, style, or tag (e.g. Modern, Kitchen, Wood)..."
          className="h-12 pl-11 pr-10 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/70 shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all text-sm"
        />

        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClearSearch}
            className="absolute right-2 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Clear search input"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
