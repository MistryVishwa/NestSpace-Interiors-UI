"use client"

import { useEffect, useState, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed", description: "Across residential & commercial" },
  { value: 350, suffix: "+", label: "Happy Clients", description: "Trust us with their spaces" },
  { value: 15, suffix: "+", label: "Years Experience", description: "In premium design" },
  { value: 25, suffix: "+", label: "Design Awards", description: "Recognizing excellence" },
]

function AnimatedCounter({ value, suffix, shouldAnimate }: { value: number; suffix: string; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return
    
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, shouldAnimate])

  return (
    <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const sectionReveal = useScrollReveal()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (sectionReveal.isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [sectionReveal.isVisible, hasAnimated])

  return (
    <section 
      ref={sectionReveal.ref}
      className="py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div 
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Subtle Divider */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-border" />
              )}
              
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                shouldAnimate={hasAnimated}
              />
              <p className="text-foreground font-medium mt-3 text-lg">{stat.label}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
