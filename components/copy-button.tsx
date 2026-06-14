"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  text: string
  /** Accessible label describing what is being copied (e.g. "email address") */
  label?: string
}

/**
 * Inline icon button that copies `text` to the clipboard.
 * Swaps the Copy icon for a Check icon for 2 seconds on success.
 */
export function CopyButton({ text, label = "value" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available – silently ignore
    }
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary transition-colors"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  )
}
