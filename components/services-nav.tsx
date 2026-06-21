"use client"

import * as React from "react"
import { Home, Building2, UtensilsCrossed, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home-interior", title: "Home Interior", icon: Home },
  { id: "office-design", title: "Office Design", icon: Building2 },
  { id: "modular-kitchen", title: "Modular Kitchen", icon: UtensilsCrossed },
  { id: "luxury-spaces", title: "Luxury Spaces", icon: Crown },
]

export function ServicesNav() {
  const [activeId, setActiveId] = React.useState<string>("")
  const [isHeaderScrolled, setIsHeaderScrolled] = React.useState(false)
  const isClickScrolling = React.useRef(false)
  const clickScrollTimeout = React.useRef<number | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-160px 0px -50% 0px",
      threshold: 0,
    }

    const visibleSections = new Map<string, boolean>()

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return

      entries.forEach((entry) => {
        visibleSections.set(entry.target.id, entry.isIntersecting)
      })

      // Find the first intersecting section in order
      for (const item of navItems) {
        if (visibleSections.get(item.id)) {
          setActiveId(item.id)
          break
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => {
      if (clickScrollTimeout.current) {
        window.clearTimeout(clickScrollTimeout.current)
      }
      navItems.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const handlePillClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      setActiveId(id)
      isClickScrolling.current = true
      if (clickScrollTimeout.current) {
        window.clearTimeout(clickScrollTimeout.current)
      }

      el.scrollIntoView({ behavior: "smooth" })

      // Temporarily disable IntersectionObserver updates during smooth scroll
      clickScrollTimeout.current = window.setTimeout(() => {
        isClickScrolling.current = false
      }, 800)
    }
  }

  return (
    <div
      className={cn(
        "sticky z-40 w-full transition-all duration-500 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm",
        isHeaderScrolled
          ? "top-[52px] sm:top-[60px] lg:top-[64px]"
          : "top-[56px] sm:top-[68px] lg:top-[80px]"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center py-3 overflow-x-auto no-scrollbar scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap px-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeId === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handlePillClick(e, item.id)}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 border",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10 scale-105"
                      : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground border-border/40 hover:scale-102"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  {item.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
