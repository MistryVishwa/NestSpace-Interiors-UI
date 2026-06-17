"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: "up" | "left" | "right" | "scale"
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export function ScrollReveal({
  children,
  className,
  variant = "up",
  once = true,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ once, threshold, rootMargin })

  const variantClasses = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }

  const baseClass = variantClasses[variant]

  return (
    <div
      ref={ref}
      className={cn(baseClass, isVisible && "visible", className)}
    >
      {children}
    </div>
  )
}
