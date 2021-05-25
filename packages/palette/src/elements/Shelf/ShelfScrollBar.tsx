import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"

interface ShelfScrollBarProps extends BoxProps {
  viewport?: HTMLDivElement | null
}

export const ShelfScrollBar: React.FC<ShelfScrollBarProps> = React.memo(
  ({ viewport, ...rest }) => {
    const [
      { scrollLeft, scrollWidth, clientWidth },
      setScrollState,
    ] = useState<{
      scrollLeft: number
      scrollWidth: number
      clientWidth: number
    }>({
      scrollLeft: viewport?.scrollLeft ?? 0,
      scrollWidth: viewport?.scrollWidth ?? 1,
      clientWidth: viewport?.clientWidth ?? 1,
    })

    const trackRef = useRef<HTMLDivElement | null>(null)
    const thumbRef = useRef<HTMLButtonElement | null>(null)

    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100

    // Set up a scrollbar for viewport
    const percentageVisible = clientWidth / scrollWidth
    const thumbWidth = percentageVisible * clientWidth
    const percentageOffset = scrollLeft / (scrollWidth - clientWidth)

    // Transform it down to whatever our actual track width is as
    // it's always smaller than the target viewport.
    const trackWidth = trackRef.current?.clientWidth ?? 1
    const normalizedThumbWidth = (thumbWidth * trackWidth) / clientWidth
    const normalizedThumbOffset =
      percentageOffset * (trackWidth - normalizedThumbWidth)

    const requiresScrolling = percentageVisible < 1

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

    // Handle drag scrolling
    const isDown = useRef(false)
    const startX = useRef(0)
    const offsetX = useRef(0)

    useEffect(() => {
      if (!viewport || !thumbRef.current) return

      const { current: thumb } = thumbRef

      const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation()
        isDown.current = true
        startX.current = event.pageX
        offsetX.current = viewport.scrollLeft
      }

      const handleMouseUp = () => {
        isDown.current = false
        startX.current = 0
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDown.current) return

        const delta =
          ((event.pageX - startX.current) * scrollWidth) / trackWidth

        viewport.scrollLeft = offsetX.current + delta
      }

      thumb.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        thumb.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [viewport, clientWidth, scrollWidth, scrollLeft, trackWidth])

    // Handle click on track scrolling
    useEffect(() => {
      if (!trackRef.current) return

      const { current: track } = trackRef
      const { current: thumb } = thumbRef

      const handleMouseDown = (event: MouseEvent) => {
        const x =
          event.pageX -
          track.getBoundingClientRect().left -
          thumb.clientWidth / 2

        const delta = (x * scrollWidth) / trackWidth

        viewport.scrollLeft = delta
      }

      track.addEventListener("mousedown", handleMouseDown)
      return () => {
        track.removeEventListener("mousedown", handleMouseDown)
      }
    }, [viewport, scrollWidth, trackWidth])

    return (
      <>
        {/* Track */}
        <Box
          ref={trackRef as any}
          position="relative"
          height={3}
          bg="black15"
          width="100%"
          role="scrollbar"
          aria-orientation="vertical"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          {...rest}
        >
          {/* Pad out hit area. Click events will propagate to underlying trackRef */}
          <TrackHitArea />

          {/* Thumb */}
          {requiresScrolling && (
            <Box
              position="relative"
              bg="black60"
              height="100%"
              borderRadius={3}
              width={normalizedThumbWidth}
              style={{
                transform: `translateX(${normalizedThumbOffset}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <HitArea ref={thumbRef as any} tabIndex={-1} />
            </Box>
          )}
        </Box>
      </>
    )
  }
)

const TrackHitArea = styled(Box)`
  position: absolute;
  top: -10px;
  bottom: -10px;
  right: 0;
  left: 0;
  width: 100%;
`

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
