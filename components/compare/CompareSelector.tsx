"use client"

import * as React from "react"
import Image from "next/image"
import { Search, ArrowLeftRight, Dices, Check, ChevronDown, Sparkles, X } from "lucide-react"
import { CompareProject, PRESET_COMPARISONS, PresetComparison } from "@/lib/compareData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CompareSelectorProps {
  projects: CompareProject[]
  projectA: CompareProject | null
  projectB: CompareProject | null
  onSelectProjectA: (project: CompareProject | null) => void
  onSelectProjectB: (project: CompareProject | null) => void
  onSwapProjects: () => void
  onSelectPreset: (preset: PresetComparison) => void
}

function ProjectDropdown({
  label,
  slotLetter,
  selectedProject,
  disabledProject,
  projects,
  onSelect,
}: {
  label: string
  slotLetter: "A" | "B"
  selectedProject: CompareProject | null
  disabledProject: CompareProject | null
  projects: CompareProject[]
  onSelect: (project: CompareProject | null) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Filter projects by search query
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.roomType.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      )
    })
  }, [projects, searchQuery])

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
            {slotLetter}
          </span>
          {label}
        </span>
        {selectedProject && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
            title={`Clear Project ${slotLetter}`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "w-full text-left p-3 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 bg-background",
          isOpen
            ? "border-primary ring-2 ring-primary/20 shadow-md"
            : "border-border hover:border-primary/40 shadow-xs"
        )}
      >
        {selectedProject ? (
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted border border-border/50">
              <Image
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-foreground truncate">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {selectedProject.roomType} • {selectedProject.style}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-dashed border-border shrink-0">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Select Project {slotLetter}...</p>
              <p className="text-xs text-muted-foreground">Choose design to compare</p>
            </div>
          </div>
        )}

        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-border bg-popover p-2 shadow-xl animate-in fade-in-50 zoom-in-95 duration-150 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {/* Search Input */}
          <div className="p-2 sticky top-0 bg-popover z-10 border-b border-border/60 mb-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, room, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-muted/50 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List Options */}
          <div className="space-y-1">
            {filteredProjects.length === 0 ? (
              <div className="p-4 text-center text-xs text-muted-foreground">
                No matching projects found.
              </div>
            ) : (
              filteredProjects.map((project) => {
                const isSelected = selectedProject?.id === project.id
                const isDisabled = disabledProject?.id === project.id

                return (
                  <button
                    key={project.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        onSelect(project)
                        setIsOpen(false)
                        setSearchQuery("")
                      }
                    }}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs",
                      isSelected && "bg-primary/10 text-primary font-semibold",
                      isDisabled
                        ? "opacity-40 cursor-not-allowed bg-muted/20"
                        : !isSelected && "hover:bg-muted/80 text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{project.title}</div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {project.roomType} • {project.budgetRange}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isDisabled && (
                        <Badge variant="outline" className="text-[10px] text-muted-foreground px-1.5 py-0">
                          Selected in {slotLetter === "A" ? "B" : "A"}
                        </Badge>
                      )}
                      {isSelected && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function CompareSelector({
  projects,
  projectA,
  projectB,
  onSelectProjectA,
  onSelectProjectB,
  onSwapProjects,
  onSelectPreset,
}: CompareSelectorProps) {

  const handleRandomSelect = () => {
    if (projects.length < 2) return
    const randomAIndex = Math.floor(Math.random() * projects.length)
    let randomBIndex = Math.floor(Math.random() * projects.length)
    while (randomBIndex === randomAIndex) {
      randomBIndex = Math.floor(Math.random() * projects.length)
    }
    onSelectProjectA(projects[randomAIndex])
    onSelectProjectB(projects[randomBIndex])
  }

  return (
    <div className="space-y-6 mb-10">
      {/* Dropdowns & Swap Container */}
      <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 relative">
          {/* Dropdown Project A */}
          <ProjectDropdown
            label="First Design"
            slotLetter="A"
            selectedProject={projectA}
            disabledProject={projectB}
            projects={projects}
            onSelect={onSelectProjectA}
          />

          {/* Swap Button */}
          <div className="flex items-center justify-center self-center my-1 lg:my-0 lg:pt-6">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onSwapProjects}
              disabled={!projectA && !projectB}
              title="Swap Project A and B"
              className="h-11 w-11 rounded-full border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-2xs"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="sr-only">Swap Project A and Project B</span>
            </Button>
          </div>

          {/* Dropdown Project B */}
          <ProjectDropdown
            label="Second Design"
            slotLetter="B"
            selectedProject={projectB}
            disabledProject={projectA}
            projects={projects}
            onSelect={onSelectProjectB}
          />
        </div>

        {/* Action Controls & Presets */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Presets List */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Quick Presets:
            </span>
            {PRESET_COMPARISONS.map((preset) => {
              const isActive =
                (projectA?.slug === preset.projectASlug && projectB?.slug === preset.projectBSlug) ||
                (projectA?.slug === preset.projectBSlug && projectB?.slug === preset.projectASlug)

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-xl border font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                      : "bg-muted/40 border-border/60 hover:border-primary/40 hover:bg-muted text-foreground"
                  )}
                >
                  {preset.title}
                </button>
              )
            })}
          </div>

          {/* Random Pairing Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRandomSelect}
            className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
          >
            <Dices className="w-3.5 h-3.5 text-primary" />
            <span>Random Pair</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
