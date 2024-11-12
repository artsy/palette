import { useDidMount } from "@artsy/palette"
import { RefObject, useEffect, useRef, useState } from "react"

interface UseIntersectionObserverProperties {
  ref?: RefObject<Element> | null
  once?: boolean
  options?: {
    threshold: number | number[]
    root?: Element
    rootMargin?: string
  }
  onIntersection?: (entries: IntersectionObserverEntry[]) => void
  onOffIntersection?: (entries: IntersectionObserverEntry[]) => void
}

// tslint:disable-next-line:completed-docs
export const useIntersectionObserver = ({
  once = true,
  options = { threshold: 0 },
  onIntersection,
  onOffIntersection,
}: UseIntersectionObserverProperties) => {
  const isClient = useDidMount()

  const ref = useRef<HTMLElement | null>(null)

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!observer) return

    if (once) {
      const hasIntersected = entries.some(
        // tslint:disable-next-line:no-shadowed-variable
        ({ isIntersecting }) => isIntersecting
      )

      if (hasIntersected) {
        onIntersection?.(entries)
        observer.disconnect()
      } else {
        onOffIntersection?.(entries)
      }

      return
    }

    const isIntersecting = entries[entries.length - 1].isIntersecting

    if (!isIntersecting) {
      onOffIntersection?.(entries)
      return
    }

    onIntersection?.(entries)
  }

  const [observer] = useState(() =>
    isClient ? new IntersectionObserver(handleIntersect, options) : undefined
  )

  useEffect(() => {
    if (!ref.current || !observer) return

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return { ref }
}
