"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { FavoritesCounter } from "./FavoritesCounter"

export function FavoritesHero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-linear-to-b from-secondary/50 via-background to-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <FavoritesCounter />
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Your Favorite Designs
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            A curated collection of your bookmarked interior design concepts. Keep track of room styles, color palettes, and layout inspirations for your dream home.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
