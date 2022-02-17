import React, { useEffect, useRef, useCallback } from "react"
import { createPortal as __createPortal__ } from "react-dom"

export const usePortal = () => {
  const appendEl = useRef(document.createElement("div"))

  useEffect(() => {
    if (appendEl.current === null) return

    const el = appendEl.current

    document.body.appendChild(el)

    return () => {
      document.body.removeChild(el)
    }
  }, [])

  const createPortal = useCallback((children: React.ReactNode) => {
    return __createPortal__(children, appendEl.current)
  }, [])

  return { createPortal }
}
