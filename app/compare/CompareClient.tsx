"use client"

import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import {
  COMPARE_PROJECTS,
  CompareProject,
  PresetComparison,
  getCompareProjectBySlug,
} from "@/lib/compareData"
import { CompareHero } from "@/components/compare/CompareHero"
import { CompareSelector } from "@/components/compare/CompareSelector"
import { CompareCard } from "@/components/compare/CompareCard"
import { ComparisonTable } from "@/components/compare/ComparisonTable"
import { DifferenceHighlights } from "@/components/compare/DifferenceHighlights"
import { ComparisonGallery } from "@/components/compare/ComparisonGallery"
import { CompareToolbar } from "@/components/compare/CompareToolbar"
import { EmptyComparison } from "@/components/compare/EmptyComparison"

export default function CompareClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read initial slugs from URL params ?a=slug-a&b=slug-b
  const slugAParam = searchParams.get("a")
  const slugBParam = searchParams.get("b")

  const [projectA, setProjectA] = React.useState<CompareProject | null>(() => {
    if (slugAParam) {
      return getCompareProjectBySlug(slugAParam) || COMPARE_PROJECTS[0]
    }
    return COMPARE_PROJECTS[0] // default slot A
  })

  const [projectB, setProjectB] = React.useState<CompareProject | null>(() => {
    if (slugBParam) {
      return getCompareProjectBySlug(slugBParam) || COMPARE_PROJECTS[1]
    }
    return COMPARE_PROJECTS[1] // default slot B
  })

  const [differencesOnly, setDifferencesOnly] = React.useState(false)

  // Synchronize state changes to URL search params without page reload
  const updateUrl = React.useCallback(
    (newA: CompareProject | null, newB: CompareProject | null) => {
      const params = new URLSearchParams()
      if (newA) params.set("a", newA.slug)
      if (newB) params.set("b", newB.slug)

      const queryString = params.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname
      window.history.replaceState(null, "", newUrl)
    },
    [pathname]
  )

  const handleSelectA = (project: CompareProject | null) => {
    setProjectA(project)
    updateUrl(project, projectB)
  }

  const handleSelectB = (project: CompareProject | null) => {
    setProjectB(project)
    updateUrl(projectA, project)
  }

  const handleSwap = () => {
    const temp = projectA
    setProjectA(projectB)
    setProjectB(temp)
    updateUrl(projectB, temp)
  }

  const handleClear = () => {
    setProjectA(null)
    setProjectB(null)
    updateUrl(null, null)
  }

  const handleSelectPreset = (preset: PresetComparison) => {
    const pA = getCompareProjectBySlug(preset.projectASlug) || null
    const pB = getCompareProjectBySlug(preset.projectBSlug) || null
    setProjectA(pA)
    setProjectB(pB)
    updateUrl(pA, pB)
  }

  const handleAddProjectFromEmpty = (project: CompareProject) => {
    if (!projectA) {
      handleSelectA(project)
    } else if (!projectB) {
      handleSelectB(project)
    }
  }

  const bothSelected = !!projectA && !!projectB
  const hasSelection = !!projectA || !!projectB

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <CompareHero />

      {/* Selector Component */}
      <CompareSelector
        projects={COMPARE_PROJECTS}
        projectA={projectA}
        projectB={projectB}
        onSelectProjectA={handleSelectA}
        onSelectProjectB={handleSelectB}
        onSwapProjects={handleSwap}
        onSelectPreset={handleSelectPreset}
      />

      {/* Sticky Action Toolbar */}
      <CompareToolbar
        hasSelection={hasSelection}
        differencesOnly={differencesOnly}
        onToggleDifferencesOnly={() => setDifferencesOnly((prev) => !prev)}
        onSwapProjects={handleSwap}
        onClearComparison={handleClear}
      />

      {/* Cards Overview Grid (When projects selected) */}
      {hasSelection && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectA ? (
            <CompareCard
              project={projectA}
              slotLetter="A"
              onRemove={() => handleSelectA(null)}
              onChange={() => handleSelectA(null)}
            />
          ) : (
            <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 flex flex-col items-center justify-center text-center min-h-[300px] space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Slot A is Empty</p>
              <p className="text-xs text-muted-foreground max-w-xs">Select a design from the dropdown above to begin comparison.</p>
            </div>
          )}

          {projectB ? (
            <CompareCard
              project={projectB}
              slotLetter="B"
              onRemove={() => handleSelectB(null)}
              onChange={() => handleSelectB(null)}
            />
          ) : (
            <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 flex flex-col items-center justify-center text-center min-h-[300px] space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Slot B is Empty</p>
              <p className="text-xs text-muted-foreground max-w-xs">Select a design from the dropdown above to begin comparison.</p>
            </div>
          )}
        </div>
      )}

      {/* Both Selected Content */}
      {bothSelected && projectA && projectB ? (
        <div className="space-y-12 pt-4">
          {/* Executive Visual & Metric Highlights */}
          <DifferenceHighlights projectA={projectA} projectB={projectB} />

          {/* Full Side-by-Side Comparison Table */}
          <ComparisonTable
            projectA={projectA}
            projectB={projectB}
            differencesOnly={differencesOnly}
            onToggleDifferencesOnly={() => setDifferencesOnly((prev) => !prev)}
          />

          {/* Side-by-Side Image Gallery Viewer */}
          <ComparisonGallery projectA={projectA} projectB={projectB} />
        </div>
      ) : (
        /* Empty / Partial State */
        <EmptyComparison
          projects={COMPARE_PROJECTS}
          projectA={projectA}
          projectB={projectB}
          onSelectProject={handleAddProjectFromEmpty}
          onSelectPreset={handleSelectPreset}
        />
      )}
    </div>
  )
}
