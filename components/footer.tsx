"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ],
  services: [
    { href: "/services#home-interior", label: "Home Interior" },
    { href: "/services#office-design", label: "Office Design" },
    { href: "/services#modular-kitchen", label: "Modular Kitchen" },
    { href: "/services#luxury-spaces", label: "Luxury Spaces" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  const footerReveal = useScrollReveal()

  return (
    <footer className="bg-secondary/30 border-t border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary)_0%,transparent_50%)] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Newsletter Section */}
        <div 
          ref={footerReveal.ref}
          className={cn(
            "py-8 sm:py-10 lg:py-12 border-b border-border reveal",
            footerReveal.isVisible && "visible"
          )}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center lg:text-left max-w-md">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">
                Stay Inspired
              </h3>
              <p className="text-muted-foreground text-sm">
                Subscribe to our newsletter for design tips, trends, and exclusive updates.
              </p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 px-4 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm"
              />
              <Button className="h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 text-sm rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-8 sm:py-10 lg:py-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-serif text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-serif text-lg font-bold text-foreground">
                NestSpace
              </span>
            </Link>
            <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
              Creating timeless interiors that reflect your unique style and elevate your everyday living experience.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-sm">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@nestspace.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="truncate">hello@nestspace.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-1.5">123 Design Street, Creative District, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 sm:py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            {new Date().getFullYear()} NestSpace Interiors. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-5">
            {footerLinks.support.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
