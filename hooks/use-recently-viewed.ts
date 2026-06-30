"use client"

import { useCallback } from "react"

const STORAGE_KEY = "nestspace-recently-viewed"
const MAX_ITEMS = 4

function readFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeToStorage(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // localStorage unavailable (e.g. private browsing with storage blocked)
  }
}

/**
 * Returns the list of recently viewed project IDs (up to MAX_ITEMS),
 * and a function to record a new visit. All reads/writes are wrapped
 * in try/catch so private-browsing environments with blocked storage
 * degrade gracefully to an empty list.
 */
export function useRecentlyViewed() {
  const getRecentlyViewed = useCallback((): string[] => {
    return readFromStorage()
  }, [])

  const recordView = useCallback((id: string): void => {
    const current = readFromStorage()
    // Move the id to the front, deduplicate, then cap at MAX_ITEMS
    const updated = [id, ...current.filter((item) => item !== id)].slice(
      0,
      MAX_ITEMS
    )
    writeToStorage(updated)
  }, [])

  return { getRecentlyViewed, recordView }
}
