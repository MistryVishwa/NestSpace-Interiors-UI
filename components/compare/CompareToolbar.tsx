"use client"

import * as React from "react"
import { ArrowLeftRight, Trash2, Share2, Printer, Filter, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CompareToolbarProps {
  hasSelection: boolean
  differencesOnly: boolean
  onToggleDifferencesOnly: () => void
  onSwapProjects: () => void
  onClearComparison: () => void
}

export function CompareToolbar({
  hasSelection,
  differencesOnly,
  onToggleDifferencesOnly,
  onSwapProjects,
  onClearComparison,
}: CompareToolbarProps) {
  const [copied, setCopied] = React.useState(false)

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  if (!hasSelection) return null

  return (
    <div className="sticky top-20 z-30 mb-8">
      <div className="bg-background/90 backdrop-blur-xl border border-border/80 shadow-md rounded-2xl p-3 sm:px-5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Active Status & Filter */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={differencesOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleDifferencesOnly}
            className={cn(
              "text-xs font-semibold rounded-xl gap-1.5 transition-all h-9",
              differencesOnly
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "border-border/80 hover:border-primary hover:text-primary"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{differencesOnly ? "Differences Only" : "Show All Specs"}</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onSwapProjects}
            className="text-xs text-muted-foreground hover:text-foreground h-9 px-3 rounded-xl hover:bg-muted gap-1.5 hidden sm:flex"
            title="Swap Project A and B"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-primary" />
            <span>Swap A ↔ B</span>
          </Button>
        </div>

        {/* Right Side: Share, Print, Clear */}
        <div className="flex items-center gap-2">
          {/* Share Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs font-semibold h-9 rounded-xl border-border/80 hover:border-primary hover:text-primary gap-1.5 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </>
            )}
          </Button>

          {/* Print / PDF Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs font-semibold h-9 rounded-xl border-border/80 hover:border-primary hover:text-primary gap-1.5 transition-all hidden md:flex"
            title="Print or Export Comparison"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </Button>

          {/* Clear Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearComparison}
            className="text-xs text-muted-foreground hover:text-destructive h-9 px-3 rounded-xl hover:bg-destructive/10 gap-1.5"
            title="Reset comparison"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
