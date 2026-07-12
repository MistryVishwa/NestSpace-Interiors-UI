"use client"

import { startTransition, useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const totalScrollable = documentHeight - viewportHeight

      if (totalScrollable <= 0) {
        setProgress(0)
        return
      }

      const scrolledPercentage = (scrollY / totalScrollable) * 100
      setProgress(Math.min(scrolledPercentage, 100))
    }

    // Set initial scroll progress
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    startTransition(() => setPrefersReducedMotion(mediaQuery.matches))

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener("change", handleMotionChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] pointer-events-none"
      style={{
        width: `${progress}%`,
        transition: prefersReducedMotion ? "none" : "width 0.1s linear",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
