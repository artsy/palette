import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  border,
  compose,
  justifyContent,
  JustifyContentProps,
  padding,
  PaddingProps,
} from "styled-system"
import { visuallyDisableScrollbar } from "../.."
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"

const splitRailProps = splitProps<PaddingProps & JustifyContentProps>(
  compose(padding, justifyContent, border)
)

const Overlay = styled(Box)<{ atEnd: boolean }>`
  position: relative;

  /* Fade-out gradient */
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${themeGet("space.6")};
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );

    /* Hide when scrolled all the way over */
    transition: opacity 250ms;
    opacity: ${({ atEnd }) => (atEnd ? 0 : 1)};
  }
`

const Viewport = styled(Box)`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ${visuallyDisableScrollbar}
`

const Rail = styled(Box)`
  white-space: nowrap;
  min-width: 100%;
`

export type HorizontalOverflowProps = BoxProps & { children: React.ReactNode }

export const HorizontalOverflow: React.FC<HorizontalOverflowProps> = ({
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>()

  useEffect(() => {
    updateAtEnd()
    window.addEventListener("resize", updateAtEnd)
    return () => {
      window.removeEventListener("resize", updateAtEnd)
    }
  }, [])

  const [railProps, boxProps] = splitRailProps(rest)

  const [atEnd, setAtEnd] = useState(false)

  const updateAtEnd = () => {
    if (!ref.current) return

    const {
      current: { scrollLeft, scrollWidth, clientWidth },
    } = ref

    if (scrollLeft + clientWidth === scrollWidth) {
      setAtEnd(true)
      return
    }

    setAtEnd(false)
  }

  return (
    <Overlay atEnd={atEnd} {...boxProps}>
      <Viewport ref={ref as any} onScroll={updateAtEnd}>
        <Rail display="inline-flex" verticalAlign="top" {...railProps}>
          {children}
        </Rail>
      </Viewport>
    </Overlay>
  )
}
