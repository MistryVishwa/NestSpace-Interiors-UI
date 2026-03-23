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
            "py-10 sm:py-12 lg:py-16 border-b border-border reveal",
            footerReveal.isVisible && "visible"
          )}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center lg:text-left max-w-md">
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Stay Inspired
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Subscribe to our newsletter for design tips, trends, and exclusive updates.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 sm:h-11 lg:h-12 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
              />
              <Button className="h-10 sm:h-11 lg:h-12 px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 text-sm sm:text-base rounded-lg sm:rounded-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-10 sm:py-12 lg:py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center">
                <span className="font-serif text-base sm:text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                NestSpace
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Creating timeless interiors that reflect your unique style and elevate your everyday living experience.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Company</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Services</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Contact</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a
                  href="mailto:hello@nestspace.com"
                  className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors group text-sm sm:text-base"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="truncate">hello@nestspace.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors group text-sm sm:text-base"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 text-muted-foreground text-sm sm:text-base">
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="pt-1.5 sm:pt-2">123 Design Street, Creative District, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 sm:py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            {new Date().getFullYear()} NestSpace Interiors. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 lg:gap-8">
            {footerLinks.support.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
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
