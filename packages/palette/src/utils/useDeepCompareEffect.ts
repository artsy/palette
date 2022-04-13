import { isEqual } from "lodash"
import { useEffect, useMemo, useRef } from "react"

export type UseEffectParams = Parameters<typeof useEffect>
export type EffectCallback = UseEffectParams[0]
export type DependencyList = UseEffectParams[1]
export type UseEffectReturn = ReturnType<typeof useEffect>

const checkDeps = (deps: DependencyList) => {
  if (!deps || !deps.length) {
    throw new Error(
      "useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead."
    )
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      "useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead."
    )
  }
}

function isPrimitive(val: unknown) {
  return val == null || /^[sbn]/.test(typeof val)
}

// https://github.com/kentcdodds/use-deep-compare-effect
export const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
  shouldCheckDeps = true
): UseEffectReturn => {
  if (shouldCheckDeps && process.env.NODE_ENV !== "production") {
    checkDeps(dependencies)
  }

  const ref = useRef(dependencies)
  const signalRef = useRef<number>(0)

  if (!isEqual(dependencies, ref.current)) {
    ref.current = dependencies
    signalRef.current += 1
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedDependencies = useMemo(() => ref.current, [signalRef.current])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, memoizedDependencies)
}
