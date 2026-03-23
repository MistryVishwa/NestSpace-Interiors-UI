import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const featuredPost = {
  id: "interior-design-trends-2024",
  title: "Top Interior Design Trends to Watch in 2024",
  excerpt: "Discover the latest trends shaping the world of interior design this year, from sustainable materials to biophilic design elements.",
  image: "/images/portfolio-6.jpg",
  date: "March 15, 2024",
  readTime: "8 min read",
  category: "Trends",
}

const blogPosts = [
  {
    id: "sustainable-materials-guide",
    title: "A Guide to Sustainable Materials in Interior Design",
    excerpt: "Learn how to make eco-friendly choices without compromising on style or quality.",
    image: "/images/portfolio-1.jpg",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Sustainability",
  },
  {
    id: "small-space-solutions",
    title: "Maximizing Small Spaces: Design Tips for Apartments",
    excerpt: "Creative solutions for making the most of limited square footage.",
    image: "/images/portfolio-5.jpg",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Tips",
  },
  {
    id: "color-psychology",
    title: "The Psychology of Color in Interior Design",
    excerpt: "How different colors affect mood and how to use them effectively in your home.",
    image: "/images/portfolio-4.jpg",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Design Theory",
  },
  {
    id: "kitchen-renovation-guide",
    title: "Complete Guide to Kitchen Renovation",
    excerpt: "Everything you need to know before starting your kitchen renovation project.",
    image: "/images/portfolio-2.jpg",
    date: "February 20, 2024",
    readTime: "10 min read",
    category: "Guides",
  },
  {
    id: "office-design-productivity",
    title: "How Office Design Impacts Productivity",
    excerpt: "Research-backed insights on creating workspaces that boost focus and creativity.",
    image: "/images/portfolio-3.jpg",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Commercial",
  },
  {
    id: "luxury-bathroom-trends",
    title: "Luxury Bathroom Design: Creating Your Personal Spa",
    excerpt: "Transform your bathroom into a relaxing retreat with these design ideas.",
    image: "/images/portfolio-4.jpg",
    date: "February 10, 2024",
    readTime: "5 min read",
    category: "Luxury",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Blog
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Design Insights & Inspiration
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay updated with the latest trends, tips, and insights from the world of interior design.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href={`/blog/${featuredPost.id}`} className="block group">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden image-zoom">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="h-full bg-card border-border overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                1
              </span>
              <span className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                2
              </span>
              <span className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                3
              </span>
              <span className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get the latest design inspiration, tips, and exclusive content delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
