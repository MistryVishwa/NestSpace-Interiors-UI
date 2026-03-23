"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nestspace.com",
    href: "mailto:hello@nestspace.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Design Street, Creative District, NY 10001",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9AM - 6PM",
    href: null,
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Contact Us
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Let's Start Your Project
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ready to transform your space? Get in touch with our team to schedule a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have a question or ready to start your project? We'd love to hear from you. Reach out through any of the channels below.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll get back to you within 24-48 hours.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home-interior">Home Interior</SelectItem>
                            <SelectItem value="office-design">Office Design</SelectItem>
                            <SelectItem value="modular-kitchen">Modular Kitchen</SelectItem>
                            <SelectItem value="luxury-spaces">Luxury Spaces</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Estimated Budget</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-25k">Under $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                            <SelectItem value="over-250k">Over $250,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project..."
                          rows={5}
                          required
                          className="bg-background resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Visit Our Studio
              </h2>
              <p className="text-muted-foreground">
                Come see our showroom and meet our team in person.
              </p>
            </div>
            {/* Map Placeholder */}
            <div className="relative aspect-[16/6] rounded-lg overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="font-medium text-foreground">123 Design Street</p>
                  <p className="text-muted-foreground">Creative District, NY 10001</p>
                </div>
              </div>
              {/* Decorative grid lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                  backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions? Here are some answers to the most common inquiries.
            </p>
            <div className="text-left space-y-6">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on scope. A single room typically takes 4-6 weeks, while whole-home projects can take 3-6 months from concept to completion.",
                },
                {
                  q: "Do you work with clients remotely?",
                  a: "Yes! We offer virtual consultations and can work with clients anywhere in the country through video calls and detailed 3D visualizations.",
                },
                {
                  q: "What is your design process?",
                  a: "Our process includes initial consultation, concept development, design refinement, and project execution. We keep you involved at every step.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
