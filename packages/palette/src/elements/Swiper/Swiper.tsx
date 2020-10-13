import React, {
  Children,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps } from "../Box"
import { CELL_GAP_PADDING_AMOUNT } from "../Carousel"
import { activeIndex } from "./activeIndex"
import { percentage } from "./percentage"

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

const Container = styled(Box)`
  display: flex;
  height: 100%;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${visuallyDisableScrollbar}
`

Container.defaultProps = {
  mx: 0,
  my: 0,
}

/** SwiperRailProps */
export type SwiperRailProps = BoxProps

/** A `SwiperRail` slides back and forth within the viewport */
export const SwiperRail = styled(Box)`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
`

SwiperRail.defaultProps = {
  display: "flex",
}

/** SwiperCellProps */
export type SwiperCellProps = BoxProps

/** A `SwiperCell` wraps a single child in the carousel */
export const SwiperCell = styled(Box)`
  white-space: normal;
`

type ScrollSnapAlign = "none" | "start" | "end" | "center"

/** SwiperProps */
export type SwiperProps = BoxProps & {
  snap?: ScrollSnapAlign
  children: JSX.Element | JSX.Element[]
  Rail?: typeof SwiperRail | React.FC<SwiperRailProps>
  /**
   * If providing a custom `Cell` you must forward a ref so
   * that cell widths can be calculated.
   */
  Cell?: React.ForwardRefExoticComponent<SwiperCellProps>
  onChange?(index: number): void
}

/**
 * A `Swiper` is like a `Carousel` but for touch devices. It accepts children
 * or a series of children that are JSX elements. It presents them in a
 * horizontal rail and when the width exceeds the width of the viewport, allows
 * for horitonzal swiping (or scrolling) with the option to snap to elements.
 */
export const Swiper: React.FC<SwiperProps> = ({
  children,
  snap = "none",
  Rail = SwiperRail,
  Cell = SwiperCell,
  onChange,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map(child => ({ child, ref: createRef<HTMLDivElement>() })),
    [children]
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Not mounted
    if (!containerRef.current) return

    // No need to track progress
    if (!onChange) return

    const { current: rail } = containerRef

    const handleScroll = () => {
      const progress = percentage({
        viewport: rail.clientWidth,
        total: rail.scrollWidth,
        left: rail.scrollLeft,
      })

      onChange && setIndex(activeIndex({ progress, length: cells.length }))
    }

    rail.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      rail.removeEventListener("scroll", handleScroll)
    }
  }, [cells])

  useEffect(() => {
    onChange && onChange(index)
  }, [onChange, index])

  return (
    <Container ref={containerRef as any} {...rest}>
      <Rail as="ul">
        {cells.map(({ child, ref }, i) => {
          const isLast = i === cells.length - 1

          return (
            <Cell
              as="li"
              key={i}
              ref={ref}
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
