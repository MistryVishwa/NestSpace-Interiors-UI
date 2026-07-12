"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options
  const [isVisible, setIsVisible] = useState(false)
  // Store the DOM node in state so the effect below reacts to mount/unmount.
  // Deliberately no useRef: if this hook called useRef(), the react-hooks/refs rule
  // would mark the returned { ref, isVisible } object as ref-tainted and flag every
  // property access on it in consumer components during render.
  const [element, setElement] = useState<T | null>(null)

  // Callback ref — React invokes this with the DOM node on mount and null on unmount.
  // Storing the element in state (above) causes the effect below to run and wire up
  // (or tear down) the IntersectionObserver.
  const ref = useCallback((el: T | null) => {
    setElement(el)
  }, [])

  useEffect(() => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [element, threshold, rootMargin, once])

  return { ref, isVisible }
}



export function useScrollRevealMany<T extends HTMLElement = HTMLElement>(
  count: number,
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options
  const refs = useRef<(T | null)[]>([])
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false))

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    refs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setVisibleItems((prev) => {
              const next = [...prev]
              next[index] = false
              return next
            })
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [count, threshold, rootMargin, once])

  const setRef = (index: number) => (el: T | null) => {
    refs.current[index] = el
  }

  return { setRef, visibleItems }
}