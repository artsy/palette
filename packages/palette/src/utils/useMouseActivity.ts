import { useEffect, useRef } from "react"

interface UseMouseActivityProps {
  /** Optionally disable for performance (default: `true`) */
  active?: boolean
}

export const useMouseActivity = (
  { active }: UseMouseActivityProps = { active: true }
) => {
  const lastMouseMoveTimestamp = useRef<number>(0)

  useEffect(() => {
    if (!active) return

    const handleMouseMove = () => {
      lastMouseMoveTimestamp.current = performance.now()
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [active])

  return { lastMouseMoveTimestamp }
}
