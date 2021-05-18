import React, { useRef } from "react"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"

interface ShelfScrollBarProps extends BoxProps {
  viewport: HTMLDivElement
}

export const ShelfScrollBar: React.FC<ShelfScrollBarProps> = ({
  viewport,
  ...rest
}) => {
  const { scrollLeft, scrollWidth, clientWidth } = viewport

  const trackRef = useRef<HTMLDivElement | null>(null)

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

  return (
    <>
      {/* Track */}
      <Box
        ref={trackRef as any}
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
        {/* Handle */}
        <Box
          position="relative"
          bg="black60"
          height="100%"
          borderRadius={3}
          width={normalizedThumbWidth}
          style={{ transform: `translateX(${normalizedThumbOffset}px)` }}
        >
          {/* Hit-area */}
          <Clickable
            // bg="rgba(255,0,0,0.5)"
            position="absolute"
            top={-10}
            bottom={-10}
            left={0}
            width="100%"
          />
        </Box>
      </Box>
    </>
  )
}
