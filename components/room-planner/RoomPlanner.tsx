"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRoomPlanner } from "@/hooks/useRoomPlanner"
import { MATCHING_DESIGNS } from "@/lib/roomPlannerData"
import { PlannerHeader } from "./PlannerHeader"
import { Toolbar } from "./Toolbar"
import { FurnitureSidebar } from "./FurnitureSidebar"
import { RoomCanvas } from "./RoomCanvas"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function RoomPlanner() {
  const {
    roomType,
    roomPreset,
    placedItems,
    selectedId,
    snapToGrid,
    showGrid,
    zoom,
    canUndo,
    setRoomType,
    selectItem,
    addItem,
    updateItem,
    removeItem,
    rotateItem,
    duplicateItem,
    clearRoom,
    resetPlanner,
    undo,
    setSnapToGrid,
    setShowGrid,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useRoomPlanner("living-room")

  const [mobileCatalogOpen, setMobileCatalogOpen] = React.useState(false)

  const matchingPortfolioDesigns = MATCHING_DESIGNS[roomType] || []

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {/* Header Section */}
      <PlannerHeader
        roomType={roomType}
        onRoomTypeChange={setRoomType}
        onToggleMobileSidebar={() => setMobileCatalogOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sidebar (Left 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 h-[680px] sticky top-24">
          <FurnitureSidebar onAddFurniture={addItem} />
        </div>

        {/* Canvas & Toolbar Area (Right 8/9 cols) */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col w-full">
          {/* Top Control Toolbar */}
          <Toolbar
            canUndo={canUndo}
            snapToGrid={snapToGrid}
            showGrid={showGrid}
            zoom={zoom}
            selectedId={selectedId}
            onUndo={undo}
            onReset={resetPlanner}
            onClear={clearRoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetZoom={resetZoom}
            onToggleSnap={setSnapToGrid}
            onToggleGrid={setShowGrid}
            onRotateSelected={() => selectedId && rotateItem(selectedId)}
            onDuplicateSelected={() => selectedId && duplicateItem(selectedId)}
            onDeleteSelected={() => selectedId && removeItem(selectedId)}
          />

          {/* Interactive Room Canvas */}
          <RoomCanvas
            roomPreset={roomPreset}
            placedItems={placedItems}
            selectedId={selectedId}
            showGrid={showGrid}
            zoom={zoom}
            onSelectItem={selectItem}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onRotateItem={rotateItem}
            onDuplicateItem={duplicateItem}
            onRemoveItem={removeItem}
            onOpenMobileCatalog={() => setMobileCatalogOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar Sheet Drawer */}
      <Sheet open={mobileCatalogOpen} onOpenChange={setMobileCatalogOpen}>
        <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-3xl border-t border-border">
          <FurnitureSidebar
            onAddFurniture={(template) => {
              addItem(template)
              setMobileCatalogOpen(false)
            }}
            onCloseMobile={() => setMobileCatalogOpen(false)}
            className="h-full border-none rounded-none"
          />
        </SheetContent>
      </Sheet>

      {/* Explore Matching Portfolio Designs Section */}
      <section className="mt-16 sm:mt-24 pt-12 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tailored Inspiration</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Explore Matching Interior Designs
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Curated real-life transformations matching your current {roomPreset.label} arrangement.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {matchingPortfolioDesigns.map((design, idx) => (
            <div
              key={idx}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] sm:w-48 sm:aspect-square overflow-hidden bg-muted image-zoom shrink-0">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge variant="secondary" className="absolute top-3 left-3 text-xs bg-background/90 backdrop-blur-md">
                  {design.category}
                </Badge>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-1 flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {design.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {design.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40">
                  <Link
                    href={`/portfolio#${design.portfolioSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
