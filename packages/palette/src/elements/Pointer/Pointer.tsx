import React, { FC, useEffect, useMemo, useState, useCallback } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { DROP_SHADOW } from "../../helpers"
import { Position } from "../../utils"
import { useResizeObserver } from "../../utils/useResizeObserver"
import { Box } from "../Box"

const POINTER_VARIANTS = {
  defaultLight: {
    backgroundColor: "white100",
  },
  defaultDark: {
    backgroundColor: "black100",
  },
}

type PointerVariant = keyof typeof POINTER_VARIANTS

export interface PointerProps {
  anchorRef: React.RefObject<HTMLElement>
  tooltipRef: React.RefObject<HTMLElement>
  isFlipped: boolean
  placement: Position
  variant?: PointerVariant
}

/**
 * Internal-use component for displaying a triangular pointer to an anchor node
 */
export const Pointer: FC<PointerProps> = ({
  anchorRef,
  tooltipRef,
  isFlipped,
  placement,
  variant = "defaultLight",
}) => {
  const [[anchorWidth, anchorHeight], setAnchorDimensions] = useState([0, 0])
  const [[tooltipWidth, tooltipHeight], setTooltipDimensions] = useState([0, 0])

  const position = useMemo(() => {
    const horizontalCenter = anchorWidth / 2
    const verticalCenter = anchorHeight / 2

    switch (placement) {
      case "top-start":
        return {
          bottom: isFlipped ? "100%" : 0,
          left: `${
            horizontalCenter > tooltipWidth
              ? POINTER_WIDTH
              : horizontalCenter - POINTER_WIDTH / 2
          }px`,
        }
      case "top":
        return {
          bottom: isFlipped ? "100%" : 0,
          left: `calc(50% - ${POINTER_WIDTH / 2}px)`,
        }
      case "top-end":
        return {
          bottom: isFlipped ? "100%" : 0,
          right: `${
            horizontalCenter > tooltipWidth
              ? POINTER_WIDTH * 2
              : horizontalCenter + POINTER_WIDTH / 2
          }px`,
        }
      case "bottom-start":
        return {
          top: isFlipped ? "100%" : 0,
          left: `${
            horizontalCenter > tooltipWidth
              ? POINTER_WIDTH
              : horizontalCenter - POINTER_WIDTH / 2
          }px`,
        }
      case "bottom":
        return {
          top: isFlipped ? "100%" : 0,
          left: `calc(50% - ${POINTER_WIDTH / 2}px)`,
        }
      case "bottom-end":
        return {
          top: isFlipped ? "100%" : 0,
          right: `${
            horizontalCenter > tooltipWidth
              ? POINTER_WIDTH * 2
              : horizontalCenter + POINTER_WIDTH / 2
          }px`,
        }
      case "left-start":
        return {
          top: `${
            verticalCenter > tooltipHeight - POINTER_WIDTH / 2
              ? POINTER_WIDTH
              : verticalCenter
          }px`,
          ...(isFlipped
            ? { left: `-${POINTER_WIDTH / 2}px` }
            : { right: `${POINTER_WIDTH / 2}px` }),
        }
      case "left":
        return {
          top: "50%",
          ...(isFlipped
            ? { left: `-${POINTER_WIDTH / 2}px` }
            : { right: `${POINTER_WIDTH / 2}px` }),
        }
      case "left-end":
        return {
          bottom: `${
            verticalCenter > tooltipHeight - POINTER_WIDTH / 2
              ? POINTER_WIDTH
              : verticalCenter
          }px`,

          ...(isFlipped
            ? { left: `-${POINTER_WIDTH / 2}px` }
            : { right: `${POINTER_WIDTH / 2}px` }),
        }
      case "right-start":
        return {
          top: `${
            verticalCenter > tooltipHeight - POINTER_WIDTH / 2
              ? POINTER_WIDTH
              : verticalCenter
          }px`,
          ...(isFlipped
            ? { right: `${POINTER_WIDTH / 2}px` }
            : { left: `-${POINTER_WIDTH / 2}px` }),
        }
      case "right":
        return {
          top: "50%",
          ...(isFlipped
            ? { right: `${POINTER_WIDTH / 2}px` }
            : { left: `-${POINTER_WIDTH / 2}px` }),
        }
      case "right-end":
        return {
          bottom: `${
            verticalCenter > tooltipHeight - POINTER_WIDTH / 2
              ? POINTER_WIDTH
              : verticalCenter
          }px`,
          ...(isFlipped
            ? { right: `${POINTER_WIDTH / 2}px` }
            : { left: `-${POINTER_WIDTH / 2}px` }),
        }
    }
  }, [
    anchorHeight,
    anchorWidth,
    isFlipped,
    placement,
    tooltipHeight,
    tooltipWidth,
  ])

  const handleResize = useCallback(() => {
    if (!anchorRef.current || !tooltipRef.current) return

    const anchorRect = anchorRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    setAnchorDimensions([anchorRect.width, anchorRect.height])
    setTooltipDimensions([tooltipRect.width, tooltipRect.height])
  }, [anchorRef, tooltipRef])

  useEffect(handleResize, [handleResize])

  useResizeObserver({ target: anchorRef, onResize: handleResize })

  return <Container variant={variant} {...position} />
}

const POINTER_SIZE = 10 // px
const POINTER_WIDTH = Math.sqrt(2 * Math.pow(10, 2)) // px

const Container = styled(Box)<{ variant: PointerVariant }>`
  z-index: -1;
  position: absolute;

  &::after {
    content: "";
    position: absolute;
    width: ${POINTER_SIZE}px;
    height: ${POINTER_SIZE}px;
    transform-origin: 0 0;
    transform: rotate(-45deg);
    box-shadow: ${DROP_SHADOW};
    ${variant({ variants: POINTER_VARIANTS })}
  }
`
