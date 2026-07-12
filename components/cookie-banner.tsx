"use client"

import { startTransition, useEffect, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CookieBanner() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    startTransition(() => setIsMounted(true))

    const getCookie = (name: string) => {
      const nameEQ = name + "="
      const ca = document.cookie.split(";")
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    }

    const consent = localStorage.getItem("nestspace-cookie-consent") || getCookie("nestspace-cookie-consent")

    // Show banner immediately if no consent - no delay for GDPR compliance
    if (!consent) {
      startTransition(() => setIsVisible(true))
    }
  }, [])

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = "; expires=" + date.toUTCString()
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax"
  }

  const handleConsent = (choice: "accepted" | "declined") => {
    setIsVisible(false)
    
    // Store in localStorage
    localStorage.setItem("nestspace-cookie-consent", choice)
    
    // Store in cookie (1 year)
    setCookie("nestspace-cookie-consent", choice, 365)
    
    // Dispatch custom event to notify ConditionalAnalytics
    window.dispatchEvent(new Event("nestspace-cookie-consent-change"))
  }

  if (!isMounted) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className={cn(
        "fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[99] p-5 rounded-2xl glass shadow-2xl border border-border/50 transition-all duration-500 ease-in-out",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      )}
    >
      <div className="flex gap-4">
        <div className="bg-primary/10 text-primary p-2.5 rounded-xl h-fit shrink-0">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="space-y-3.5">
          <div className="space-y-1">
            <h4 className="font-serif font-semibold text-foreground text-sm tracking-wide">
              Cookie Preferences
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We use cookies to understand how visitors use our site. See our{" "}
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-4 hover:text-accent transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConsent("declined")}
              className="h-8 text-xs font-medium cursor-pointer"
            >
              Decline
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleConsent("accepted")}
              className="h-8 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
