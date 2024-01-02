import React, { useEffect, useRef, useCallback } from "react"
import { createPortal as __createPortal__ } from "react-dom"
import { useDidMount } from "./useDidMount"

export const usePortal = () => {
  const appendEl = useRef<HTMLDivElement | null>(null)

  const isMounted = useDidMount()

  useEffect(() => {
    const el = appendEl.current ?? document.createElement("div")
    appendEl.current = el

    document.body.appendChild(el)

    return () => {
      try {
        document.body.removeChild(el)
      } catch (e) {
        // Ignore
      }
    }
  }, [])

  const createPortal = useCallback(
    (children: React.ReactNode): React.ReactPortal | null => {
      if (!isMounted) return null

      // May execute before effect runs and appendEl is set
      const el = appendEl.current ?? document.createElement("div")
      appendEl.current = el

      return __createPortal__(children, el)
    },
    [isMounted]
  )

  return { createPortal }
}
