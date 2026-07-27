import * as React from "react"

interface GridCanvasProps {
  width: number
  height: number
  gridSize: number
  showGrid: boolean
}

export function GridCanvas({
  width,
  height,
  gridSize,
  showGrid,
}: GridCanvasProps) {
  // Convert pixels to realistic feet (approx 30px = 1ft)
  const feetWidth = Math.round(width / 30)
  const feetHeight = Math.round(height / 30)

  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
      style={{ width, height }}
    >
      {/* SVG Grid Lines */}
      {showGrid && (
        <svg className="w-full h-full opacity-35 dark:opacity-25" aria-hidden="true">
          <defs>
            <pattern
              id="planner-grid-pattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#planner-grid-pattern)" />
        </svg>
      )}

      {/* Wall Boundary Outline */}
      <div className="absolute inset-0 border-4 border-foreground/80 rounded-xl" />

      {/* Dimension Label (Top) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background/90 text-foreground px-2 py-0.5 rounded text-[11px] font-mono border border-border shadow-xs">
        {feetWidth} ft ({width}px)
      </div>

      {/* Dimension Label (Left) */}
      <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 bg-background/90 text-foreground px-2 py-0.5 rounded text-[11px] font-mono border border-border shadow-xs">
        {feetHeight} ft ({height}px)
      </div>
    </div>
  )
}
