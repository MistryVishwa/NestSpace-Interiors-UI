"use client"

import * as React from "react"
import { RotateCw } from "lucide-react"

interface RotationHandleProps {
  onRotate: () => void
}

export function RotationHandle({ onRotate }: RotationHandleProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onRotate()
      }}
      className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform z-30 cursor-pointer"
      title="Rotate 90°"
      aria-label="Rotate 90 degrees"
    >
      <RotateCw className="h-3 w-3" />
    </button>
  )
}
