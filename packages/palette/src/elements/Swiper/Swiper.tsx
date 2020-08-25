import React, {
  Children,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps } from "../Box"
import { CELL_GAP_PADDING_AMOUNT } from "../Carousel"
import { activeIndex } from "./activeIndex"
import { percentage } from "./percentage"

const Container = styled(Box)`
  position: relative;
`

const visuallyDisableScrollbar = css`
  /* IE 10+ */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  /* Safari and Chrome */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Rail = styled(Box)`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${visuallyDisableScrollbar}
`

const Cell = styled(Box)``

type ScrollSnapAlign = "none" | "start" | "end" | "center"

/** SwiperProps */
export type SwiperProps = BoxProps & {
  snap?: ScrollSnapAlign
  children: JSX.Element | JSX.Element[]
  onChange?(index: number): void
}

/**
 * A `Swiper` is like a `Carousel` but for touch devices. It accepts children
 * or a series of children that are JSX elements. It presents them in a
 * horizontal rail and when the width exceeds the width of the viewport, allows
 * for horitonzal swiping (or scrolling) with the option to snap to elements.
 */
export const Swiper = React.forwardRef(
  (
    { children, snap = "none", onChange, ...rest }: SwiperProps,
    forwardedRef: React.MutableRefObject<HTMLDivElement>
  ) => {
    const railRef = useRef<HTMLDivElement | null>(null)

    const cells = useMemo(
      () =>
        Children.toArray(children)
          .filter(isValidElement)
          .map(child => ({ child, ref: createRef<HTMLDivElement>() })),
      [children]
    )

    useEffect(() => {
      // Not mounted
      if (!railRef.current) return

      // No need to track progress
      if (!onChange) return

      const { current: rail } = railRef

      const handleScroll = () => {
        const progress = percentage({
          viewport: rail.clientWidth,
          total: rail.scrollWidth,
          left: rail.scrollLeft,
        })

        onChange && onChange(activeIndex({ progress, length: cells.length }))
      }

      rail.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        rail.removeEventListener("scroll", handleScroll)
      }
    }, [])

    return (
      <Container ref={forwardedRef as any} {...rest}>
        <Rail as="ul" ref={railRef as any}>
          {cells.map(({ child, ref }, i) => {
            const isLast = i === cells.length - 1

            return (
              <Cell
                as="li"
                key={i}
                ref={ref as any}
                pr={!isLast ? CELL_GAP_PADDING_AMOUNT : undefined}
                style={{ scrollSnapAlign: snap }}
              >
                {child}
              </Cell>
            )
          })}
        </Rail>
      </Container>
    )
  }
)
