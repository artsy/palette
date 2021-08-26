import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { useClickScroll } from "./useClickScroll"
import { useDragScroll } from "./useDragScroll"

interface ShelfScrollBarProps extends BoxProps {
  viewport?: HTMLDivElement | null
}

/**
 * A synthetic scrollbar
 */
export const ShelfScrollBar: React.FC<ShelfScrollBarProps> = React.memo(
  ({ viewport, ...rest }) => {
    const [
      { scrollLeft, scrollWidth, clientWidth },
      setScrollState,
    ] = useState<ScrollState>({
      scrollLeft: viewport?.scrollLeft ?? 0,
      scrollWidth: viewport?.scrollWidth ?? 1,
      clientWidth: viewport?.clientWidth ?? 1,
    })

    const trackRef = useRef<HTMLDivElement | null>(null)
    const thumbRef = useRef<HTMLButtonElement | null>(null)

    const trackWidth = trackRef.current?.clientWidth ?? 1

    const {
      progress,
      requiresScrolling,
      thumbOffset,
      thumbWidth,
    } = buildScrollBar({ trackWidth, scrollLeft, scrollWidth, clientWidth })

    // Update scrollState on scroll and resize
    useEffect(() => {
      if (!viewport) return

      const updateScrollState = () => {
        setScrollState({
          scrollLeft: viewport?.scrollLeft ?? 0,
          scrollWidth: viewport?.scrollWidth ?? 1,
          clientWidth: viewport?.clientWidth ?? 1,
        })
      }

      updateScrollState()

      viewport.addEventListener("scroll", updateScrollState, { passive: true })
      window.addEventListener("resize", updateScrollState)

      return () => {
        viewport.removeEventListener("scroll", updateScrollState)
        window.removeEventListener("resize", updateScrollState)
      }
    }, [viewport])

    // FIXME: Fix these ts-ignores. Added for strict type checking migration

    useDragScroll({
      // @ts-expect-error  MIGRATE_STRICT_MODE
      viewport,
      // @ts-expect-error  MIGRATE_STRICT_MODE
      thumbRef,
      clientWidth,
      scrollWidth,
      scrollLeft,
      trackWidth,
    })

    useClickScroll({
      // @ts-expect-error  MIGRATE_STRICT_MODE
      viewport,
      // @ts-expect-error  MIGRATE_STRICT_MODE
      thumbRef,
      // @ts-expect-error  MIGRATE_STRICT_MODE
      trackRef,
      scrollWidth,
      trackWidth,
    })

    return (
      <Track
        ref={trackRef as any}
        bg="black15"
        role="scrollbar"
        aria-orientation="vertical"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        {...rest}
      >
        {/* Pads out hit area. Click events will propagate to underlying trackRef */}
        <TrackHitArea />

        {requiresScrolling && (
          <Thumb
            position="relative"
            bg="black60"
            height="100%"
            borderRadius={3}
            width={thumbWidth}
            style={{
              transform: `translateX(${thumbOffset}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <HitArea ref={thumbRef as any} tabIndex={-1} />
          </Thumb>
        )}
      </Track>
    )
  }
)

const Track = styled(Box)`
  position: relative;
  height: 3px;
  width: 100%;
`

const TrackHitArea = styled(Box)`
  position: absolute;
  top: -10px;
  bottom: -10px;
  right: 0;
  left: 0;
  width: 100%;
`

const Thumb = styled(Box)``

const HitArea = styled(Clickable)`
  position: absolute;
  top: -10px;
  bottom: -10px;
  width: 100%;
  left: 0;
  opacity: 0;
  transition: opacity 250ms;

  &:hover {
    opacity: 1;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    background-color: ${themeGet("colors.black100")};
    /*
     * Positioning this using top/bottom and translate each have cross-browser
     * issues in Safari. Using a hard-coded height/negative margin works on all browsers.
     */
    top: 50%;
    margin-top: -1.5px;
    height: 3px;
  }
`

interface ScrollState {
  /** Left most scroll edge */
  scrollLeft: number
  /** Width of the underlying rail */
  scrollWidth: number
  /** Width of the viewport */
  clientWidth: number
}

export const buildScrollBar = ({
  trackWidth,
  scrollLeft,
  scrollWidth,
  clientWidth,
}: ScrollState & {
  /** Width of the scrollbar track */
  trackWidth: number
}) => {
  const progress = (scrollLeft / (scrollWidth - clientWidth || 1)) * 100

  // Sets up a scrollbar for viewport
  const percentageVisible = clientWidth / scrollWidth
  const thumbWidth = percentageVisible * clientWidth
  const percentageOffset = scrollLeft / (scrollWidth - clientWidth || 1)

  // Transform it down to whatever our actual track width is as
  // it's always smaller than the target viewport.
  const normalizedThumbWidth = (thumbWidth * trackWidth) / clientWidth
  const normalizedThumbOffset =
    percentageOffset * (trackWidth - normalizedThumbWidth)

  const requiresScrolling = percentageVisible < 1

  return {
    requiresScrolling,
    progress,
    percentageVisible,
    percentageOffset,
    thumbWidth: normalizedThumbWidth,
    thumbOffset: normalizedThumbOffset,
  }
}
