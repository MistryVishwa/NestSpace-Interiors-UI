"use client"

import React from "react"
import Image from "next/image"
import { Texture } from "@/types/mood-board"
import { Sparkles, Grid } from "lucide-react"

interface TextureItemProps {
  textureData?: Texture
  title?: string
}

export const TextureItem: React.FC<TextureItemProps> = ({
  textureData,
  title,
}) => {
  const name = title || textureData?.name || "Surface Texture"
  const imageUrl = textureData?.imageUrl || "/images/portfolio-3.jpg"
  const pattern = textureData?.patternType || "Architectural Pattern"

  return (
    <div className="w-full h-full bg-card rounded-xl border border-border shadow-md overflow-hidden flex flex-col p-2.5 transition-all">
      <div className="relative flex-1 w-full rounded-lg overflow-hidden bg-neutral-900 group">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
          <Grid className="w-2.5 h-2.5 text-amber-400" />
          <span>{pattern}</span>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-foreground truncate">
            {name}
          </h4>
          <Sparkles className="w-3 h-3 text-amber-500 shrink-0 ml-1" />
        </div>
        {textureData?.tactileDescription && (
          <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 leading-tight">
            {textureData.tactileDescription}
          </p>
        )}
      </div>
    </div>
  )
}
