import { useEffect, useState, RefObject } from "react"

/**
 * useOnScroll is used to track if an element is scrolled vertically or not
 */
export const useOnScroll = (ref: RefObject<HTMLElement>) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return

    const node = ref.current
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

    observer.observe(ref.current)

    return () => {
      observer.unobserve(node)
    }
  }, [ref, isScrolled])

  return { isScrolled }
}
