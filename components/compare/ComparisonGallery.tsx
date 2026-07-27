"use client"

import * as React from "react"
import Image from "next/image"
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { CompareProject } from "@/lib/compareData"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ComparisonGalleryProps {
  projectA: CompareProject
  projectB: CompareProject
}

export function ComparisonGallery({ projectA, projectB }: ComparisonGalleryProps) {
  const [activeImageAIndex, setActiveImageAIndex] = React.useState(0)
  const [activeImageBIndex, setActiveImageBIndex] = React.useState(0)
  const [zoomImage, setZoomImage] = React.useState<{ src: string; title: string } | null>(null)

  const currentImageA = projectA.galleryImages[activeImageAIndex] || projectA.coverImage
  const currentImageB = projectB.galleryImages[activeImageBIndex] || projectB.coverImage

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <span>Visual Photography Gallery</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Compare camera angles, lighting conditions, and spatial textures side-by-side.
          </p>
        </div>
      </div>

      {/* Side-by-Side Dual View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project A Gallery Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px]">A</span>
              {projectA.title}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Photo {activeImageAIndex + 1} of {projectA.galleryImages.length}
            </span>
          </div>

          {/* Featured Active Image A */}
          <div className="group relative aspect-16/10 rounded-2xl overflow-hidden bg-muted border border-border/50">
            <Image
              src={currentImageA}
              alt={`${projectA.title} gallery image ${activeImageAIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-300 group-hover:scale-102"
            />
            <button
              type="button"
              onClick={() => setZoomImage({ src: currentImageA, title: projectA.title })}
              className="absolute bottom-3 right-3 p-2 rounded-xl bg-background/80 text-foreground backdrop-blur-md hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Gallery A */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {projectA.galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageAIndex(idx)}
                className={cn(
                  "relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 bg-muted",
                  activeImageAIndex === idx
                    ? "border-primary ring-2 ring-primary/20 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project B Gallery Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-accent-foreground uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-accent/20 text-foreground flex items-center justify-center font-mono text-[10px]">B</span>
              {projectB.title}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Photo {activeImageBIndex + 1} of {projectB.galleryImages.length}
            </span>
          </div>

          {/* Featured Active Image B */}
          <div className="group relative aspect-16/10 rounded-2xl overflow-hidden bg-muted border border-border/50">
            <Image
              src={currentImageB}
              alt={`${projectB.title} gallery image ${activeImageBIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-300 group-hover:scale-102"
            />
            <button
              type="button"
              onClick={() => setZoomImage({ src: currentImageB, title: projectB.title })}
              className="absolute bottom-3 right-3 p-2 rounded-xl bg-background/80 text-foreground backdrop-blur-md hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Gallery B */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {projectB.galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageBIndex(idx)}
                className={cn(
                  "relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 bg-muted",
                  activeImageBIndex === idx
                    ? "border-primary ring-2 ring-primary/20 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!zoomImage} onOpenChange={() => setZoomImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border">
          <DialogHeader className="p-4 border-b border-border/60 flex items-center justify-between">
            <DialogTitle className="text-base font-serif font-bold">
              {zoomImage?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-16/10 w-full bg-black/90 flex items-center justify-center">
            {zoomImage && (
              <Image
                src={zoomImage.src}
                alt={zoomImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
