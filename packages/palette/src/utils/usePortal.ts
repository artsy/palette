import React, { useEffect, useRef, useCallback } from "react"
import { createPortal as __createPortal__ } from "react-dom"

export const usePortal = () => {
  const appendEl = useRef<HTMLDivElement | null>(null)

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
      if (typeof window === "undefined") return null

      // May execute before effect runs and appendEl is set
      const el = appendEl.current ?? document.createElement("div")
      appendEl.current = el

      return __createPortal__(children, el)
    },
    []
  )

  return { createPortal }
}
