import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { media, space } from "../../helpers"
import { useHasEnteredViewport } from "../../helpers/visualizationHelpers"
import { coerceLabel } from "../BarChart"
import { BarHoverLabel } from "../BarChart/Bar"
import { BarLabelProps } from "../BarChart/BarLabel"
import { ProvideMousePosition } from "../BarChart/MousePositionContext"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { LineChartSVG } from "./LineChartSVG"

export interface PointDescriptor {
  value: number
  axisLabelX?: React.ReactNode
  tooltip?: React.ReactNode | BarLabelProps
}

export interface LineChartProps {
  points: PointDescriptor[]
  chartHeight?: number
}

const margin = space(2)
const DEFAULT_HEIGHT = 87

/**
 * LineChart is a component that displays some data points connected by lines.
 * Useful for visualizing a time series, etc.
 */
export const LineChart = ({ points, chartHeight }: LineChartProps) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [hoverIndex, setHoverIndex] = useState(-1)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const setContainerWidth = () => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.getBoundingClientRect().width - 5)
    }
  }

  if (!width) {
    setContainerWidth()
  }

  useEffect(() => {
    setHeight(chartHeight || DEFAULT_HEIGHT)
  }, [chartHeight])

  useEffect(() => {
    window.addEventListener("resize", setContainerWidth)

    return function cleanup() {
      window.removeEventListener("resize", setContainerWidth)
    }
  }, [])

  const hasEnteredViewport = useHasEnteredViewport(wrapperRef)

  return (
    <ProvideMousePosition>
      <Flex flexDirection="column" ref={wrapperRef as any} width="100%">
        {width && (
          <>
            <Flex height={height}>
              {points.map((point, i) => (
                <HoverHandler
                  key={i}
                  index={i}
                  hoverIndex={hoverIndex}
                  setHoverIndex={setHoverIndex}
                >
                  {coerceLabel(point.tooltip)}
                </HoverHandler>
              ))}
            </Flex>
            <LineChartSVG
              width={width}
              height={height}
              margin={margin}
              points={points}
              hoverIndex={hoverIndex}
              hasEnteredViewport={hasEnteredViewport}
            />
            {points.filter(bar => bar.axisLabelX).length > 0 && (
              <Flex px="2" width={width}>
                {points.map(({ axisLabelX }, i) => (
                  <BarAxisLabelContainer
                    key={i}
                    first={i === 0}
                    last={i === points.length - 1}
                  >
                    <AxisLabelX color="black60" size="2">
                      {axisLabelX}
                    </AxisLabelX>
                  </BarAxisLabelContainer>
                ))}
              </Flex>
            )}
          </>
        )}
      </Flex>
    </ProvideMousePosition>
  )
}

interface AxisContainerProps {
  first: boolean
  last: boolean
}

const HoverHandler = ({ children, index, hoverIndex, setHoverIndex }) => {
  const hover = hoverIndex === index
  return (
    <PointHoverArea
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(-1)}
      style={{ opacity: hover ? 1 : 0 }}
    >
      {hover && <BarHoverLabel>{children}</BarHoverLabel>}
    </PointHoverArea>
  )
}

/**
 * The rectangle area around Dots which triggers mouseover for tooltip
 */
export const PointHoverArea = styled.div`
  flex: 1;
  z-index: 1;
  margin-right: 1%; /* gap between area enabling tooptips */
  opacity: 0;
  transition: opacity 0.4s ease-in;
`

const BarAxisLabelContainer = styled.div<AxisContainerProps>`
  flex: ${({ last }) => (last ? 0 : 1)};
  min-height: ${space(2)}px;
  position: relative;
  ${media.xs`
    display: ${({ first, last }) => (first || last ? "auto" : "none")};;
  `};
`

const AxisLabelX = styled(Sans)`
  position: absolute;
  text-align: center;
  white-space: nowrap;
  transform: translateX(-33%);
`
