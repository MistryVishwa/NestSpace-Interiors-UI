"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileCtaButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <Link
      href="/contact"
      className={cn(
        "fixed bottom-6 left-1/2 z-50 lg:hidden",
        "flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all duration-300 ease-out active:scale-95",
        isVisible
          ? "opacity-100 translate-y-0 -translate-x-1/2 scale-100"
          : "opacity-0 translate-y-12 -translate-x-1/2 scale-95 pointer-events-none"
      )}
    >
      <Calendar className="h-4 w-4" />
      <span>Book Consultation</span>
    </Link>
  )
}
