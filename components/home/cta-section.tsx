import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Space?
          </h2>
          <p className="text-background/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and create something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 px-8">
                Explore Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
