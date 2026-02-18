import React, { useMemo } from "react"
import {
  useFloating,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  hide as hideMiddleware,
  arrow as arrowMiddleware,
  autoPlacement as autoPlacementMiddleware,
  autoUpdate,
  Placement,
  Middleware,
  MiddlewareState,
} from "@floating-ui/react"
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"

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

/** Element rects captured mid-middleware-chain. */
export interface PositionRects {
  reference: { width: number; height: number; x: number; y: number }
  floating: { width: number; height: number; x: number; y: number }
}

/**
 * Custom middleware that records reference + floating rects so consumers can
 * apply threshold logic (e.g. the 2× rule for arrow centering).
 */
const captureRects: Middleware = {
  name: "captureRects",
  fn({ rects }: MiddlewareState) {
    return { data: rects }
  },
}

/**
 * Will position the floating element (tooltip) relative to the anchor element,
 * using `position: fixed` and in such a way that it shouldn't ever appear
 * partially offscreen and will move correctly when the parent is scrolled.
 */
export const usePosition = ({
  key,
  position,
  offset = 0,
  active = true,
  flip = true,
  clamp = true,
  padding = 0,
  autoPlacement = false,
  arrowRef,
}: {
  /** Listen to changes on this value */
  key?: string | number | boolean
  /** Placement relative to anchor */
  position: Position
  /** Distance from anchor (default: `0`) */
  offset?: number
  /** Optionally disable for performance (default: `true`) */
  active?: boolean
  /**
   * Flip to the opposite side when there is no space. Cannot be combined with
   * `autoPlacement`. (default: `true`)
   */
  flip?: boolean
  /** Optionally disable clamping along the axis (default: `true`) */
  clamp?: boolean
  /** Add boundary padding (default: `0`) used when clamping */
  padding?: number
  /**
   * When true, automatically selects the placement with the most available
   * space instead of using `flip`. Mutually exclusive with `flip`.
   * (default: `false`)
   */
  autoPlacement?: boolean
  /**
   * Ref to the arrow/pointer element. When provided, the `arrow()` middleware
   * is added so that `arrowData` is populated with the exact x/y offset needed
   * to keep the arrow pointing at the anchor even after shift clamping.
   */
  arrowRef?: React.RefObject<Element | null>
}) => {
  const middleware = useMemo(() => {
    const mw: Middleware[] = []

    if (offset || padding) {
      mw.push(offsetMiddleware(offset || padding))
    }

    if (autoPlacement) {
      mw.push(autoPlacementMiddleware())
    } else if (flip) {
      mw.push(flipMiddleware())
    }

    if (clamp) {
      mw.push(shiftMiddleware({ padding }))
    }

    // Capture rects before arrow so the threshold is based on un-shifted sizes
    mw.push(captureRects)

    if (arrowRef) {
      mw.push(arrowMiddleware({ element: arrowRef, padding: 4 }))
    }

    mw.push(hideMiddleware())

    return mw
    // arrowRef is a stable ref object — its identity doesn't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, flip, clamp, padding, autoPlacement, arrowRef])

  const {
    refs,
    floatingStyles,
    placement: resolvedPlacement,
    update,
    middlewareData,
    context,
  } = useFloating({
    placement: position as Placement,
    middleware,
    strategy: "fixed",
    open: active,
    onOpenChange: () => {},
    whileElementsMounted: active ? autoUpdate : undefined,
  })

  // Re-position when key changes
  useIsomorphicLayoutEffect(() => {
    if (active) update()
  }, [key, active, update])

  const isFlipped = resolvedPlacement !== position

  // Create ref-like objects that sync with Floating UI's refs.
  const anchorRef: React.MutableRefObject<HTMLElement | null> = useMemo(
    () => ({
      get current() {
        return (refs.reference as React.MutableRefObject<HTMLElement | null>)
          .current
      },
      set current(node: HTMLElement | null) {
        refs.setReference(node)
      },
    }),
    [refs]
  )

  const tooltipRef: React.MutableRefObject<HTMLElement | null> = useMemo(
    () => ({
      get current() {
        return refs.floating.current
      },
      set current(node: HTMLElement | null) {
        refs.setFloating(node)
      },
    }),
    [refs]
  )

  // Hide the floating element when the reference scrolls out of view
  const isReferenceHidden = middlewareData.hide?.referenceHidden ?? false

  const mergedFloatingStyles: React.CSSProperties = {
    ...floatingStyles,
    ...(isReferenceHidden ? { visibility: "hidden" } : {}),
  }

  const arrowData = middlewareData.arrow as
    | { x?: number; y?: number }
    | undefined

  const rects = middlewareData.captureRects as PositionRects | undefined

  return {
    tooltipRef,
    anchorRef,
    resolvedPlacement: resolvedPlacement as Position,
    arrowData,
    rects,
    context,
    state: { isFlipped },
    floatingStyles: mergedFloatingStyles,
  }
}

/**
 * Calculate the maximum height available for a tooltip based on its placement and viewport constraints.
 */
export const calculateMaxHeight = ({
  anchorRect,
  position,
  offset = 0,
}: {
  anchorRect: DOMRect
  position: Position
  offset?: number
}): number => {
  const viewportHeight = window.innerHeight

  switch (position) {
    case "top-start":
    case "top":
    case "top-end":
      // Space from top of anchor to top of viewport
      return anchorRect.top - offset * 2
    case "bottom-start":
    case "bottom":
    case "bottom-end":
      // Space from bottom of anchor to bottom of viewport
      return viewportHeight - anchorRect.bottom - offset * 2
    case "left-start":
    case "left":
    case "left-end":
    case "right-start":
    case "right":
    case "right-end":
      // For side placements, use the entire viewport height
      return viewportHeight - offset * 2
    default:
      return viewportHeight
  }
}
