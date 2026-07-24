"use client"

import React, { useState, useMemo, useRef } from "react"
import { ComparisonProject } from "@/types/before-after"
import { ROOM_TYPES, INTERIOR_STYLES } from "@/lib/beforeAfterData"
import { BeforeAfterSlider } from "./BeforeAfterSlider"
import { ComparisonCard } from "./ComparisonCard"
import { FullscreenViewer } from "./FullscreenViewer"
import { EmptyComparison } from "./EmptyComparison"
import { Button } from "@/components/ui/button"
import { Search, Filter, Sparkles, MapPin, Clock, DollarSign, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComparisonGalleryProps {
  projects: ComparisonProject[]
}

export function ComparisonGallery({ projects }: ComparisonGalleryProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("All")
  const [selectedStyle, setSelectedStyle] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<"featured" | "title">("featured")
  const [activeProject, setActiveProject] = useState<ComparisonProject>(projects[0])
  const [fullscreenProject, setFullscreenProject] = useState<ComparisonProject | null>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)

  // Filter projects based on room type, style, and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesRoom = selectedRoom === "All" || project.roomType === selectedRoom
      const matchesStyle = selectedStyle === "All" || project.style === selectedStyle
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesRoom && matchesStyle && matchesSearch
    }).sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  }, [projects, selectedRoom, selectedStyle, searchQuery, sortBy])

  const handleSelectProject = (project: ComparisonProject) => {
    setActiveProject(project)
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleResetFilters = () => {
    setSelectedRoom("All")
    setSelectedStyle("All")
    setSearchQuery("")
    setSortBy("featured")
  }

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Gallery Filter Toolbar */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-14">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-card border border-border/60 shadow-md">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transformations by room, style, or feature..."
                className="w-full h-11 pl-10 pr-4 rounded-2xl bg-muted/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown Filters & Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Style Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="h-11 px-3.5 rounded-2xl bg-muted/50 border border-border/60 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                  aria-label="Filter by Interior Style"
                >
                  <option value="All">All Interior Styles</option>
                  {INTERIOR_STYLES.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "title")}
                className="h-11 px-3.5 rounded-2xl bg-muted/50 border border-border/60 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                aria-label="Sort projects"
              >
                <option value="featured">Sort by Featured</option>
                <option value="title">Sort by Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Room Type Pills / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedRoom("All")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0",
                selectedRoom === "All"
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              All Rooms ({projects.length})
            </button>
            {ROOM_TYPES.map((room) => {
              const count = projects.filter((p) => p.roomType === room).length
              return (
                <button
                  key={room}
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5",
                    selectedRoom === room
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{room}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px]",
                      selectedRoom === room
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Showcase Component */}
        {activeProject && (
          <div
            ref={showcaseRef}
            className="mb-14 sm:mb-20 p-6 sm:p-8 lg:p-10 rounded-3xl bg-card border border-border/80 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              {/* Main Interactive Slider */}
              <div className="w-full lg:w-7/12">
                <BeforeAfterSlider
                  beforeImage={activeProject.beforeImage}
                  afterImage={activeProject.afterImage}
                  roomType={activeProject.roomType}
                  style={activeProject.style}
                  aspectRatio="aspect-[16/10]"
                  initialPosition={50}
                  onToggleFullscreen={() => setFullscreenProject(activeProject)}
                  priority
                />
              </div>

              {/* Showcase Details Column */}
              <div className="w-full lg:w-5/12 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Transformation
                  </span>
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    {activeProject.roomType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">
                    {activeProject.style}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    {activeProject.description}
                  </p>
                </div>

                {/* Designer Notes Callout Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed text-foreground">
                  <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 mb-1">
                    <Lightbulb className="w-4 h-4" />
                    Designer Takeaway
                  </div>
                  <p className="italic text-muted-foreground">{activeProject.designerNotes}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {activeProject.location && (
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground font-medium flex items-center gap-1 mb-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Location
                      </span>
                      <span className="font-bold text-foreground">{activeProject.location}</span>
                    </div>
                  )}
                  {activeProject.duration && (
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground font-medium flex items-center gap-1 mb-0.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> Timeline
                      </span>
                      <span className="font-bold text-foreground">{activeProject.duration}</span>
                    </div>
                  )}
                  {activeProject.budgetRange && (
                    <div className="col-span-2 p-3 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground font-medium flex items-center gap-1 mb-0.5">
                        <DollarSign className="w-3.5 h-3.5 text-primary" /> Budget Estimate
                      </span>
                      <span className="font-bold text-foreground">{activeProject.budgetRange}</span>
                    </div>
                  )}
                </div>

                {/* Fullscreen CTA Button */}
                <Button
                  onClick={() => setFullscreenProject(activeProject)}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold text-sm mt-2"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  View 4K Fullscreen Experience
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              All Transformations ({filteredProjects.length})
            </h3>
          </div>

          {filteredProjects.length === 0 ? (
            <EmptyComparison onResetFilters={handleResetFilters} searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ComparisonCard
                  key={project.id}
                  project={project}
                  onSelectProject={handleSelectProject}
                  onOpenFullscreen={(proj) => setFullscreenProject(proj)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Modal Viewer */}
        <FullscreenViewer
          project={fullscreenProject}
          isOpen={!!fullscreenProject}
          onClose={() => setFullscreenProject(null)}
        />
      </div>
    </section>
  )
}
