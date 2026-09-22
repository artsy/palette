import React, { useRef } from "react"

/**
 * Returns an id that is stable across renders, for associating a form control
 * with its `<label htmlFor>` when the consumer hasn't supplied an `id`.
 *
 * React 18's `useId` is used when available. The implementation is chosen once,
 * at module load, rather than inside the hook, so that the rules of hooks still
 * hold. The fallback exists because jest maps `react` to `react-17` (see
 * `moduleNameMapper` in package.json) where `useId` does not exist; it is a
 * plain counter and is *not* SSR-safe, so it must never be the path taken in
 * a React 18 runtime.
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
