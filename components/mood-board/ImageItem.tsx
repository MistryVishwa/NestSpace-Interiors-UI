"use client"

import React from "react"
import Image from "next/image"
import { ImageAsset } from "@/types/mood-board"
import { cn } from "@/lib/utils"
import { Image as ImageIcon } from "lucide-react"

interface ImageItemProps {
  imageData?: ImageAsset
  title?: string
  frameStyle?: "none" | "polaroid" | "rounded" | "shadow" | "bordered"
}

export const ImageItem: React.FC<ImageItemProps> = ({
  imageData,
  title,
  frameStyle = "rounded",
}) => {
  const displayTitle = title || imageData?.title || "Inspiration Image"
  const imageUrl = imageData?.imageUrl || "/images/portfolio-1.jpg"

  if (frameStyle === "polaroid") {
    return (
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 shadow-xl rounded-sm flex flex-col transition-all">
        <div className="relative flex-1 w-full min-h-0 bg-neutral-100 dark:bg-zinc-800 overflow-hidden">
          <Image
            src={imageUrl}
            alt={displayTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={false}
          />
        </div>
        <div className="pt-2 px-1 text-center select-none">
          <p className="font-serif text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
            {displayTitle}
          </p>
          {imageData?.category && (
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5">
              {imageData.category}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden flex flex-col group transition-all",
        frameStyle === "rounded" && "rounded-xl border border-border shadow-md",
        frameStyle === "shadow" && "rounded-lg shadow-2xl border border-white/20",
        frameStyle === "bordered" && "rounded-none border-2 border-primary shadow-lg",
        frameStyle === "none" && "rounded-md shadow-sm"
      )}
    >
      <div className="relative flex-1 w-full h-full bg-neutral-100 dark:bg-zinc-900 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={displayTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/40">
            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-xs">No Image Available</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 opacity-90 transition-opacity">
          <p className="text-xs font-semibold text-white truncate drop-shadow-sm">
            {displayTitle}
          </p>
          {imageData?.category && (
            <span className="text-[10px] text-amber-200/90 font-medium tracking-wide">
              {imageData.category}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
