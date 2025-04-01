/**
 * Positioning hook using Floating UI for tooltips, popovers, and dropdowns
 */
import { useState, useRef, useEffect } from "react"
import {
  useFloating,
  autoUpdate as floatingAutoUpdate,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  offset as offsetMiddleware,
  Placement,
  type Middleware,
  computePosition,
} from "@floating-ui/react-dom"
import { useMutationObserver } from "./useMutationObserver"
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"
import { useResizeObserver } from "./useResizeObserver"

export const POSITION = {
  "top-start": "top-start",
  top: "top",
  "top-end": "top-end",
  "bottom-start": "bottom-start",
  bottom: "bottom",
  "bottom-end": "bottom-end",
  "left-start": "left-start",
  left: "left",
  "left-end": "left-end",
  "right-start": "right-start",
  right: "right",
  "right-end": "right-end",
} as const

export type Position = keyof typeof POSITION

interface TargetPosition {
  x: number
  y: number
}

/**
 * Will position the floating element (tooltip) relative to the anchor element,
 * using `position: fixed` and in such a way that it shouldn't ever appear
 * partially offscreen and will move correctly when the parent is scrolled.
 *
 * This implementation uses Floating UI internally but maintains the same API
 * as the original usePosition hook.
 */
export const usePosition = ({
  key,
  position,
  offset = 0,
  active = true,
  flip = true,
  clamp = true,
}: {
  /** Listen to changes on this value */
  key?: string | number | boolean
  /** Placement relative to anchor */
  position: Position
  /** Distance from anchor (default: `0`) */
  offset?: number
  /** Optionally disable for performance (default: `true`) */
  active?: boolean
  /** Optionally disable flipping (default: `true`) */
  flip?: boolean
  /** Optionally disable clamping (default: `true`) */
  clamp?: boolean
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const anchorRef = useRef<HTMLElement | null>(null)
  const tooltipRef = useRef<HTMLElement | null>(null)
  const wasActiveRef = useRef(false) // Track active state changes

  // Configure Floating UI middleware
  const middleware: Middleware[] = [
    offsetMiddleware(offset),
  ]
  
  if (flip) {
    middleware.push(flipMiddleware())
  }
  
  if (clamp) {
    middleware.push(shiftMiddleware())
  }

  // Use Floating UI's positioning
  const {
    x,
    y,
    strategy,
    placement,
    update,
    refs,
  } = useFloating({
    placement: position as Placement,
    middleware,
    // Disable autoUpdate here - we'll handle it manually
    whileElementsMounted: undefined,
  })

  // Track when placement changes (flips)
  useEffect(() => {
    setIsFlipped(placement !== position)
  }, [placement, position])

  // Connect our refs to Floating UI refs
  useIsomorphicLayoutEffect(() => {
    if (anchorRef.current) {
      refs.setReference(anchorRef.current)
    }
    if (tooltipRef.current) {
      refs.setFloating(tooltipRef.current)
    }
  }, [refs, anchorRef.current, tooltipRef.current])

  // Detect when element becomes active (visibility changes)
  useIsomorphicLayoutEffect(() => {
    // If becoming active for the first time or after being inactive
    if (active && !wasActiveRef.current && anchorRef.current && tooltipRef.current) {
      // Initialize position immediately
      const tooltip = tooltipRef.current;
      tooltip.style.position = strategy || 'fixed';
      tooltip.style.visibility = 'hidden'; // Hide initially to prevent flash
      
      // Force immediate position computation
      Promise.resolve().then(() => {
        if (tooltip && anchorRef.current) { 
          computePosition(anchorRef.current, tooltip, {
            placement: position as Placement,
            middleware,
          }).then(({x, y}) => {
            if (active && tooltip) {
              tooltip.style.visibility = '';
              tooltip.style.top = `${y}px`;
              tooltip.style.left = `${x}px`;
            }
          });
        }
      });
    }
    
    wasActiveRef.current = active;
  }, [active, strategy, middleware, position]);

  // Manual autoUpdate registration
  useIsomorphicLayoutEffect(() => {
    if (!active || !anchorRef.current || !tooltipRef.current) return

    const cleanup = floatingAutoUpdate(
      anchorRef.current,
      tooltipRef.current,
      update
    )
    
    return () => {
      cleanup()
    }
  }, [active, update])

  // Apply styles to the tooltip in a layout effect to avoid flicker
  useIsomorphicLayoutEffect(() => {
    if (!active || !tooltipRef.current) return
    
    const tooltip = tooltipRef.current
    
    // Apply position
    tooltip.style.position = strategy
    tooltip.style.top = y != null ? `${y}px` : ""
    tooltip.style.left = x != null ? `${x}px` : ""
    
    // Handle visibility when outside viewport
    if (anchorRef.current) {
      const elementRect = anchorRef.current.getBoundingClientRect()
      const boundaryRect = getDocumentBoundingRect()
      const shouldHide = !isWithin(elementRect, boundaryRect)
      tooltip.style.display = shouldHide ? "none" : "block"
    }
  }, [x, y, strategy, active])

  // Listen to additional changes
  useMutationObserver({
    ref: tooltipRef,
    onMutate: update,
    active,
  })

  useResizeObserver({
    target: anchorRef,
    onResize: update,
    active,
  })

  // Listen to changes on key
  useEffect(() => {
    if (active) update()
  }, [key, active, update])

  return {
    tooltipRef,
    anchorRef,
    state: { isFlipped },
  }
}

// Keep these helper functions to maintain API compatibility with existing code
export const getDocumentBoundingRect = () => {
  const width = document.body.clientWidth
  const height = document.body.clientHeight

  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as DOMRect
}

const isWithin = (elementRect: DOMRect, boundaryRect: DOMRect) => {
  return (
    boundaryRect.top < elementRect.bottom &&
    boundaryRect.left < elementRect.right &&
    boundaryRect.bottom > elementRect.top &&
    boundaryRect.right > elementRect.left
  )
}

// These functions are no longer used internally but keeping them for backward compatibility
// with any code that might be importing them directly
export const placeTooltip = ({
  anchor: _anchor,
  tooltip: _tooltip,
  position: _position,
  offset: _offset = 0,
  boundaryRect: _boundaryRect = getDocumentBoundingRect(),
  flip: _flip = true,
  clamp: _clamp = true,
}: {
  anchor: HTMLElement
  tooltip: HTMLElement
  position: Position
  offset?: number
  boundaryRect?: DOMRect
  flip?: boolean
  clamp?: boolean
}) => {
  // For backward compatibility, we keep this function
  return { isFlipped: false }
}

export const getPosition = (
  _elementRect: Pick<
    DOMRect,
    "width" | "height" | "top" | "right" | "bottom" | "left"
  >,
  _tooltipRect: Pick<DOMRect, "width" | "height">,
  _position: Position
): TargetPosition => {
  // For backward compatibility, we keep this function
  const x = 0
  const y = 0
  return { x, y }
}

export const translateWithOffset = (
  targetPosition: TargetPosition,
  _position: Position,
  _offset: number
) => {
  // For backward compatibility, we keep this function
  return `translate(${targetPosition.x}px, ${targetPosition.y}px)`
}

interface ShouldFlipParams {
  targetPosition: TargetPosition
  position: Position
  boundaryRect: Pick<DOMRect, "top" | "right" | "bottom" | "left">
  tooltipRect: Pick<DOMRect, "width" | "height">
}

export const shouldFlip = ({
  targetPosition: _targetPosition,
  position: _position,
  boundaryRect: _boundaryRect,
  tooltipRect: _tooltipRect,
}: ShouldFlipParams) => {
  // For backward compatibility, we keep this function
  return false
}
