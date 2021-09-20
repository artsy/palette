import React, { useCallback, useEffect, useState } from "react"
import { useCursor } from "use-cursor"
import { useMutationObserver } from "./useMutationObserver"

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  '[tabindex="0"]',
].join(", ")

/**
 * Locks focus within the given element
 */
export const useFocusLock = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  const [focusableEls, setFocusableEls] = useState<HTMLElement[]>([])

  const updateFocusableEls = useCallback(() => {
    if (ref.current === null) return

    setFocusableEls(
      Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(updateFocusableEls, [updateFocusableEls])

  useMutationObserver({
    ref,
    onMutate: (mutations) => {
      // Check to see if any of the mutations has either added or removed nodes
      const hasMeaningfullyMutated = mutations.some((mutation) => {
        return (
          mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
        )
      })

      if (hasMeaningfullyMutated) {
        updateFocusableEls()
      }
    },
  })

  const { index: focusableIndex, handlePrev, handleNext } = useCursor({
    max: focusableEls.length,
  })

  useEffect(() => {
    if (!focusableEls.length) return

    // Moves focus when index changes
    focusableEls[focusableIndex].focus()
  }, [focusableEls, focusableIndex])

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Tab":
          // Lock focus within element
          event.preventDefault()
          event.stopPropagation()

          // Move focus up or down
          event.shiftKey ? handlePrev() : handleNext()
          break
        default:
          break
      }
    }

    const focusedElPriorToOpen = document.activeElement as HTMLElement

    document.addEventListener("keydown", handleKeydown)

    return () => {
      // Return the focus
      focusedElPriorToOpen.focus()

      document.removeEventListener("keydown", handleKeydown)
    }
  }, [handleNext, handlePrev])
}
