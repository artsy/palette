import { useEffect, useState } from "react"
import { useResizeObserver } from "./useResizeObserver"

interface UseWidthOf {
  ref: React.MutableRefObject<HTMLElement | null>
}

/** Hook that returns the width of the given node. Updates on resize. */
export const useWidthOf = ({ ref }: UseWidthOf) => {
  const [width, setWidth] = useState(0)

  // Set initial width on mount
  useEffect(() => {
    if (!ref.current) return
    setWidth(ref.current.offsetWidth)
  }, [ref])

  useResizeObserver<HTMLElement>({
    target: (ref as unknown) as React.RefObject<HTMLElement>,
    onResize: (entry) => {
      const element = entry.target as HTMLElement
      setWidth(element.offsetWidth)
    },
  })

  return { width }
}
