"use client"

import { Quote, Star } from "lucide-react"
import { useScrollReveal, useScrollRevealMany } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content: "NestSpace transformed our outdated living space into a modern sanctuary. Their attention to detail and ability to understand our vision was remarkable. Every corner of our home now reflects our personality.",
    rating: 5,
    location: "Manhattan, NY",
  },
  {
    name: "Michael Chen",
    role: "CEO, TechStart Inc.",
    content: "Our new office space has completely changed our company culture. The team productivity has increased, and everyone loves coming to work now. The design perfectly balances professionalism with creativity.",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Enthusiast",
    content: "The modular kitchen they designed for us is both beautiful and incredibly functional. Every inch of space has been utilized perfectly. Cooking has become a joy rather than a chore.",
    rating: 5,
    location: "Austin, TX",
  },
]

export function TestimonialsSection() {
  const headerReveal = useScrollReveal()
  const { setRef, visibleItems } = useScrollRevealMany(testimonials.length)

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-secondary/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Header */}
        <div 
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14 reveal",
            headerReveal.isVisible && "visible"
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            We take pride in delivering exceptional results that exceed expectations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={setRef(index)}
              className={cn(
                "relative p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/20 premium-card reveal",
                visibleItems[index] && "visible"
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
                <Quote className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground fill-current" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-5 text-sm sm:text-base">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-serif font-bold text-base">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
