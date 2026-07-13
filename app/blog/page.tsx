"use client"

import { startTransition, useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts, featuredPost } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useBlogFilters } from "@/hooks/use-blog-filters"

const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

export default function BlogPage() {
  const { category, search, filteredPosts, isFiltered, setCategory, setSearch, clearFilters } =
    useBlogFilters()

  // Local input value for instant visual feedback while debouncing URL updates
  const [inputValue, setInputValue] = useState(search)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Sync local input when URL search param changes externally (e.g., browser Back)
  useEffect(() => {
    startTransition(() => setInputValue(search))
  }, [search])

  const handleFilterChange = (cat: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCategory(cat)
      setIsTransitioning(false)
    }, 200)
  }

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        setSearch(value)
      }, 300)
    },
    [setSearch]
  )

  const handleClear = () => {
    setInputValue("")
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    clearFilters()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Our Blog</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Design Insights & Inspiration
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore interior design ideas, renovation guidance, and practical inspiration from the NestSpace team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="relative aspect-16/10 rounded-3xl overflow-hidden image-zoom border border-border/60">
                <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">{featuredPost.category}</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{featuredPost.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Latest Articles</h2>

          {/* Search & Filters */}
          <div className="flex flex-col items-center gap-6 mb-12">
            {/* Search input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="blog-search"
                type="search"
                placeholder="Search articles by title, topic, or keyword…"
                value={inputValue}
                onChange={handleSearchChange}
                className="pl-9 h-11 rounded-full bg-background border-border/60 focus-visible:border-primary focus-visible:ring-primary/20 text-sm"
              />
            </div>

            {/* Category filter buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  onClick={() => handleFilterChange(cat)}
                  size="sm"
                  className={cn(
                    "px-5 h-10 rounded-full text-sm font-medium transition-all duration-300",
                    category === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-muted text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Clear filters — shown only when at least one filter is active */}
            {isFiltered && (
              <Button
                id="blog-clear-filters"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground h-9 px-4 rounded-full border border-border/60"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </Button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="rounded-full bg-muted p-5 mb-2">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">No articles found</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                No posts match your current search or filter. Try a different keyword or select another category.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="mt-2 rounded-full"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className={cn(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}>
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full bg-card border-border/60 overflow-hidden group hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <span className="text-primary text-xs font-medium uppercase tracking-wider">{post.category}</span>
                      <h3 className="font-serif text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
