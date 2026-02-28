import React, { useMemo } from "react"
import styled, { css } from "styled-components"
import { FloatingArrow, FloatingContext } from "@floating-ui/react"
import { PositionRects } from "../../utils/usePosition"
import { themeGet } from "@styled-system/theme-get"

const POINTER_VARIANTS = {
  defaultLight: "defaultLight",
  defaultDark: "defaultDark",
} as const

type PointerVariant = keyof typeof POINTER_VARIANTS

export interface PointerProps {
  /**
   * The floating context returned by `usePosition`. Required by `FloatingArrow`
   * to resolve placement and arrow middleware data.
   */
  context: FloatingContext
  /**
   * Reference + floating element rects captured by the `captureRects`
   * middleware. Used to apply the 2× threshold: the arrow tracks the anchor
   * center only while the anchor is ≤ 2× the floating element's size on the
   * relevant axis; beyond that the arrow is pinned near the aligned edge.
   */
  rects?: PositionRects
  variant?: PointerVariant
}

// Visual size of the arrow triangle (px).
const ARROW_WIDTH = 14
const ARROW_HEIGHT = 7

// Inset from the aligned edge used when the anchor exceeds the 2× threshold.
const EDGE_INSET = ARROW_WIDTH

/**
 * Internal-use arrow component.  Uses Floating UI's `FloatingArrow` for the
 * SVG shape and positioning; applies a 2× size threshold to decide whether the
 * arrow should track the anchor's center or be pinned near the aligned edge.
 */
export const Pointer = React.forwardRef<SVGSVGElement, PointerProps>(
  function Pointer({ context, rects, variant = "defaultLight" }, ref) {
    const { placement } = context
    const [axis, alignment] = placement.split("-") as [
      string,
      "start" | "end" | undefined
    ]

    // Determine whether the anchor is wide/tall enough to exceed the 2× rule.
    // When it does, the arrow is pinned to the aligned edge instead of tracking
    // the anchor's geometric center (which would drift far outside the tooltip).
    const overrideStyle = useMemo<React.CSSProperties>(() => {
      if (!alignment || !rects) return {}

      const isHorizontal = axis === "top" || axis === "bottom"
      const exceedsThreshold = isHorizontal
        ? rects.reference.width > 2 * rects.floating.width
        : rects.reference.height > 2 * rects.floating.height

      if (!exceedsThreshold) return {}

      // Anchor is more than 2× the floating element on this axis — pin near edge.
      if (isHorizontal) {
        return alignment === "start"
          ? { left: `${EDGE_INSET}px`, right: "auto" }
          : { right: `${EDGE_INSET * 2}px`, left: "auto" }
      } else {
        return alignment === "start"
          ? { top: `${EDGE_INSET}px`, bottom: "auto" }
          : { bottom: `${EDGE_INSET}px`, top: "auto" }
      }
    }, [alignment, axis, rects])

    return (
      <StyledFloatingArrow
        ref={ref}
        context={context}
        $variant={variant}
        fill="currentColor"
        width={ARROW_WIDTH}
        height={ARROW_HEIGHT}
        tipRadius={1}
        style={overrideStyle}
      />
    )
  }
)

const StyledFloatingArrow = styled(FloatingArrow)<{ $variant: PointerVariant }>`
  ${({ $variant }) =>
    $variant === "defaultDark"
      ? css`
          color: ${themeGet("colors.mono100")};
        `
      : css`
          color: ${themeGet("colors.mono0")};
        `}

  filter: ${themeGet("effects.dropShadow")};
`
