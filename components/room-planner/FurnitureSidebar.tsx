"use client"

import * as React from "react"
import { FurnitureCategory, FurnitureTemplate } from "@/types/room-planner"
import { FURNITURE_TEMPLATES } from "@/lib/roomPlannerData"
import { FurnitureItem } from "./FurnitureItem"
import { Search, X, Layers, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FurnitureSidebarProps {
  onAddFurniture: (template: FurnitureTemplate) => void
  onCloseMobile?: () => void
  className?: string
}

const CATEGORIES: { id: FurnitureCategory | "all"; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "office", label: "Office" },
  { id: "decor", label: "Decor" },
]

export function FurnitureSidebar({
  onAddFurniture,
  onCloseMobile,
  className,
}: FurnitureSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<
    FurnitureCategory | "all"
  >("all")

  const filteredTemplates = React.useMemo(() => {
    return FURNITURE_TEMPLATES.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.description?.toLowerCase().includes(query) || false
        const matchesCat = item.category.toLowerCase().includes(query)
        return matchesName || matchesDesc || matchesCat
      }
      return true
    })
  }, [searchQuery, selectedCategory])

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border/80 flex items-center justify-between gap-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h2 className="font-serif text-base font-bold text-foreground">
            Furniture Library
          </h2>
        </div>

        {onCloseMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobile}
            className="lg:hidden h-8 w-8 rounded-lg"
            aria-label="Close furniture drawer"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-border/60">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search furniture (e.g. Sofa, Bed, Desk)..."
            className="h-9 pl-9 pr-8 text-xs rounded-xl bg-background border-border"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Chips Scroll Area */}
      <div className="px-4 py-3 border-b border-border/60 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Instructions Tip */}
      <div className="px-4 py-2 bg-primary/5 text-[11px] text-muted-foreground border-b border-border/40 flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-primary shrink-0" />
        <span>Click or drag furniture onto the canvas</span>
      </div>

      {/* Furniture Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <FurnitureItem
              key={template.id}
              template={template}
              onAdd={onAddFurniture}
            />
          ))
        ) : (
          <div className="py-12 text-center text-xs text-muted-foreground">
            No furniture items match &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </aside>
  )
}
