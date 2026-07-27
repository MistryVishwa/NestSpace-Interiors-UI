import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, User, DollarSign, Maximize2, ExternalLink, X, RefreshCw } from "lucide-react"
import { CompareProject } from "@/lib/compareData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CompareCardProps {
  project: CompareProject
  slotLetter: "A" | "B"
  onRemove: () => void
  onChange: () => void
  className?: string
}

export function CompareCard({ project, slotLetter, onRemove, onChange, className }: CompareCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Header Slot Indicator & Actions */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-xl font-mono text-xs font-bold shadow-2xs",
              slotLetter === "A"
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground"
            )}
          >
            {slotLetter}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Project {slotLetter}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onChange}
            className="h-8 text-xs text-muted-foreground hover:text-foreground px-2.5 rounded-xl hover:bg-muted"
            title="Change this project"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Change</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-xl hover:bg-destructive/10"
            title={`Remove Project ${slotLetter}`}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>

      {/* Cover Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted mb-4 border border-border/50">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge className="bg-background/90 text-foreground backdrop-blur-md border border-border/40 text-xs font-medium">
            {project.roomType}
          </Badge>
        </div>
      </div>

      {/* Title & Style */}
      <div className="space-y-1.5 mb-4">
        <h3 className="font-serif text-xl font-bold text-foreground line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-primary">
          {project.style}
        </p>
      </div>

      {/* Key Quick Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/40 text-xs mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase">Budget</p>
            <p className="font-semibold text-foreground truncate">{project.budgetRange}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Maximize2 className="w-3.5 h-3.5 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase">Area</p>
            <p className="font-semibold text-foreground truncate">{project.area}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase">Location</p>
            <p className="font-medium text-foreground truncate">{project.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase">Timeline</p>
            <p className="font-medium text-foreground truncate">{project.duration}</p>
          </div>
        </div>
      </div>

      {/* Link to detail page if exists */}
      <div className="mt-auto pt-2">
        <Link href={`/portfolio/${project.slug}`} target="_blank" className="w-full">
          <Button
            variant="outline"
            className="w-full h-10 text-xs font-semibold rounded-xl border-border/80 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Full Project Case Study</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
