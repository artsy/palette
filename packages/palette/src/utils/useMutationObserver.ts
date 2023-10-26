import type { MutableRefObject } from "react"
import { useEffect } from "react"

type UseMutationObserver = {
  active?: boolean
  onMutate: MutationCallback
  options?: MutationObserverInit
} & (
  | { ref: MutableRefObject<HTMLElement | null> }
  | { element?: HTMLElement | null }
)

/**
 * Accepts a ref and calls the `onMutate` callback when mutations are observed.
 */
export const useMutationObserver = ({
  active = true,
  onMutate,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
  ...rest
}: UseMutationObserver) => {
  useEffect(() => {
    if (!active || typeof MutationObserver === "undefined") {
      return
    }

    const el = "ref" in rest ? rest.ref.current : rest.element

    if (el) {
      const observer = new MutationObserver(onMutate)

      // Start observing the target node for configured mutations
      observer.observe(el, options)

      return () => {
        observer.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMutate, options, active])
}
