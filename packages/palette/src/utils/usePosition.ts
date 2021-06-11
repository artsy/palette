/**
 * Adapted from https://codesandbox.io/s/positioning-tooltip-rhplo
 */
import { useEffect, useLayoutEffect, useRef } from "react"

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
  position,
  offset = 0,
  active = true,
}: {
  position: Position
  /** Distance from anchor (default: `0`) */
  offset?: number
  /** Optionally disable for performance (default: `true`) */
  active?: boolean
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!tooltipRef.current || !anchorRef.current) return

    const { current: tooltip } = tooltipRef
    const { current: anchor } = anchorRef

    tooltip.style.position = "fixed"
    tooltip.style.top = "0"
    tooltip.style.left = "0"

    const scrollableParents = getScrollableParents(anchor)

    const handlers = scrollableParents.map((scrollableParent) => {
      return {
        scrollableParent,
        handlerScroll: () => {
          if (!active) return
          placeTooltip(anchor, tooltip, position, scrollableParents, offset)
        },
      }
    })

    handlers.forEach(({ scrollableParent, handlerScroll }) => {
      if (!active) return
      scrollableParent.addEventListener("scroll", handlerScroll, {
        passive: true,
      })
    })

    const handleResize = () => {
      placeTooltip(anchor, tooltip, position, scrollableParents, offset)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    placeTooltip(anchor, tooltip, position, scrollableParents, offset)

    return () => {
      handlers.forEach(({ scrollableParent, handlerScroll }) => {
        scrollableParent.removeEventListener("scroll", handlerScroll)
      })

      window.removeEventListener("resize", handleResize)
    }
  }, [active, tooltipRef, anchorRef])

  return {
    // Element that floating element is anchored to
    tooltipRef,
    // Element you want to position relative to the anchor
    anchorRef,
  }
}

const isDocument = (element: HTMLElement | Document): element is Document => {
  return element.ownerDocument === null
}

const placeTooltip = (
  anchor: HTMLElement,
  tooltip: HTMLElement,
  position: Position,
  scrollableParents: Array<HTMLElement | Document>,
  offset = 0
) => {
  const elementRect = anchor.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  let targetPosition = getPosition(elementRect, tooltipRect, position)

  // Flip to avoid edges
  for (const scrollableParent of scrollableParents) {
    const boundaryRect = isDocument(scrollableParent)
      ? getDocumentBoundingRect()
      : scrollableParent.getBoundingClientRect()
    if (shouldFlip(targetPosition, position, boundaryRect, tooltipRect)) {
      position = getOppositePosition(position)
      targetPosition = getPosition(elementRect, tooltipRect, position)
    }
  }

  // Clamp position within boundary
  for (const scrollableParent of scrollableParents) {
    const boundaryRect = isDocument(scrollableParent)
      ? getDocumentBoundingRect()
      : scrollableParent.getBoundingClientRect()
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
  }

  let shouldHide = false

  for (const scrollableParent of scrollableParents) {
    const boundaryRect = isDocument(scrollableParent)
      ? getDocumentBoundingRect()
      : scrollableParent.getBoundingClientRect()
    if (!isWithin(elementRect, boundaryRect)) {
      shouldHide = true
      break
    }
  }

  tooltip.style.display = shouldHide ? "none" : "block"

  tooltip.style.transform = translateWithOffset(
    targetPosition,
    position,
    offset
  )
}

const getPosition = (
  elementRect: DOMRect,
  tooltipRect: DOMRect,
  position: Position
): TargetPosition => {
  let x: number
  let y: number

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

const getScrollableParents = (element: HTMLElement) => {
  let parent = element.parentElement
  const scrollableParents: Array<HTMLElement | Document> = []

  while (parent) {
    const computedStyle = getComputedStyle(parent)
    if (
      isOverflowSet(computedStyle.overflow) ||
      isOverflowSet(computedStyle.overflowY) ||
      isOverflowSet(computedStyle.overflowX)
    ) {
      scrollableParents.push(parent)
    }
    parent = parent.parentElement
  }

  scrollableParents.push(document)

  return scrollableParents
}

const isOverflowSet = (overflowValue: string) => {
  return (
    overflowValue === "auto" ||
    overflowValue === "hidden" ||
    overflowValue === "scroll" ||
    overflowValue === "overlay"
  )
}

const translateWithOffset = (
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

const getDocumentBoundingRect = () => {
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

const shouldFlip = (
  targetPosition: TargetPosition,
  position: Position,
  boundaryRect: DOMRect,
  tooltipRect: DOMRect
) => {
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
