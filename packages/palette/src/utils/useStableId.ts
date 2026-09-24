import React, { useRef } from "react"

/**
 * A render-stable id, for associating a form control with its label.
 *
 * Picks `useId` at module load, not in the hook, so the rules of hooks hold.
 * The counter fallback is for jest, which maps `react` to `react-17`; it is
 * not SSR-safe.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactUseId: (() => string) | undefined = (React as any).useId

let counter = 0

const useIncrementingId = (prefix: string) => {
  const ref = useRef<string>()

  if (!ref.current) {
    counter += 1
    ref.current = `${prefix}-${counter}`
  }

  return ref.current
}

export const useStableId = reactUseId
  ? (prefix = "palette") => `${prefix}-${reactUseId()}`
  : (prefix = "palette") => useIncrementingId(prefix)
