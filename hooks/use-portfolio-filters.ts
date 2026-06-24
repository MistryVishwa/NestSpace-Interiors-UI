"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { PortfolioItem } from "@/app/portfolio/portfolio-gallery"

export function usePortfolioFilters(items: PortfolioItem[]) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get("category") || "All"
  const year = searchParams.get("year") || "All"
  const city = searchParams.get("city") || "All"

  // Extract unique years from items
  const uniqueYears = useMemo(() => {
    const years = items
      .map((item) => item.date)
      .filter((date): date is string => !!date)
    return ["All", ...Array.from(new Set(years))].sort((a, b) => b.localeCompare(a)) // sort descending
  }, [items])

  // Extract unique cities parsed from location field (first word before comma)
  const uniqueCities = useMemo(() => {
    const cities = items
      .map((item) => {
        if (!item.location) return ""
        return item.location.split(",")[0].trim()
      })
      .filter((city) => city !== "")
    return ["All", ...Array.from(new Set(cities))].sort()
  }, [items])

  // Filter items based on active parameters (additive)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category
      const matchesYear = year === "All" || item.date === year

      const itemCity = item.location ? item.location.split(",")[0].trim() : ""
      const matchesCity = city === "All" || itemCity.toLowerCase() === city.toLowerCase()

      return matchesCategory && matchesYear && matchesCity
    })
  }, [items, category, year, city])

  const isFiltered = category !== "All" || year !== "All" || city !== "All"

  const updateFilters = (newFilters: { category?: string; year?: string; city?: string }) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newFilters.category !== undefined) {
      if (newFilters.category === "All") {
        params.delete("category")
      } else {
        params.set("category", newFilters.category)
      }
    }

    if (newFilters.year !== undefined) {
      if (newFilters.year === "All") {
        params.delete("year")
      } else {
        params.set("year", newFilters.year)
      }
    }

    if (newFilters.city !== undefined) {
      if (newFilters.city === "All") {
        params.delete("city")
      } else {
        params.set("city", newFilters.city)
      }
    }

    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    router.push(url, { scroll: false })
  }

  const setCategory = (value: string) => updateFilters({ category: value })
  const setYear = (value: string) => updateFilters({ year: value })
  const setCity = (value: string) => updateFilters({ city: value })

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("year")
    params.delete("city")
    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    router.push(url, { scroll: false })
  }

  return {
    category,
    year,
    city,
    uniqueYears,
    uniqueCities,
    filteredItems,
    isFiltered,
    setCategory,
    setYear,
    setCity,
    clearFilters,
  }
}
