"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { FavoriteDesign } from "@/types/favorite"

const STORAGE_KEY = "nestspace_favorites"
const CUSTOM_EVENT_NAME = "nestspace_favorites_updated"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteDesign[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Safely read from localStorage
  const readStorage = useCallback((): FavoriteDesign[] => {
    if (typeof window === "undefined") return []
    try {
      const item = window.localStorage.getItem(STORAGE_KEY)
      if (!item) return []
      const parsed = JSON.parse(item)
      if (Array.isArray(parsed)) {
        // Validate items basic structure
        return parsed.filter(
          (fav): fav is FavoriteDesign =>
            Boolean(fav) && typeof fav === "object" && typeof fav.id === "string"
        )
      }
      return []
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error)
      // Corrupted storage fallback
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {}
      return []
    }
  }, [])

  // Sync state from localStorage and listen to updates
  useEffect(() => {
    setIsMounted(true)
    setFavorites(readStorage())

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        setFavorites(readStorage())
      }
    }

    const handleCustomChange = () => {
      setFavorites(readStorage())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener(CUSTOM_EVENT_NAME, handleCustomChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomChange)
    }
  }, [readStorage])

  // Helper to save to localStorage and broadcast event
  const saveFavorites = useCallback((newFavs: FavoriteDesign[]) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
      setFavorites(newFavs)
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME))
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error)
    }
  }, [])

  const addFavorite = useCallback(
    (design: FavoriteDesign) => {
      const current = readStorage()
      if (!current.some((item) => item.id === design.id)) {
        const updated = [design, ...current]
        saveFavorites(updated)
      }
    },
    [readStorage, saveFavorites]
  )

  const removeFavorite = useCallback(
    (id: string) => {
      const current = readStorage()
      const updated = current.filter((item) => item.id !== id)
      saveFavorites(updated)
    },
    [readStorage, saveFavorites]
  )

  const toggleFavorite = useCallback(
    (design: FavoriteDesign) => {
      const current = readStorage()
      const exists = current.some((item) => item.id === design.id)
      if (exists) {
        removeFavorite(design.id)
      } else {
        addFavorite(design)
      }
    },
    [readStorage, addFavorite, removeFavorite]
  )

  const clearFavorites = useCallback(() => {
    saveFavorites([])
  }, [saveFavorites])

  // Memoized lookup map or check helper
  const favoriteIdsSet = useMemo(() => {
    return new Set(favorites.map((f) => f.id))
  }, [favorites])

  const isFavorite = useCallback(
    (id: string): boolean => {
      return favoriteIdsSet.has(id)
    },
    [favoriteIdsSet]
  )

  return {
    favorites: isMounted ? favorites : [],
    favoriteCount: isMounted ? favorites.length : 0,
    isMounted,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
}
