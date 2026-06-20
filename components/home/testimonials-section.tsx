"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content:
      "NestSpace transformed our outdated living space into a modern sanctuary. Their attention to detail and ability to understand our vision was remarkable. Every corner of our home now reflects our personality.",
    rating: 5,
    location: "Manhattan, NY",
  },
  {
    name: "Michael Chen",
    role: "CEO, TechStart Inc.",
    content:
      "Our new office space has completely changed our company culture. The team productivity has increased, and everyone loves coming to work now. The design perfectly balances professionalism with creativity.",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Enthusiast",
    content:
      "The modular kitchen they designed for us is both beautiful and incredibly functional. Every inch of space has been utilized perfectly. Cooking has become a joy rather than a chore.",
    rating: 5,
    location: "Austin, TX",
  },
  {
    name: "James Whitfield",
    role: "Property Developer",
    content:
      "We partnered with NestSpace on three luxury apartment blocks and the results spoke for themselves — units sold 40% faster than our previous projects. Their design sense is simply unmatched.",
    rating: 5,
    location: "Chicago, IL",
  },
  {
    name: "Priya Nair",
    role: "Architect",
    content:
      "As an architect myself I am very particular about design execution. NestSpace delivered precision, creativity, and warmth in equal measure. A truly collaborative team.",
    rating: 5,
    location: "Boston, MA",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export function TestimonialsSection() {
  const headerReveal = useScrollReveal();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isHovered = useRef(false);

  // Detect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Sync dot indicators with Embla
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Autoplay — disabled when prefers-reduced-motion is set
  const scrollNext = useCallback(() => {
    if (!api) return;
    if (api.canScrollNext()) {
      api.scrollNext();
    } else {
      api.scrollTo(0);
    }
  }, [api]);

  useEffect(() => {
    if (prefersReducedMotion || !api) return;
    const interval = setInterval(() => {
      if (!isHovered.current) scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [api, prefersReducedMotion, scrollNext]);

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-secondary/20 relative overflow-hidden"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={cn(
            "text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14 reveal",
            headerReveal.isVisible && "visible",
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            We take pride in delivering exceptional results that exceed
            expectations.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: false, align: "start" }}
          className="w-full"
          aria-label="Client testimonials"
        >
          <CarouselContent className="-ml-4 sm:-ml-5 pt-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/20 premium-card h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="absolute -top-3 left-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
                    <Quote className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground fill-current" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4 pt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-primary fill-primary"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed mb-5 text-sm sm:text-base flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-serif font-bold text-base">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Controls — dots + prev/next arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Previous */}
          <button
            onClick={() => api?.scrollPrev()}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={current === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div
            className="flex gap-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => api?.scrollNext()}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={current === count - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
