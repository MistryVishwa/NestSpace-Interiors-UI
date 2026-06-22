"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"

export function ConditionalAnalytics() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem("nestspace-cookie-consent")
      setConsent(stored)
    }

    // Check initial consent status
    checkConsent()

    // Listen for custom event when consent is changed
    window.addEventListener("nestspace-cookie-consent-change", checkConsent)

    return () => {
      window.removeEventListener("nestspace-cookie-consent-change", checkConsent)
    }
  }, [])

  if (consent === "accepted") {
    return <Analytics />
  }

  return null
}
