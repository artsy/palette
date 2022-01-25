import React, { useCallback, useEffect, useRef, useState } from "react"
import { useCursor } from "use-cursor"
import { useMutationObserver } from "./useMutationObserver"

const FOCUSABLE_SELECTOR = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
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

  // Set initial focusable elements on mount
  useEffect(updateFocusableEls, [updateFocusableEls])

  const skipUpdateFocusRef = useRef(false)

  // Detects when DOM changes and updates focusable elements
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
        skipUpdateFocusRef.current = true
        updateFocusableEls()
      }
    },
  })

  const {
    index: focusableIndex,
    handlePrev,
    handleNext,
    setCursor,
  } = useCursor({ max: focusableEls.length })

  // Moves focus when index changes
  useEffect(() => {
    if (!focusableEls.length) return

    // In order to avoid a loop when a focus might be the cause of a mutation,
    // we skip focusing the el.
    if (skipUpdateFocusRef.current) {
      skipUpdateFocusRef.current = false
      return
    }

    focusableEls[focusableIndex].focus()
  }, [focusableEls, focusableIndex])

  // Handle keyboard navigation
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

  useEffect(() => {
    // Update the index when any focusable is clicked
    const handleClick = (event: MouseEvent) => {
      if (event.target !== document.activeElement) return

      const index = focusableEls.findIndex((node) => node === event.target)

      if (index === -1) return

      setCursor(index)
    }

    // If focus escapes the trap, pull it back in
    const handleFocusIn = (event: FocusEvent) => {
      const index = focusableEls.findIndex((node) => node === event.target)
      const focusableEl = focusableEls[focusableIndex]

      if (index === -1 && !!focusableEl) {
        event.stopImmediatePropagation()
        focusableEl.focus()
        return
      }
    }

    document.addEventListener("click", handleClick)
    document.addEventListener("focusin", handleFocusIn)
    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [focusableEls, focusableIndex, setCursor])
}
