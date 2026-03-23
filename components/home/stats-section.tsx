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
    description: "Residential & commercial",
    icon: Briefcase
  },
  { 
    value: 300, 
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
    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
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
      className="py-14 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/3" />
      
      {/* Decorative Blurs */}
      <div className="absolute top-1/2 left-0 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-primary/8 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-accent/8 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div 
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 reveal",
            sectionReveal.isVisible && "visible"
          )}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center relative group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Subtle Divider */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 lg:h-20 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}
              
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                shouldAnimate={hasAnimated}
              />
              <p className="text-foreground font-medium mt-2 sm:mt-3 text-sm sm:text-base">{stat.label}</p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
