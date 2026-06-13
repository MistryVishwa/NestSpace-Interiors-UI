"use client"

import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { Linkedin, Link2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareBarProps {
  title: string
}

export function ShareBar({ title }: ShareBarProps) {
  const pathname = usePathname()

  const getUrl = () =>
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname

  const handleTwitterShare = () => {
    const url = getUrl()
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const handleLinkedInShare = () => {
    const url = getUrl()
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const handleCopyLink = async () => {
    const url = getUrl()
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied!", {
        description: "The post URL has been copied to your clipboard.",
        duration: 3000,
      })
    } catch {
      toast.error("Could not copy link", {
        description: "Please copy the URL from your browser's address bar.",
        duration: 3000,
      })
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground shrink-0">
          Share this article
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Share on X / Twitter"
            onClick={handleTwitterShare}
            className="rounded-full hover:border-[#1DA1F2]/60 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Share on LinkedIn"
            onClick={handleLinkedInShare}
            className="rounded-full hover:border-[#0A66C2]/60 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Copy link"
            onClick={handleCopyLink}
            className="rounded-full hover:border-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
