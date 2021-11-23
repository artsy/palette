import { useEffect, useState, useRef } from "react"

/**
 * useOnScroll is used to track if an element is scrolled vertically or not
 */
export const useOnScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return

    const node = elementRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [elementRef, isScrolled])

  return { isScrolled, elementRef }
}
