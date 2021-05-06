import React, {
  Children,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react"
import styled from "styled-components"
import { useCursor } from "use-cursor"
import { visuallyDisableScrollbar } from "../../helpers/visuallyDisableScrollbar"
import { Box, BoxProps } from "../Box"
import { CELL_GAP_PADDING_AMOUNT } from "../Carousel"
import { activeIndex } from "./activeIndex"
import { percentage } from "./percentage"

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
  initialIndex?: number
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
  initialIndex = 0,
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
        .map((child) => ({ child, ref: createRef<HTMLDivElement>() })),
    [children]
  )

  const { index, cursor, setCursor } = useCursor({
    initialCursor: initialIndex,
    max: cells.length,
  })

  useEffect(() => {
    /**
     * If on initial mount there is an `initialIndex` other than `0`,
     * scroll it into view. The dependency array is left empty as we explicitly
     * only want this to run on mount, and ignore any updates to `initialIndex`,
     * which are handled separately below.
     */
    if (initialIndex === 0) return
    const cell = cells[initialIndex]
    if (!cell) return
    cell.ref.current.scrollIntoView({ inline: "start", block: "nearest" })
  }, [])

  useEffect(() => {
    /**
     * Since `cursor` tracks progress, if `cursor` and `initialIndex` are out
     * of sync then that means the index has been changed programmatically
     * and we should scroll the cell corresponding with that index into view.
     */
    if (initialIndex !== cursor) {
      const cell = cells[initialIndex]
      if (!cell) return
      cell.ref.current.scrollIntoView({ inline: "start", block: "nearest" })
    }
  }, [initialIndex])

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

      const page = activeIndex({ progress, length: cells.length })

      setCursor(page)
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
    <Container ref={containerRef as any} mx={0} my={0} {...rest}>
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
