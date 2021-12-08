import React, { useEffect, useState, useRef } from "react"
import { Box } from "../elements/Box"

/**
 * Used to track if the returned sentinel is in the viewport or not
 */
export const useSentinelVisibility = () => {
  const [isSentinelVisible, setSentinelVisibility] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return // Unsupported

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSentinelVisibility(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [isSentinelVisible])

  return {
    isSentinelVisible,
    sentinel: (
      <Box ref={ref as any} position="relative" width="100%" height={0} />
    ),
  }
}
