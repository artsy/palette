import { useEffect, useState } from "react"

interface UseWidthOf {
  ref: React.MutableRefObject<HTMLElement | null>
}

/** Hook that returns the width of the given node. Updates on resize. */
export const useWidthOf = ({ ref }: UseWidthOf) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const handleResize = () => {
      if (!ref.current) return
      setWidth(ref.current.offsetWidth)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return { width }
}
