import { useEffect, useMemo, useState } from "react"

/**
 * Returns true when component enters viewport
 * @param ref reference to component
 */
export const useHasEnteredViewport = (ref: React.RefObject<HTMLElement>) => {

  const [hasEntered, setHasEntered] = useState(false)

  let observer: IntersectionObserver = null

  if (typeof window !== "undefined"){
    observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setHasEntered(entry.isIntersecting)
      ), [ref])
  }


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return hasEntered
}
