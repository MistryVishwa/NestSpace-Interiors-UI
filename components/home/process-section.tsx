"use client"

import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { 
  MessageSquare, 
  Lightbulb, 
  Ruler, 
  Hammer,
  CheckCircle,
  ArrowRight
} from "lucide-react"

const processSteps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consultation",
    description: "We begin with an in-depth discussion to understand your vision, lifestyle, and requirements for the space.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Concept Design",
    description: "Our designers create mood boards, 3D visualizations, and detailed concepts tailored to your preferences.",
  },
  {
    icon: Ruler,
    number: "03",
    title: "Planning",
    description: "We develop comprehensive floor plans, material selections, and detailed specifications for execution.",
  },
  {
    icon: Hammer,
    number: "04",
    title: "Execution",
    description: "Our skilled team brings the design to life with precision craftsmanship and quality materials.",
  },
  {
    icon: CheckCircle,
    number: "05",
    title: "Handover",
    description: "We ensure every detail meets our standards before revealing your beautifully transformed space.",
  },
]

export function ProcessSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(processSteps.length)

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--accent)_0%,transparent_50%)] opacity-[0.03]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 sm:mb-6">
            How We Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 text-balance leading-tight">
            Our Process
          </h2>
          <div className="decorative-line mx-auto mb-6 sm:mb-8" />
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
            A seamless journey from initial concept to final reveal, ensuring every step exceeds your expectations.
          </p>
        </div>

        {/* Process Steps - Timeline Style */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Connection Line - Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <div 
                key={step.number} 
                ref={setRef(index)}
                className={cn(
                  "relative reveal",
                  visibleItems[index] && "visible"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Mobile Layout */}
                <div className="lg:hidden flex gap-4 sm:gap-6">
                  {/* Icon Circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                      <step.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <span className="text-primary font-display font-bold text-xs sm:text-sm tracking-wider">{step.number}</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mt-1 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col items-center text-center group">
                  {/* Icon Circle */}
                  <div className="relative z-10 mb-8">
                    <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-3xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                      <step.icon className="h-8 w-8 xl:h-10 xl:w-10 text-primary" />
                    </div>
                    {/* Arrow to next step */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-1/2 -right-4 xl:-right-2 -translate-y-1/2 text-border hidden xl:block">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  {/* Step Number */}
                  <span className="text-primary font-display font-bold text-sm tracking-wider mb-3">{step.number}</span>
                  
                  {/* Title */}
                  <h3 className="font-serif text-xl xl:text-2xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm xl:text-base leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
