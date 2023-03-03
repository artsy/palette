import React, { useCallback, useEffect, useRef, useState } from "react"
import { useCursor } from "use-cursor"
import { useMutationObserver } from "./useMutationObserver"
import { tabbable } from "tabbable"

interface UseFocusLock {
  ref: React.MutableRefObject<HTMLElement | null>
  active?: boolean
}

type FocusableElement = HTMLElement | SVGElement

const MUTATION_OBSERVER_OPTIONS = {
  attributes: true,
  subtree: true,
  attributeFilter: ["disabled"],
}

/**
 * Locks focus within the given element
 */
export const useFocusLock = ({ ref, active = true }: UseFocusLock) => {
  const [focusableEls, setFocusableEls] = useState<FocusableElement[]>([])

  const updateFocusableEls = useCallback(() => {
    if (ref.current === null) return

    setFocusableEls(tabbable(ref.current))

    // When `active` changes that typically means our target ref
    // is being inserted into the DOM, so we need to update the focusable elements.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Set initial focusable elements on mount
  useEffect(() => {
    // Wait for the next tick to ensure focusable elements are in the DOM
    const timeout = setTimeout(() => {
      updateFocusableEls()
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
  }, [updateFocusableEls])

  const skipUpdateFocusRef = useRef(false)

  const handleMutate = useCallback(
    (mutations: MutationRecord[]) => {
      // Check to see if any of the mutations has either added or removed nodes
      const hasMeaningfullyMutated = mutations.some((mutation) => {
        return (
          mutation.addedNodes.length > 0 ||
          mutation.removedNodes.length > 0 ||
          mutation.attributeName === "disabled"
        )
      })

      if (hasMeaningfullyMutated) {
        skipUpdateFocusRef.current = true
        updateFocusableEls()
      }
    },
    [updateFocusableEls]
  )

  // Detects when DOM changes and updates focusable elements
  useMutationObserver({
    ref,
    onMutate: handleMutate,
    options: MUTATION_OBSERVER_OPTIONS,
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
      if (!active) return

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
  }, [active, handleNext, handlePrev])

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
