import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <div className="mb-8">
              <span className="inline-flex rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                {post.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</span>
                <span>By {post.author}</span>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-border/60 mb-12">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg leading-8 text-muted-foreground mb-8">{post.content.intro}</p>

              <div className="space-y-10">
                {post.content.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-muted-foreground leading-8 text-base md:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-[2rem] border border-border bg-secondary/40 p-8">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Final Thought</h3>
                <p className="text-muted-foreground leading-8 text-base md:text-lg">{post.content.conclusion}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
      <Footer />
    </main>
  )
}
