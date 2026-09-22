import React, {
  Children,
  createRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { ResponsiveValue } from "styled-system"
import { useCursor } from "use-cursor"
import { SpacingUnit } from "../../Theme"
import { visuallyDisableScrollbar } from "../../helpers/visuallyDisableScrollbar"
import { Box, BoxProps } from "../Box"
import { CELL_GAP_PADDING_AMOUNT, paginateCarousel } from "../Carousel"
import { FlexProps } from "../Flex"
import { FullBleed } from "../FullBleed"
import { ShelfNext, ShelfPrevious } from "./ShelfNavigation"
import { ShelfScrollBar } from "./ShelfScrollBar"

/** Default spacing between the rail and the scrollbar */
export const SHELF_SCROLL_BAR_GAP: SpacingUnit[] = [2, 6]

/** ShelfProps */
export type ShelfProps = Omit<BoxProps, "gap"> & {
  alignItems?: FlexProps["alignItems"]
  /** Spacing between each cell. Defaults to `[1, 2]`. */
  gap?: ResponsiveValue<SpacingUnit>
  /**
   * Whether the rail breaks out of the parent container to the edges of the
   * viewport. Defaults to `true`. Set to `false` to keep the rail clipped to
   * the bounds of the parent container.
   */
  fullBleed?: boolean
  /** Spacing between the cells and the scrollbar. Defaults to `[2, 6]`. */
  scrollBarGap?: ResponsiveValue<SpacingUnit>
  showProgress?: boolean
  snap?: "none" | "start" | "end" | "center"
  children: JSX.Element | JSX.Element[]
  onChange?(index: number): void
}

/**
 * A Shelf is a new kind of carousel...
 */
export const Shelf: React.FC<React.PropsWithChildren<ShelfProps>> = ({
  alignItems = "flex-end",
  gap = CELL_GAP_PADDING_AMOUNT,
  fullBleed = true,
  scrollBarGap = SHELF_SCROLL_BAR_GAP,
  showProgress = true,
  snap = "none",
  children,
  onChange,
  ...rest
}) => {
  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map((child) => ({ child, ref: createRef<HTMLLIElement>() })),
    [children]
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [pages, setPages] = useState([0])
  const [offset, setOffset] = useState(0)
  const [atStart, setAtStart] = useState(true)

  const init = useCallback(() => {
    if (containerRef.current === null) return

    const { current: container } = containerRef

    // Set page-stops
    const values = cells.map(({ ref }, i) => {
      // If we have an offset we actually want to subtract it from
      // the first and last elements.
      if (offset !== 0 && (i === 0 || i === cells.length - 1)) {
        return Math.ceil(ref.current!.clientWidth - offset)
      }

      return ref.current!.clientWidth
    })

    setPages(
      paginateCarousel({
        // Here we use the container width instead of the viewport width.
        // The viewport has been extended to the full width of the window;
        // we want to scroll to the parent boundaries instead.
        viewport: container.clientWidth,
        values,
      })
    )

    // Set offset to accomodate full-bleed and line up initially with page-margins.
    // When not full-bleed the rail is already bounded by the container so no
    // offset is required.
    const { x } = container.getBoundingClientRect()
    setOffset(fullBleed ? x : 0)

    setMounted(true)
  }, [cells, fullBleed, offset])

  useEffect(() => {
    init()

    window.addEventListener("resize", init)
    return () => {
      window.removeEventListener("resize", init)
    }
  }, [init])

  const { index: pageIndex, setCursor } = useCursor({
    max: pages.length,
  })

  // Keep page cursor in sync with scroll position
  useEffect(() => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    const handler = () => {
      const nearestPage = pages.find((currentPage, i) => {
        const nextPage = pages[i + 1] ?? Infinity
        return (
          viewport.scrollLeft >= currentPage && viewport.scrollLeft < nextPage
        )
      })

      setCursor(pages.indexOf(nearestPage!))
      setAtStart(viewport.scrollLeft === 0)
    }

    viewport.addEventListener("scroll", handler, { passive: true })
    return () => {
      viewport.removeEventListener("scroll", handler)
    }
  }, [pages, setCursor])

  // Announce page changes
  useEffect(() => {
    onChange && onChange(pageIndex)
  }, [onChange, pageIndex])

  // Scroll to a specific page-stop
  const scrollToPage = (index: number) => {
    const xPosition = pages[index]
    scrollTo(xPosition)
  }

  const scrollTo = (xPosition: number) => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    if (viewport.scrollTo) {
      viewport.scrollTo({ left: xPosition, behavior: "smooth" })
      return
    }

    viewport.scrollLeft = xPosition
  }

  // One side-effect of scrolling to the next page index instead of
  // setting it directly is that you can't scroll to the next one via click until
  // you've arrived. We may want to reconsider this approach; though this is the
  // simplest way to keep these values in sync with one another.
  const handleNext = () => {
    scrollToPage(pageIndex + 1)
  }

  const handlePrev = () => {
    if (pageIndex === 0) {
      scrollTo(0)
      return
    }

    scrollToPage(pageIndex - 1)
  }

  return (
    <Container ref={containerRef as any} {...rest}>
      {/*
        The FullBleed rail is 100vw wide, so the nav can't be positioned
        relative to it. Instead we wrap both in a container-width box that is
        exactly the height of the rail; the spacing to the scrollbar lives on
        this wrapper so the nav stays vertically centered on the cells.
      */}
      <Box position="relative" mb={scrollBarGap}>
        <Nav as="nav">
          <Previous
            onClick={handlePrev}
            disabled={atStart}
            aria-label="Previous page"
          />

          <Next
            onClick={handleNext}
            disabled={pageIndex === pages.length - 1}
            aria-label="Next page"
          />
        </Nav>

        <FullBleed
          // To prevent any page jank we initially disable the bleed so that content
          // is left aligned with the parent container, and then once we have the
          // offset and page values we enable it to actually full-bleed. The `offset`
          // will push the content up to the parent margin.
          //
          // This matters most on SSR: the server renders the un-mounted state, so
          // disabling the bleed here keeps content aligned to the parent margin and
          // avoids a content shift once the client mounts.
          enabled={fullBleed && mounted}
        >
          <Viewport ref={viewportRef as any}>
            <Rail as="ul" position="relative" alignItems={alignItems}>
              {cells.map(({ child, ref }, i) => {
                const isFirst = i === 0
                const isLast = i === cells.length - 1

                return (
                  <Cell
                    as="li"
                    key={i}
                    ref={ref as any}
                    pl={isFirst ? offset : undefined}
                    pr={!isLast ? gap : offset}
                    style={{ scrollSnapAlign: snap }}
                  >
                    {child}
                  </Cell>
                )
              })}
            </Rail>
          </Viewport>
        </FullBleed>
      </Box>

      {showProgress && <ShelfScrollBar viewport={viewportRef.current} />}
    </Container>
  )
}

const Nav = styled(Box)`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Container = styled(Box)`
  position: relative;
  width: 100%;

  ${Nav} {
    transition: opacity 250ms;
    transition-delay: 100ms;
    opacity: 0;
  }

  &:hover {
    ${Nav} {
      opacity: 1;
    }
  }
`

const Viewport = styled(Box)`
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

const Rail = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
`

const Cell = styled(Box)`
  white-space: normal;
`

const Next = styled(ShelfNext)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;

  @media (hover: none) {
    display: none;
  }
`

const Previous = styled(ShelfPrevious)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;

  @media (hover: none) {
    display: none;
  }
`
