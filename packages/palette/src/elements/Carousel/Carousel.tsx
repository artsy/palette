import React, {
  Children,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { useCursor } from "use-cursor"
import { color, space } from "../../helpers"
import { ChevronIcon } from "../../svgs"
import { SpacingUnit } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { Skip } from "../Skip"
import { VisuallyHidden } from "../VisuallyHidden"
import { paginate } from "./paginate"

const ARROW_WIDTH: SpacingUnit[] = [2, 4]
const ARROW_TRANSITION_MS = 250
const RAIL_TRANSITION_MS = 500
const CELL_GAP_PADDING_AMOUNT: SpacingUnit[] = [1, 2]

const Container = styled(Box)`
  position: relative;
  width: 100%;
`

const Viewport = styled(Box)`
  width: 100%;
  overflow: hidden;
`

const Rail = styled(Box)`
  display: flex;
  height: 100%;
  transition: transform ${RAIL_TRANSITION_MS}ms;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Arrow = styled(Clickable).attrs({
  width: ARROW_WIDTH.map(value => space(value)),
})`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  color: ${color("black30")};
  transition: opacity ${ARROW_TRANSITION_MS}ms, color ${ARROW_TRANSITION_MS}ms;

  > svg {
    fill: currentColor;
  }

  &:hover,
  &:focus {
    outline: 0;
    color: ${color("black100")};
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`

const Next = styled(Arrow)`
  right: 0;
  transform: translateX(100%);
`

const Previous = styled(Arrow)`
  left: 0;
  transform: translateX(-100%);
`

const Cell = styled(Box)``

export interface CarouselProps extends BoxProps {
  children: JSX.Element | JSX.Element[]
  onChange?(index: number): void
}

/**
 * A `Carousel` accepts children or a series of children that are JSX elements.
 * It presents them in a horizontal rail and when the width exceeds the width
 * of the viewport, it presents navigation arrows and allows a user to page
 * through them.
 */
export const Carousel: React.FC<CarouselProps> = ({
  children,
  onChange,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const startRef = useRef<HTMLButtonElement | null>(null)
  const endRef = useRef<HTMLButtonElement | null>(null)

  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map(child => ({ child, ref: createRef<HTMLDivElement>() })),
    [children]
  )

  const [pages, setPages] = useState([0])

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    max: pages.length,
  })

  const init = () => {
    const { current: viewport } = viewportRef
    const els = cells.map(({ ref }) => ref.current)
    const values = els.map(node => node.clientWidth)
    setPages(paginate({ viewport: viewport.clientWidth, values }))
  }

  useEffect(() => {
    init()
    window.addEventListener("resize", init)
    return () => {
      window.removeEventListener("resize", init)
    }
  }, [cells])

  const skipToEnd = () => {
    if (!endRef.current) return
    endRef.current.focus()
    setCursor(pages.length - 1)
  }

  const skipToStart = () => {
    if (!startRef.current) return
    startRef.current.focus()
    setCursor(0)
  }

  const handleKeydown = ({ key }: KeyboardEvent) => {
    if (!containerRef.current) return

    // Only triggers keyboard navigation if component is in focus
    if (!containerRef.current.contains(document.activeElement)) {
      return
    }

    switch (key) {
      case "ArrowRight":
        handleNext()
        break
      case "ArrowLeft":
        handlePrev()
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [handleKeydown])

  useEffect(() => {
    onChange && onChange(index)
  }, [onChange, index])

  const offset = `-${pages[index]}px`

  return (
    <Container ref={containerRef as any} {...rest}>
      <Skip ref={startRef} onClick={skipToEnd} mb={1}>
        Skip to end of content
      </Skip>

      <nav>
        <Previous
          onClick={handlePrev}
          disabled={index === 0}
          aria-label="Previous page"
        >
          <ChevronIcon direction="left" width={30} height={30} />
        </Previous>

        <Next
          onClick={handleNext}
          disabled={index === pages.length - 1}
          aria-label="Next page"
        >
          <ChevronIcon direction="right" width={30} height={30} />
        </Next>
      </nav>

      <Viewport ref={viewportRef as any}>
        <Rail as="ul" style={{ transform: `translateX(${offset})` }}>
          {cells.map(({ child, ref }, i) => {
            const isLast = i === cells.length - 1

            return (
              <Cell
                as="li"
                key={i}
                ref={ref as any}
                pr={!isLast && CELL_GAP_PADDING_AMOUNT}
              >
                {child}
              </Cell>
            )
          })}
        </Rail>
      </Viewport>

      <Skip ref={endRef} onClick={skipToStart} mt={1}>
        Skip to beginning of content
      </Skip>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Page {index + 1} of {pages.length}
      </VisuallyHidden>
    </Container>
  )
}
