"use client"

import React, { useState } from "react"
import { ColorPalette } from "@/types/mood-board"
import { Copy, Check, Palette } from "lucide-react"

interface ColorItemProps {
  colorData?: ColorPalette
  title?: string
}

export const ColorItem: React.FC<ColorItemProps> = ({ colorData, title }) => {
  const [copied, setCopied] = useState(false)
  const hex = colorData?.hex || "#D4C5B9"
  const name = title || colorData?.name || "Color Swatch"
  const secondaryHexes = colorData?.secondaryHexes || []

  const handleCopyHex = (textToCopy: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="w-full h-full bg-card rounded-xl border border-border shadow-md overflow-hidden flex flex-col p-2.5 transition-all">
      {/* Color Preview Swatch */}
      <div
        className="relative flex-1 w-full rounded-lg shadow-inner flex items-end p-2 transition-transform duration-300 group"
        style={{ backgroundColor: hex }}
      >
        <button
          type="button"
          onClick={(e) => handleCopyHex(hex, e)}
          className="ml-auto bg-black/40 backdrop-blur-md text-white text-[11px] px-2 py-1 rounded-md opacity-90 hover:opacity-100 flex items-center gap-1 transition-all"
          title="Copy Hex Code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="font-mono uppercase">{hex}</span>
            </>
          )}
        </button>
      </div>

      {/* Palette Strip if secondary colors exist */}
      {secondaryHexes.length > 0 && (
        <div className="flex h-3 w-full rounded-md overflow-hidden my-2 shadow-inner">
          <div className="h-full flex-1" style={{ backgroundColor: hex }} />
          {secondaryHexes.map((secHex, idx) => (
            <div
              key={idx}
              className="h-full flex-1"
              style={{ backgroundColor: secHex }}
              title={secHex}
            />
          ))}
        </div>
      )}

      {/* Info & Labels */}
      <div className="pt-1.5 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">
            {name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
              {hex}
            </span>
            {colorData?.finish && (
              <span className="text-[9px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded capitalize">
                {colorData.finish}
              </span>
            )}
          </div>
        </div>
        <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center bg-muted/30">
          <Palette className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
