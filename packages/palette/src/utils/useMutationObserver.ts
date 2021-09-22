import type { MutableRefObject } from "react"
import { useEffect } from "react"

interface UseMutationObserver {
  onMutate: MutationCallback
  options?: MutationObserverInit
  ref: MutableRefObject<HTMLElement | null>
}

/**
 * Accepts a ref and calls the `onMutate` callback when mutations are observed.
 */
export const useMutationObserver = ({
  onMutate,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
  ref,
}: UseMutationObserver) => {
  useEffect(() => {
    if (typeof MutationObserver === "undefined") {
      return
    }

    if (ref.current) {
      const observer = new MutationObserver(onMutate)

      // Start observing the target node for configured mutations
      observer.observe(ref.current, options)

      return () => {
        observer.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMutate, options])
}
