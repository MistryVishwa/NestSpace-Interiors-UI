"use client"

import { useSyncExternalStore, useCallback, useMemo } from "react"
import type { FavoriteDesign } from "@/types/favorite"

const STORAGE_KEY = "nestspace_favorites"
const CUSTOM_EVENT_NAME = "nestspace_favorites_updated"

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      callback()
    }
  }

  window.addEventListener("storage", handleStorage)
  window.addEventListener(CUSTOM_EVENT_NAME, callback)

  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener(CUSTOM_EVENT_NAME, callback)
  }
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]"
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]"
  } catch {
    return "[]"
  }
}

function getServerSnapshot(): string {
  return "[]"
}

export function useFavorites() {
  const rawData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const favorites = useMemo<FavoriteDesign[]>(() => {
    try {
      const parsed = JSON.parse(rawData)
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (fav): fav is FavoriteDesign =>
            Boolean(fav) && typeof fav === "object" && typeof fav.id === "string"
        )
      }
      return []
    } catch {
      // Safe fallback on corrupt storage
      try {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(STORAGE_KEY)
        }
      } catch {}
      return []
    }
  }, [rawData])

  const saveFavorites = useCallback((newFavs: FavoriteDesign[]) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME))
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error)
    }
  }, [])

  const addFavorite = useCallback(
    (design: FavoriteDesign) => {
      if (!favorites.some((item) => item.id === design.id)) {
        const updated = [design, ...favorites]
        saveFavorites(updated)
      }
    },
    [favorites, saveFavorites]
  )

  const removeFavorite = useCallback(
    (id: string) => {
      const updated = favorites.filter((item) => item.id !== id)
      saveFavorites(updated)
    },
    [favorites, saveFavorites]
  )

  const toggleFavorite = useCallback(
    (design: FavoriteDesign) => {
      const exists = favorites.some((item) => item.id === design.id)
      if (exists) {
        removeFavorite(design.id)
      } else {
        addFavorite(design)
      }
    },
    [favorites, addFavorite, removeFavorite]
  )

  const clearFavorites = useCallback(() => {
    saveFavorites([])
  }, [saveFavorites])

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
    favorites,
    favoriteCount: favorites.length,
    isMounted: true,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
}
