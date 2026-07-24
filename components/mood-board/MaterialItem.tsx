"use client"

import React from "react"
import Image from "next/image"
import { Material } from "@/types/mood-board"
import { Layers, Leaf } from "lucide-react"

interface MaterialItemProps {
  materialData?: Material
  title?: string
}

export const MaterialItem: React.FC<MaterialItemProps> = ({
  materialData,
  title,
}) => {
  const name = title || materialData?.name || "Material Sample"
  const finish = materialData?.finish || "Natural Surface Finish"
  const category = materialData?.category || "material"
  const imageUrl = materialData?.imageUrl || "/images/portfolio-2.jpg"

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
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-amber-200 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
          <Layers className="w-3 h-3" />
          <span>{category}</span>
        </div>
      </div>

      <div className="pt-2">
        <h4 className="text-xs font-semibold text-foreground truncate">
          {name}
        </h4>
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
          {finish}
        </p>

        {materialData?.sustainabilityRating && (
          <div className="flex items-center gap-1 mt-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
            <Leaf className="w-2.5 h-2.5" />
            <span className="truncate">{materialData.sustainabilityRating}</span>
          </div>
        )}
      </div>
    </div>
  )
}
