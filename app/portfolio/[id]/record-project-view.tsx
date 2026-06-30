"use client"

import { useEffect } from "react"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"

interface RecordProjectViewProps {
  id: string
}

/**
 * Invisible client component that records a portfolio project visit
 * into localStorage on mount. Kept separate so the parent page can
 * remain a Server Component.
 */
export function RecordProjectView({ id }: RecordProjectViewProps) {
  const { recordView } = useRecentlyViewed()

  useEffect(() => {
    recordView(id)
  }, [id, recordView])

  return null
}
