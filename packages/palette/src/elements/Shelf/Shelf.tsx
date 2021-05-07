import { themeGet } from "@styled-system/theme-get"
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
import { useCursor } from "use-cursor"
import { visuallyDisableScrollbar } from "../../helpers/visuallyDisableScrollbar"
import { ChevronIcon } from "../../svgs"
import { Box, BoxProps } from "../Box"
import { CELL_GAP_PADDING_AMOUNT, paginateCarousel } from "../Carousel"
import { CarouselBar } from "../CarouselBar"
import { Clickable } from "../Clickable"
import { FlexProps } from "../Flex"
import { FullBleed } from "../FullBleed"

/** ShelfProps */
export type ShelfProps = BoxProps & {
  alignItems?: FlexProps["alignItems"]
  showProgress?: boolean
  snap?: "none" | "start" | "end" | "center"
  children: JSX.Element | JSX.Element[]
  onChange?(index: number): void
}

/**
 * A Shelf is a new kind of carousel...
 */
export const Shelf: React.FC<ShelfProps> = ({
  alignItems = "flex-end",
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
  const [progress, setProgress] = useState(0)
  const [offset, setOffset] = useState(0)

  const init = useCallback(() => {
    if (containerRef.current === null) return

    const { current: container } = containerRef

    // Set page-stops
    const values = cells.map(({ ref }, i) => {
      // If we have an offset we actually want to subtract it from
      // the first and last elements.
      if (offset !== 0 && (i === 0 || i === cells.length - 1)) {
        return Math.ceil(ref.current.clientWidth - offset)
      }

      return ref.current.clientWidth
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

    // Set offset to accomodate full-bleed and line up initially with page-margins
    const { x } = container.getBoundingClientRect()
    setOffset(x)

    setMounted(true)
  }, [cells, offset])

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

      setCursor(pages.indexOf(nearestPage))

      // Sets a synthetic value between 0 and 100
      setProgress(
        Math.ceil((viewport.scrollLeft * 100) / (pages[pages.length - 1] - 1))
      )
    }

    viewport.addEventListener("scroll", handler, { passive: true })
    return () => {
      viewport.removeEventListener("scroll", handler)
    }
  }, [pages])

  // Announce page changes
  useEffect(() => {
    onChange && onChange(pageIndex)
  }, [onChange, pageIndex])

  // Scroll to a specific page-stop
  const scrollTo = (index: number) => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef
    const xPosition = pages[index]

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
    scrollTo(pageIndex + 1)
  }

  const handlePrev = () => {
    scrollTo(pageIndex - 1)
  }

  return (
    <Container ref={containerRef as any} {...rest}>
      <Nav as="nav">
        <Previous
          onClick={handlePrev}
          disabled={pageIndex === 0}
          aria-label="Previous page"
        >
          <ChevronIcon direction="left" width={15} height={15} />
        </Previous>

        <Next
          onClick={handleNext}
          disabled={pageIndex === pages.length - 1}
          aria-label="Next page"
        >
          <ChevronIcon direction="right" width={15} height={15} />
        </Next>
      </Nav>

      <FullBleed
        // To prevent any page jank we initially partially disable this component
        // so that content is left aligned with the parent container and then once
        // we have the offset and page values; we reset it to actually full-bleed.
        // The `offset` will push the content up to the parent margin.
        {...(!mounted ? { left: null, right: null, marginLeft: null } : {})}
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
                  pr={!isLast ? CELL_GAP_PADDING_AMOUNT : offset}
                  style={{ scrollSnapAlign: snap }}
                >
                  {child}
                </Cell>
              )
            })}
          </Rail>
        </Viewport>
      </FullBleed>

      {showProgress && <CarouselBar mt={6} percentComplete={progress} />}
    </Container>
  )
}

const Container = styled(Box)`
  position: relative;
  width: 100%;

  > nav {
    transition: opacity 250ms;
    transition-delay: 100ms;
    opacity: 0;
  }

  &:hover {
    > nav {
      opacity: 1;
    }
  }
`

const Nav = styled(Box)`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  /* Offset for CarouselBar margin-top */
  bottom: ${themeGet("space.2")};
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
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
  align-items: ${(p) => p.alignItems};
`

const Cell = styled(Box)`
  white-space: normal;
`

const Arrow = styled(Clickable)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 250ms, color 250ms;
  color: ${themeGet("colors.black60")};
  background-color: ${themeGet("colors.white100")};
  border: 1px solid ${themeGet("colors.black5")};
  border-radius: 50%;
  pointer-events: auto;

  > svg {
    fill: currentColor;
  }

  &:hover,
  &:focus {
    outline: 0;
    color: ${themeGet("colors.black100")};
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }

  @media (hover: none) {
    display: none;
  }
`

const Next = styled(Arrow)`
  right: ${themeGet("space.2")};
`

const Previous = styled(Arrow)`
  left: ${themeGet("space.2")};
`
