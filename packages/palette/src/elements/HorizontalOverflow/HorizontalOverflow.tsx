import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  border,
  BorderProps,
  compose,
  justifyContent,
  JustifyContentProps,
  padding,
  PaddingProps,
} from "styled-system"
import { visuallyDisableScrollbar } from "../../helpers/visuallyDisableScrollbar"
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"

const splitRailProps = splitProps<
  PaddingProps & JustifyContentProps & BorderProps
>(compose(padding, justifyContent, border))

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
  height: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ${visuallyDisableScrollbar}
`

const Rail = styled(Box)`
  white-space: nowrap;
  min-width: 100%;
  height: 100%;
`

export type HorizontalOverflowProps = BoxProps & { children: React.ReactNode }

export const HorizontalOverflow: React.ForwardRefExoticComponent<
  HorizontalOverflowProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ children, ...rest }, forwardedRef) => {
  const ref = useRef<HTMLDivElement | null>()

  useEffect(() => {
    updateAtEnd()
    window.addEventListener("resize", updateAtEnd)
    return () => {
      window.removeEventListener("resize", updateAtEnd)
    }
  }, [])

  const [railProps, { ref: _ref, ...boxProps }] = splitRailProps(rest)

  const [atEnd, setAtEnd] = useState(false)

  const updateAtEnd = () => {
    if (!ref.current) return

    const {
      current: { scrollLeft, scrollWidth, clientWidth },
    } = ref

    // Check if we're at the end of the scroll (within 1px)
    if (Math.abs(scrollLeft + clientWidth - scrollWidth) <= 1) {
      setAtEnd(true)
      return
    }

    setAtEnd(false)
  }

  return (
    <Overlay atEnd={atEnd} {...boxProps}>
      <Viewport
        ref={composeRefs(ref, forwardedRef) as any}
        onScroll={updateAtEnd}
      >
        <Rail display="inline-flex" verticalAlign="top" {...railProps}>
          {children}
        </Rail>
      </Viewport>
    </Overlay>
  )
})

HorizontalOverflow.displayName = "HorizontalOverflow"
