"use client"

import React, { useState } from "react"
import { Board } from "@/types/mood-board"
import {
  Download,
  Printer,
  Share2,
  FileText,
  X,
  Check,
  Copy,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react"

interface ExportPanelProps {
  board: Board
  isOpen: boolean
  onClose: () => void
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  board,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/mood-board?id=${board.id}`
    : "https://nestspace-interiors.vercel.app/mood-board"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExportPNG = async () => {
    setIsExporting(true)

    try {
      // Find maximum bounds of items
      const minX = 0
      const minY = 0
      let maxX = 900
      let maxY = 650

      board.items.forEach((item) => {
        if (item.x + item.width > maxX) maxX = item.x + item.width + 60
        if (item.y + item.height > maxY) maxY = item.y + item.height + 60
      })

      const canvas = document.createElement("canvas")
      canvas.width = Math.max(1200, maxX)
      canvas.height = Math.max(800, maxY)
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Draw background
        ctx.fillStyle = board.backgroundColor || "#FDFBF7"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw header title
        ctx.fillStyle = "#18181B"
        ctx.font = "bold 28px serif"
        ctx.fillText(board.title || "NestSpace Interior Mood Board", 40, 50)

        ctx.fillStyle = "#71717A"
        ctx.font = "14px sans-serif"
        ctx.fillText(
          board.description || "Created with NestSpace Interior Mood Board Builder",
          40,
          75
        )

        // Sort items by zIndex
        const sortedItems = [...board.items].sort((a, b) => a.zIndex - b.zIndex)

        for (const item of sortedItems) {
          const x = item.x + 40
          const y = item.y + 100
          const w = item.width
          const h = item.height

          // Draw item background / card shadow box
          ctx.shadowColor = "rgba(0, 0, 0, 0.08)"
          ctx.shadowBlur = 12
          ctx.shadowOffsetY = 4
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(x, y, w, h)
          ctx.shadowColor = "transparent"

          // Draw Border
          ctx.strokeStyle = "#E4E4E7"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, w, h)

          if (item.type === "color" && item.colorData) {
            ctx.fillStyle = item.colorData.hex
            ctx.fillRect(x + 10, y + 10, w - 20, h - 50)

            ctx.fillStyle = "#18181B"
            ctx.font = "bold 12px sans-serif"
            ctx.fillText(item.title, x + 10, y + h - 25)

            ctx.fillStyle = "#71717A"
            ctx.font = "10px monospace"
            ctx.fillText(item.colorData.hex, x + 10, y + h - 10)
          } else if (item.type === "note" && item.noteData) {
            ctx.fillStyle = item.noteData.backgroundColor || "#FEF3C7"
            ctx.fillRect(x, y, w, h)

            ctx.fillStyle = item.noteData.textColor || "#451A03"
            ctx.font = "bold 12px sans-serif"
            ctx.fillText("Designer Note:", x + 12, y + 24)

            ctx.font = "11px sans-serif"
            const lines = item.noteData.text.split("\n")
            let lineY = y + 42
            lines.forEach((line) => {
              ctx.fillText(line.slice(0, 40), x + 12, lineY)
              lineY += 16
            })
          } else {
            // Draw placeholder or card text
            ctx.fillStyle = "#F4F4F5"
            ctx.fillRect(x + 10, y + 10, w - 20, h - 45)

            ctx.fillStyle = "#18181B"
            ctx.font = "bold 12px sans-serif"
            ctx.fillText(item.title, x + 10, y + h - 20)

            ctx.fillStyle = "#A1A1AA"
            ctx.font = "10px sans-serif"
            ctx.fillText(`Type: ${item.type.toUpperCase()}`, x + 10, y + h - 8)
          }
        }

        // Export data URL
        const dataUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = `${(board.title || "mood-board")
          .toLowerCase()
          .replace(/\s+/g, "-")}.png`
        link.href = dataUrl
        link.click()
      }
    } catch (err) {
      console.error("Export PNG Error:", err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground">
                Export & Share Board
              </h3>
              <p className="text-xs text-muted-foreground">
                Download your spatial design layout or copy share link
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Download PNG */}
          <button
            type="button"
            onClick={handleExportPNG}
            disabled={isExporting}
            className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/40 hover:border-primary/50 hover:shadow-lg text-left transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground mb-1">
              Export High-Res PNG
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Download clean canvas image file
            </p>
          </button>

          {/* Client PDF / Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/40 hover:border-primary/50 hover:shadow-lg text-left transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground mb-1">
              Print / Save PDF
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Open print-optimized PDF preview
            </p>
          </button>
        </div>

        {/* Share Section */}
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-primary" />
              <span>Shareable Mood Board Link</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-1.5 bg-background border border-input rounded-lg text-xs font-mono text-muted-foreground focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
