/**
 * Adapted from https://codesandbox.io/s/positioning-tooltip-rhplo
 */
import { useState } from "react"
import { useRef } from "react"
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
 */
export const usePosition = ({
  key,
  position,
  offset = 0,
  active = true,
  flip = true,
  clamp = true,
  padding = 0,
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
  /** Add boundary padding (default: `0`) used when clamping */
  padding?: number
}) => {
  const [state, setState] = useState<ReturnType<typeof placeTooltip>>({
    isFlipped: false,
  })

  const tooltipRef = useRef<HTMLElement | null>(null)
  const anchorRef = useRef<HTMLElement | null>(null)

  const update = () => {
    if (!active || !tooltipRef.current || !anchorRef.current) return

    const { current: tooltip } = tooltipRef
    const { current: anchor } = anchorRef

    requestAnimationFrame(() => {
      setState(
        placeTooltip({
          anchor,
          tooltip,
          position,
          offset,
          flip,
          clamp,
          padding,
        })
      )
    })
  }

  // Re-position when there's any change to the tooltip
  useMutationObserver({ ref: tooltipRef, onMutate: update, active })

  // Re-position when there's any change to the anchor's size
  useResizeObserver({ target: anchorRef, onResize: update, active })

  // Listen to changes on key
  useIsomorphicLayoutEffect(update, [key])

  useIsomorphicLayoutEffect(() => {
    if (!active || !tooltipRef.current || !anchorRef.current) return

    const { current: tooltip } = tooltipRef
    const { current: anchor } = anchorRef

    tooltip.style.position = "fixed"
    tooltip.style.top = "0"
    tooltip.style.left = "0"

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setState(
          placeTooltip({
            anchor,
            tooltip,
            position,
            offset,
            flip,
            clamp,
            padding,
          })
        )
      })
    }

    document.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    const handleResize = () => {
      requestAnimationFrame(() => {
        setState(
          placeTooltip({
            anchor,
            tooltip,
            position,
            offset,
            flip,
            clamp,
            padding,
          })
        )
      })
    }

    window.addEventListener("resize", handleResize, { passive: true })

    requestAnimationFrame(() => {
      setState(
        placeTooltip({
          anchor,
          tooltip,
          position,
          offset,
          flip,
          clamp,
          padding,
        })
      )
    })

    return () => {
      document.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [active, tooltipRef, anchorRef, position])

  return {
    // Element that floating element is anchored to
    tooltipRef,
    // Element you want to position relative to the anchor
    anchorRef,
    state,
  }
}

interface PlaceTooltip {
  anchor: HTMLElement
  tooltip: HTMLElement
  position: Position
  offset?: number
  boundaryRect?: DOMRect
  flip?: boolean
  clamp?: boolean
  padding?: number
}

export const placeTooltip = ({
  anchor,
  tooltip,
  position,
  offset = 0,
  boundaryRect = getDocumentBoundingRect(),
  flip = true,
  clamp = true,
  padding = 0,
}: PlaceTooltip) => {
  const elementRect = anchor.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  let targetPosition = getPosition({
    elementRect,
    tooltipRect,
    position,
  })

  // Flip to avoid edges
  const isFlipped =
    flip &&
    shouldFlip({
      targetPosition,
      position,
      boundaryRect,
      tooltipRect,
    })

  if (isFlipped) {
    position = getOppositePosition(position)
    targetPosition = getPosition({ elementRect, tooltipRect, position })
  }

  // Clamp position within boundary
  if (clamp) {
    targetPosition.x = Math.max(boundaryRect.left, targetPosition.x)
    targetPosition.x = Math.min(
      boundaryRect.right - tooltipRect.width,
      targetPosition.x
    )
    targetPosition.y = Math.max(boundaryRect.top, targetPosition.y)
    targetPosition.y = Math.min(
      boundaryRect.bottom - tooltipRect.height,
      targetPosition.y
    )

    // Apply padding to boundary
    switch (position) {
      case "top-start":
      case "top":
      case "top-end":
      case "bottom-start":
      case "bottom":
      case "bottom-end":
        targetPosition.x = targetPosition.x - padding
        break
      case "left-start":
      case "left":
      case "left-end":
      case "right-start":
      case "right":
      case "right-end":
        targetPosition.y = targetPosition.y + padding
        break
    }
  }

  // Should hide entirely if it scrolls out of view
  const shouldHide = !isWithin(elementRect, boundaryRect)
  tooltip.style.display = shouldHide ? "none" : "block"

  tooltip.style.transform = translateWithOffset(
    targetPosition,
    position,
    offset
  )

  return { isFlipped }
}

export const getPosition = ({
  elementRect,
  tooltipRect,
  position,
}: {
  elementRect: Pick<
    DOMRect,
    "width" | "height" | "top" | "right" | "bottom" | "left"
  >
  tooltipRect: Pick<DOMRect, "width" | "height">
  position: Position
}): TargetPosition => {
  let x: number
  let y: number

  // X position
  switch (position) {
    case "top-start":
    case "bottom-start":
      x = elementRect.left
      break
    case "top":
    case "bottom":
      x = elementRect.left + elementRect.width / 2 - tooltipRect.width / 2
      break
    case "top-end":
    case "bottom-end":
      x = elementRect.right - tooltipRect.width
      break
    case "left-start":
    case "left":
    case "left-end":
      // [..] {XXX}
      x = elementRect.left - tooltipRect.width
      break
    case "right-start":
    case "right":
    case "right-end":
      // {XXX} [...]
      x = elementRect.right
      break
  }

  // Y position
  switch (position) {
    case "left-start":
    case "right-start":
      y = elementRect.top
      break
    case "left":
    case "right":
      y = elementRect.top + elementRect.height / 2 - tooltipRect.height / 2
      break
    case "left-end":
    case "right-end":
      y = elementRect.bottom - tooltipRect.height
      break
    case "top-start":
    case "top":
    case "top-end":
      // [..]
      // {XXX}
      y = elementRect.top - tooltipRect.height
      break
    case "bottom-start":
    case "bottom":
    case "bottom-end":
      // {XXX}
      // [...]
      y = elementRect.bottom
      break
  }

  return { x, y }
}

export const translateWithOffset = (
  targetPosition: TargetPosition,
  position: Position,
  offset: number
) => {
  const [x, y] = (() => {
    switch (position) {
      case "top-start":
        return [targetPosition.x, targetPosition.y - offset]
      case "top":
        return [targetPosition.x, targetPosition.y - offset]
      case "top-end":
        return [targetPosition.x, targetPosition.y - offset]
      case "bottom-start":
        return [targetPosition.x, targetPosition.y + offset]
      case "bottom":
        return [targetPosition.x, targetPosition.y + offset]
      case "bottom-end":
        return [targetPosition.x, targetPosition.y + offset]
      case "left-start":
        return [targetPosition.x - offset, targetPosition.y]
      case "left":
        return [targetPosition.x - offset, targetPosition.y]
      case "left-end":
        return [targetPosition.x - offset, targetPosition.y]
      case "right-start":
        return [targetPosition.x + offset, targetPosition.y]
      case "right":
        return [targetPosition.x + offset, targetPosition.y]
      case "right-end":
        return [targetPosition.x + offset, targetPosition.y]
    }
  })()

  return `translate(${x}px, ${y}px)`
}

const getOppositePosition = (position: Position) => {
  switch (position) {
    case "top-start":
      return "bottom-start"
    case "top":
      return "bottom"
    case "top-end":
      return "bottom-end"
    case "bottom-start":
      return "top-start"
    case "bottom":
      return "top"
    case "bottom-end":
      return "top-end"
    case "left-start":
      return "right-start"
    case "left":
      return "right"
    case "left-end":
      return "right-end"
    case "right-start":
      return "left-start"
    case "right":
      return "left"
    case "right-end":
      return "left-end"
  }
}

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

interface ShouldFlip {
  targetPosition: TargetPosition
  position: Position
  boundaryRect: Pick<DOMRect, "top" | "right" | "bottom" | "left">
  tooltipRect: Pick<DOMRect, "width" | "height">
}

export const shouldFlip = ({
  targetPosition,
  position,
  boundaryRect,
  tooltipRect,
}: ShouldFlip) => {
  switch (position) {
    case "top-start":
    case "top":
    case "top-end":
      return targetPosition.y < boundaryRect.top
    case "bottom-start":
    case "bottom":
    case "bottom-end":
      return targetPosition.y + tooltipRect.height > boundaryRect.bottom
    case "left-start":
    case "left":
    case "left-end":
      return targetPosition.x < boundaryRect.left
    case "right-start":
    case "right":
    case "right-end":
      return targetPosition.x + tooltipRect.width > boundaryRect.right
  }
}

const isWithin = (elementRect: DOMRect, boundaryRect: DOMRect) => {
  return (
    boundaryRect.top < elementRect.bottom &&
    boundaryRect.left < elementRect.right &&
    boundaryRect.bottom > elementRect.top &&
    boundaryRect.right > elementRect.left
  )
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
