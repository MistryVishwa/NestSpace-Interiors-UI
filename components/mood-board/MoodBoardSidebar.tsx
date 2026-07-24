"use client"

import React, { useState, useMemo } from "react"
import {
  COLOR_PALETTES,
  TEXTURES,
  MATERIALS,
  FURNITURE_ITEMS,
  INSPIRATION_IMAGES,
} from "@/lib/moodBoardData"
import {
  BoardItem,
  AssetCategory,
  ColorPalette,
  Texture,
  Material,
  FurnitureReference,
  ImageAsset,
} from "@/types/mood-board"
import Image from "next/image"
import {
  Search,
  Plus,
  Palette,
  Grid,
  Layers,
  Armchair,
  Image as ImageIcon,
  StickyNote,
  X,
  SlidersHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MoodBoardSidebarProps {
  onAddItem: (item: Omit<BoardItem, "id" | "x" | "y" | "zIndex">) => void
  isOpenOnMobile?: boolean
  onCloseMobile?: () => void
}

export const MoodBoardSidebar: React.FC<MoodBoardSidebarProps> = ({
  onAddItem,
  isOpenOnMobile = true,
  onCloseMobile,
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filtered Assets
  const filteredColors = useMemo(() => {
    return COLOR_PALETTES.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  const filteredTextures = useMemo(() => {
    return TEXTURES.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.patternType.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const filteredMaterials = useMemo(() => {
    return MATERIALS.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.finish.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const filteredFurniture = useMemo(() => {
    return FURNITURE_ITEMS.filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.style.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const filteredImages = useMemo(() => {
    return INSPIRATION_IMAGES.filter(
      (img) =>
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  const handleAddColor = (col: ColorPalette) => {
    onAddItem({
      type: "color",
      width: 200,
      height: 140,
      title: col.name,
      colorData: col,
    })
  }

  const handleAddTexture = (tex: Texture) => {
    onAddItem({
      type: "texture",
      width: 220,
      height: 160,
      title: tex.name,
      textureData: tex,
    })
  }

  const handleAddMaterial = (mat: Material) => {
    onAddItem({
      type: "material",
      width: 220,
      height: 170,
      title: mat.name,
      materialData: mat,
    })
  }

  const handleAddFurniture = (fur: FurnitureReference) => {
    onAddItem({
      type: "furniture",
      width: 260,
      height: 180,
      title: fur.name,
      furnitureData: fur,
    })
  }

  const handleAddImage = (img: ImageAsset) => {
    onAddItem({
      type: "image",
      width: 280,
      height: 200,
      title: img.title,
      imageData: img,
      frameStyle: "rounded",
    })
  }

  const handleAddCustomNote = () => {
    onAddItem({
      type: "note",
      width: 220,
      height: 150,
      title: "New Note",
      noteData: {
        text: "Add your designer inspiration notes, texture references, or client ideas here...",
        backgroundColor: "rgba(254, 243, 199, 0.95)",
        textColor: "#451a03",
      },
    })
  }

  const categories: { id: AssetCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All", icon: SlidersHorizontal },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "textures", label: "Textures", icon: Grid },
    { id: "materials", label: "Materials", icon: Layers },
    { id: "furniture", label: "Furniture", icon: Armchair },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "notes", label: "Notes", icon: StickyNote },
  ]

  return (
    <aside
      className={cn(
        "w-full lg:w-80 bg-card border-r border-border flex flex-col h-full z-30 transition-all duration-300",
        !isOpenOnMobile && "hidden lg:flex"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Asset Library</h3>
          <p className="text-[11px] text-muted-foreground">
            Click to add items to your board
          </p>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1 hover:bg-muted rounded-md text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search colors, materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-muted/50 border border-input rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="p-2 border-b border-border flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Assets Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {/* Quick Add Custom Note */}
        {(activeCategory === "all" || activeCategory === "notes") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Notes & Annotation
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddCustomNote}
              className="w-full p-3 rounded-xl border border-dashed border-amber-400/80 bg-amber-500/5 hover:bg-amber-500/10 text-amber-800 dark:text-amber-300 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-semibold">Add Designer Sticky Note</span>
              </div>
              <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        )}

        {/* Colors Category */}
        {(activeCategory === "all" || activeCategory === "colors") &&
          filteredColors.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                Color Palettes ({filteredColors.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {filteredColors.map((col) => (
                  <div
                    key={col.id}
                    onClick={() => handleAddColor(col)}
                    className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col gap-1.5 group"
                  >
                    <div
                      className="h-10 w-full rounded-md shadow-inner relative flex items-center justify-center"
                      style={{ backgroundColor: col.hex }}
                    >
                      <Plus className="w-4 h-4 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold truncate text-foreground">
                        {col.name}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {col.hex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Textures Category */}
        {(activeCategory === "all" || activeCategory === "textures") &&
          filteredTextures.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                Surface Textures ({filteredTextures.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {filteredTextures.map((tex) => (
                  <div
                    key={tex.id}
                    onClick={() => handleAddTexture(tex)}
                    className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col gap-1.5 group"
                  >
                    <div className="relative h-14 w-full rounded-md overflow-hidden bg-neutral-900">
                      <Image
                        src={tex.imageUrl}
                        alt={tex.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                        sizes="150px"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-foreground truncate">
                      {tex.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Materials Category */}
        {(activeCategory === "all" || activeCategory === "materials") &&
          filteredMaterials.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                Material Samples ({filteredMaterials.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {filteredMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => handleAddMaterial(mat)}
                    className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col gap-1.5 group"
                  >
                    <div className="relative h-14 w-full rounded-md overflow-hidden bg-neutral-900">
                      <Image
                        src={mat.imageUrl}
                        alt={mat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                        sizes="150px"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground truncate">
                        {mat.name}
                      </p>
                      <span className="text-[9px] text-muted-foreground capitalize">
                        {mat.finish}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Furniture Category */}
        {(activeCategory === "all" || activeCategory === "furniture") &&
          filteredFurniture.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                Furniture ({filteredFurniture.length})
              </span>
              <div className="space-y-2">
                {filteredFurniture.map((fur) => (
                  <div
                    key={fur.id}
                    onClick={() => handleAddFurniture(fur)}
                    className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex items-center gap-2.5 group"
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-neutral-900 shrink-0">
                      <Image
                        src={fur.imageUrl}
                        alt={fur.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {fur.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {fur.vendor} • {fur.estimatedPrice}
                      </p>
                    </div>
                    <div className="p-1 rounded bg-primary/10 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Images Category */}
        {(activeCategory === "all" || activeCategory === "images") &&
          filteredImages.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                Inspiration Photos ({filteredImages.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => handleAddImage(img)}
                    className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col gap-1.5 group"
                  >
                    <div className="relative h-20 w-full rounded-md overflow-hidden bg-neutral-900">
                      <Image
                        src={img.imageUrl}
                        alt={img.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="150px"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-foreground truncate">
                      {img.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </aside>
  )
}
