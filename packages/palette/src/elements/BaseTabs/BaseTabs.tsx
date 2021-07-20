import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import {
  compose,
  justifyContent,
  JustifyContentProps,
  padding,
  PaddingProps,
} from "styled-system"
import { space } from "../../helpers"
import { flattenChildren } from "../../helpers/flattenChildren"
import { useThemeConfig } from "../../Theme"
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"
import { Join } from "../Join"

const splitRailProps = splitProps<PaddingProps & JustifyContentProps>(
  compose(padding, justifyContent)
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
    bottom: 2px;
    width: ${space(6)}px;
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
`

const Rail = styled(Box)`
  white-space: nowrap;
  min-width: 100%;
`

/** Extends `Box` */
export type BaseTabsProps = Omit<BoxProps, "children"> & {
  /**
   * Enable if tabs should fill the width of the container
   * (as opposed to left-align)
   */
  fill?: boolean
  separator?: JSX.Element
  children: JSX.Element | JSX.Element[]
}

/** Extends `Box`, provides configurable gutter */
export const BaseTabs: React.FC<BaseTabsProps> = ({
  fill,
  separator: defaultSeparator,
  children,
  ...rest
}) => {
  const separator = useThemeConfig({
    v2: defaultSeparator ?? <Box mx={1} />,
    v3: defaultSeparator,
  })

  const ref = useRef<HTMLDivElement | null>()

  useEffect(() => {
    updateAtEnd()
    window.addEventListener("resize", updateAtEnd)
    return () => {
      window.removeEventListener("resize", updateAtEnd)
    }
  }, [])

  const [paddingProps, boxProps] = splitRailProps(rest)

  const [atEnd, setAtEnd] = useState(false)

  const cells = useMemo(() => flattenChildren(children), [children])

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
        <Rail
          display="inline-flex"
          borderBottom="1px solid"
          borderColor="black10"
          verticalAlign="top"
          {...paddingProps}
        >
          <Join separator={separator}>
            {cells.map((child, i) => {
              return (
                <Box
                  key={i}
                  display="inline-flex"
                  textAlign="center"
                  flex={fill ? 1 : undefined}
                >
                  {child}
                </Box>
              )
            })}
          </Join>
        </Rail>
      </Viewport>
    </Overlay>
  )
}
