"use client"

import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content: "NestSpace transformed our outdated living space into a modern sanctuary. Their attention to detail and ability to understand our vision was remarkable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO, TechStart Inc.",
    content: "Our new office space has completely changed our company culture. The team productivity has increased, and everyone loves coming to work now.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Enthusiast",
    content: "The modular kitchen they designed for us is both beautiful and incredibly functional. Every inch of space has been utilized perfectly.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We take pride in delivering exceptional results that exceed our clients' expectations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/30 mb-6" />
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
