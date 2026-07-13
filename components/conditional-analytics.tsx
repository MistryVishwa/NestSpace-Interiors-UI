"use client"

import { startTransition, useEffect, useState } from "react"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

function getCookieConsent(): string | null {
  if (typeof document === "undefined") return null
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === "nestspace-cookie-consent") {
      return value
    }
  }
  return null
}

export function ConditionalAnalytics() {
  const [consent, setConsent] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    startTransition(() => setIsClient(true))
    const checkConsent = () => {
      const stored = localStorage.getItem("nestspace-cookie-consent")
      const cookie = getCookieConsent()
      setConsent(stored || cookie)
    }

    checkConsent()

    window.addEventListener("nestspace-cookie-consent-change", checkConsent)

    return () => {
      window.removeEventListener("nestspace-cookie-consent-change", checkConsent)
    }
  }, [])

  if (!isClient) return null

  if (consent === "accepted") {
    return <Analytics />
  }

  return null
}
