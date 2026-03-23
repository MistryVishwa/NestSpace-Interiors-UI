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
    <section className="py-16 sm:py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--accent)_0%,transparent_50%)] opacity-[0.03]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
            How We Work
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 text-balance leading-tight">
            Our Process
          </h2>
          <div className="decorative-line mx-auto mb-4 sm:mb-5" />
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            A seamless journey from initial concept to final reveal, ensuring every step exceeds your expectations.
          </p>
        </div>

        {/* Process Steps - Timeline Style */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Connection Line - Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-5 sm:left-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-3">
            {processSteps.map((step, index) => (
              <div 
                key={step.number} 
                ref={setRef(index)}
                className={cn(
                  "relative reveal",
                  visibleItems[index] && "visible"
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Mobile Layout */}
                <div className="lg:hidden flex gap-4">
                  {/* Icon Circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <span className="text-primary font-medium text-xs tracking-wider">{step.number}</span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mt-0.5 mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col items-center text-center group">
                  {/* Icon Circle */}
                  <div className="relative z-10 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    {/* Arrow to next step */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-border/50 hidden xl:block">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  
                  {/* Step Number */}
                  <span className="text-primary font-medium text-xs tracking-wider mb-2">{step.number}</span>
                  
                  {/* Title */}
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
