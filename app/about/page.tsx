import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Check, Target, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Alexandra Bennett",
    role: "Founder & Lead Designer",
    image: "/images/team-1.jpg",
    bio: "With over 20 years of experience, Alexandra founded NestSpace with a vision to create spaces that inspire.",
  },
  {
    name: "James Morrison",
    role: "Senior Architect",
    image: "/images/team-2.jpg",
    bio: "James brings architectural excellence and innovative design solutions to every project.",
  },
  {
    name: "Sophie Chen",
    role: "Project Director",
    image: "/images/team-3.jpg",
    bio: "Sophie ensures every project runs smoothly, delivering exceptional results on time.",
  },
  {
    name: "Robert Williams",
    role: "Design Consultant",
    image: "/images/team-4.jpg",
    bio: "Robert's expertise in luxury spaces has earned him recognition across the industry.",
  },
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for perfection in every detail, ensuring the highest quality in all our work.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "We embrace creative thinking and cutting-edge design trends to stay ahead.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our love for design drives us to create spaces that truly transform lives.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
                About Us
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Creating Spaces That Inspire
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded in 2009, NestSpace Interiors has been at the forefront of luxury interior design, transforming spaces into personalized sanctuaries that reflect our clients' unique personalities and lifestyles.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our team of passionate designers and architects work together to create harmonious spaces that balance aesthetics with functionality, bringing your vision to life with meticulous attention to detail.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/about-hero.jpg"
                alt="NestSpace team at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                A Journey of Design Excellence
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                NestSpace began as a small design studio with a big dream: to create interiors that would not only be beautiful but would also enhance the quality of life for those who inhabit them. Our founder, Alexandra Bennett, started with a simple belief that great design has the power to transform not just spaces, but lives.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Over the years, we've grown from a two-person team to a full-service design firm, completing over 500 projects across residential and commercial sectors. What hasn't changed is our commitment to personalized service and our passion for creating spaces that tell a story.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, NestSpace is recognized as a leader in luxury interior design, known for our ability to blend timeless elegance with contemporary innovation. We continue to push boundaries while staying true to our core values of excellence, innovation, and heartfelt service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <Card className="bg-card border-border">
              <CardContent className="p-10">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To create thoughtfully designed spaces that enhance the quality of life, reflect individual personalities, and stand the test of time. We believe every space has the potential to inspire and uplift.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-card border-border">
              <CardContent className="p-10">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted name in luxury interior design, known for our innovative approach, exceptional craftsmanship, and unwavering commitment to client satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Team
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Meet the Experts
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our talented team brings together diverse expertise and a shared passion for exceptional design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="bg-card border-border overflow-hidden group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
                Why Choose Us
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
                What Sets Us Apart
              </h2>
              <div className="space-y-6">
                {[
                  "Personalized approach tailored to your unique style and needs",
                  "End-to-end project management from concept to completion",
                  "Access to exclusive materials and furnishings",
                  "Award-winning design team with decades of experience",
                  "Transparent pricing with no hidden costs",
                  "Post-project support and maintenance services",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/portfolio-6.jpg"
                alt="Luxury interior design"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
