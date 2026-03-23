"use client"

import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Award, Users, Briefcase, Clock } from "lucide-react"

const stats = [
  { 
    value: 500, 
    suffix: "+", 
    label: "Projects Completed", 
    description: "Across residential & commercial",
    icon: Briefcase
  },
  { 
    value: 350, 
    suffix: "+", 
    label: "Happy Clients", 
    description: "Trust us with their spaces",
    icon: Users
  },
  { 
    value: 15, 
    suffix: "+", 
    label: "Years Experience", 
    description: "In premium design",
    icon: Clock
  },
  { 
    value: 25, 
    suffix: "+", 
    label: "Design Awards", 
    description: "Recognizing excellence",
    icon: Award
  },
]

function AnimatedCounter({ value, suffix, shouldAnimate }: { value: number; suffix: string; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return
    
    const duration = 2500
    const steps = 80
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
    <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground tabular-nums">
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
      className="py-20 sm:py-28 lg:py-40 relative overflow-hidden"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
      
      {/* Decorative Blurs */}
      <div className="absolute top-1/2 left-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-primary/10 rounded-full blur-[100px] sm:blur-[120px] lg:blur-[150px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-accent/10 rounded-full blur-[100px] sm:blur-[120px] lg:blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative">
        <div 
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10 reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center relative group"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Subtle Divider */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}
              
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 sm:mb-6 lg:mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                shouldAnimate={hasAnimated}
              />
              <p className="text-foreground font-medium mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl">{stat.label}</p>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
