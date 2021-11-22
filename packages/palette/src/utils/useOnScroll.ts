import { useEffect, useState, RefObject } from "react"

/**
 * useOnScroll is used to track if an element is scrolled vertically or not
 */
export const useOnScroll = (ref: RefObject<HTMLElement>) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      const onScroll = () => {
        if (node.scrollTop > 0) {
          !isScrolled && setIsScrolled(true)
        } else {
          isScrolled && setIsScrolled(false)
        }
      }

      node.addEventListener("scroll", onScroll, false)

      return () => {
        node.removeEventListener("scroll", onScroll, false)
      }
    }
  }, [ref, isScrolled])

  return { isScrolled }
}
