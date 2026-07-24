"use client"

import React from "react"
import Image from "next/image"
import { FurnitureReference } from "@/types/mood-board"
import { Armchair, Tag, Compass } from "lucide-react"

interface FurnitureItemProps {
  furnitureData?: FurnitureReference
  title?: string
}

export const FurnitureItem: React.FC<FurnitureItemProps> = ({
  furnitureData,
  title,
}) => {
  const name = title || furnitureData?.name || "Furniture Piece"
  const price = furnitureData?.estimatedPrice || "$1,200"
  const vendor = furnitureData?.vendor || "NestSpace Collection"
  const dimensions = furnitureData?.dimensions || "Standard Dimensions"
  const imageUrl = furnitureData?.imageUrl || "/images/portfolio-1.jpg"

  return (
    <div className="w-full h-full bg-card rounded-xl border border-border shadow-md overflow-hidden flex flex-col p-2.5 transition-all">
      <div className="relative flex-1 w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-zinc-800">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
          {price}
        </div>
        {furnitureData?.style && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-amber-200 text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Compass className="w-2.5 h-2.5" />
            <span>{furnitureData.style}</span>
          </div>
        )}
      </div>

      <div className="pt-2">
        <div className="flex items-start justify-between gap-1">
          <h4 className="text-xs font-semibold text-foreground truncate flex-1">
            {name}
          </h4>
          <Armchair className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="truncate">{vendor}</span>
          <span className="font-mono text-[9px] bg-muted px-1.5 py-0.5 rounded text-foreground/80 shrink-0 ml-1">
            {dimensions}
          </span>
        </div>
      </div>
    </div>
  )
}
