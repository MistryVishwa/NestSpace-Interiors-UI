"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 350, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Design Awards" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
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
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="font-serif text-5xl md:text-6xl font-bold text-foreground">
      {count}{suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
