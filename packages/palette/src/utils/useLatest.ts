import { useEffect, useRef } from "react"

export const useLatest = <T extends any>(current: T) => {
  const latest = useRef(current)

  useEffect(() => {
    latest.current = current
  })

  return latest
}
