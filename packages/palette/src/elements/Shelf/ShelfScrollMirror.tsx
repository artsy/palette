import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { Box, BoxProps } from "../Box"

interface ShelfScrollMirrorProps extends BoxProps {
  viewport?: HTMLDivElement | null
}

export const ShelfScrollMirror: React.FC<ShelfScrollMirrorProps> = ({
  viewport,
  ...rest
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const ignoreScrollEvents = useRef(false)

  const syncScrollPosition = (scrolledNode: HTMLElement, node: HTMLElement) => {
    const handleScroll = () => {
      const ignore = ignoreScrollEvents.current
      ignoreScrollEvents.current = false
      if (ignore) return
      ignoreScrollEvents.current = true

      const { scrollLeft, scrollWidth, clientWidth } = scrolledNode

      // Percentage of scrolling of the scrolledNode
      const percentagePerWidth = scrollLeft / (scrollWidth - clientWidth)

      node.scrollLeft =
        percentagePerWidth * (node.scrollWidth - node.clientWidth)
    }

    scrolledNode.addEventListener("scroll", handleScroll)

    return () => {
      scrolledNode.removeEventListener("scroll", handleScroll)
    }
  }

  useEffect(() => {
    if (!viewport || !trackRef.current) return
    const { current: track } = trackRef

    const teardown1 = syncScrollPosition(viewport, track)
    const teardown2 = syncScrollPosition(track, viewport)

    return () => {
      teardown1()
      teardown2()
    }
  }, [syncScrollPosition])

  return (
    <Track
      ref={trackRef as any}
      width="100%"
      height={3}
      bg="black15"
      overflowX="scroll"
      {...rest}
    >
      {/* Overflow the track to the same width as the viewport */}
      <Box width={viewport?.scrollWidth} height="1px" />
    </Track>
  )
}

const Track = styled(Box)`
  ::-webkit-scrollbar {
    height: 3px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-track-piece {
    background-color: ${themeGet("colors.black15")};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${themeGet("colors.black60")};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${themeGet("colors.black100")};
  }

  /* TODO: Figure out how to disable this in Safari */
  /* ::-webkit-scrollbar-corner {
    background-color: ${themeGet("colors.black15")};
  } */
`
