import { useEffect, useLayoutEffect } from "react"

/**
 * Silences the "useLayoutEffect does nothing on the server" warning
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
