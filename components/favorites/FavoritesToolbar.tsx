"use client"

import { useState } from "react"
import { Search, X, Trash2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RemoveFavoriteDialog } from "./RemoveFavoriteDialog"

interface FavoritesToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedRoomType: string
  onRoomTypeChange: (roomType: string) => void
  selectedStyle: string
  onStyleChange: (style: string) => void
  roomTypes: string[]
  styles: string[]
  totalFavoritesCount: number
  filteredCount: number
  onClearAll: () => void
}

export function FavoritesToolbar({
  searchQuery,
  onSearchChange,
  selectedRoomType,
  onRoomTypeChange,
  selectedStyle,
  onStyleChange,
  roomTypes,
  styles,
  totalFavoritesCount,
  filteredCount,
  onClearAll,
}: FavoritesToolbarProps) {
  const [showClearModal, setShowClearModal] = useState(false)

  const isFiltered = searchQuery.trim() !== "" || selectedRoomType !== "All" || selectedStyle !== "All"

  const handleReset = () => {
    onSearchChange("")
    onRoomTypeChange("All")
    onStyleChange("All")
  }

  return (
    <>
      <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-border/50">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title, style, or room..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl bg-muted/40 border-border/60 focus:bg-background transition-colors text-sm"
              aria-label="Search favorite designs by title, style, or room type"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Clear search text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Room Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground hidden sm:inline-block">
                Room:
              </span>
              <Select value={selectedRoomType} onValueChange={onRoomTypeChange}>
                <SelectTrigger className="w-[140px] sm:w-[150px] h-11 rounded-xl bg-muted/40 border-border/60 text-sm">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="All">All Rooms</SelectItem>
                  {roomTypes.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Style Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground hidden sm:inline-block">
                Style:
              </span>
              <Select value={selectedStyle} onValueChange={onStyleChange}>
                <SelectTrigger className="w-[130px] sm:w-[140px] h-11 rounded-xl bg-muted/40 border-border/60 text-sm">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="All">All Styles</SelectItem>
                  {styles.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear All Favorites Button */}
            {totalFavoritesCount > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowClearModal(true)}
                className="h-11 rounded-xl border-rose-500/30 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors ml-auto sm:ml-0"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Clear All</span>
              </Button>
            )}
          </div>
        </div>

        {/* Counter and Filter Reset Row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <p>
            Showing <span className="font-medium text-foreground">{filteredCount}</span> of{" "}
            <span className="font-medium text-foreground">{totalFavoritesCount}</span> saved design
            {totalFavoritesCount !== 1 ? "s" : ""}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Clear All Modal */}
      <RemoveFavoriteDialog
        open={showClearModal}
        onOpenChange={setShowClearModal}
        onConfirm={onClearAll}
        title="Clear All Favorites?"
        description="Are you sure you want to remove all saved designs from your favorites? This action cannot be undone."
        confirmText="Clear All Favorites"
      />
    </>
  )
}
