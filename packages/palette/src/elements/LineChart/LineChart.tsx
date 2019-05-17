import { interpolateArray } from "d3-interpolate"
import { line as d3Line } from "d3-shape"
import React, { useEffect, useRef, useState } from "react"
import { Spring } from "react-spring"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { max, useHasEnteredViewport } from "../../helpers/visualizationHelpers"
import { coerceLabel } from "../BarChart"
import { BarHoverLabel } from "../BarChart/Bar"
import { BarLabelProps } from "../BarChart/BarLabel"
import { ProvideMousePosition } from "../BarChart/MousePositionContext"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { Line } from "./Line"
import { Point } from "./Point"

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
  const maxValue: number = max(points, item => item.value)

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

  const values = points.map(d => d.value)
  const zeros = values.map(() => 0)
  const valuesInterpolator = interpolateArray(zeros, values)

  const w = width - 2 * margin
  const h = height - 2 * margin

  // maps value to x/y position
  const displayYPosition = d => h - (d * h) / maxValue
  const displayXPosition = (_d, i) => (i / (points.length - 1)) * w

  const line = d3Line()
    .x(displayXPosition)
    .y(displayYPosition)

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
            <Svg width={width} height={height}>
              <g transform={`translate(0, ${margin})`}>
                <line
                  stroke={color("black10")}
                  x1="0"
                  x2={width}
                  y1={h}
                  y2={h}
                />
                <g transform={`translate(${margin}, 0)`}>
                  <Spring
                    from={{ num: 0 }}
                    to={hasEnteredViewport ? { num: 1 } : { num: 0 }}
                    delay={500}
                  >
                    {({ num }) => {
                      const interpolatedValues: any = valuesInterpolator(num)
                      return (
                        <>
                          <Line d={line(interpolatedValues as any)} />
                          {interpolatedValues.map((value, index) => {
                            return (
                              <Point
                                hovered={hoverIndex === index}
                                key={index}
                                cx={displayXPosition(value, index)}
                                cy={displayYPosition(value)}
                              />
                            )
                          })}
                        </>
                      )
                    }}
                  </Spring>
                </g>
              </g>
            </Svg>
            {points.filter(bar => bar.axisLabelX).length > 0 && (
              <Flex px="2" width={width}>
                {points.map(({ axisLabelX }, i) => (
                  <BarAxisLabelContainer key={i} last={i === points.length - 1}>
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

const PointHoverArea = styled.div`
  flex: 1;
  z-index: 1;
  margin-right: 1%;
  opacity: 0;
  transition: opacity 0.4s ease-in;
`

const Svg = styled.svg`
  position: absolute;
`

const BarAxisLabelContainer = styled.div<AxisContainerProps>`
  flex: ${({ last }) => (last ? 0 : 1)};
  min-height: ${space(2)}px;
  position: relative;
`

const AxisLabelX = styled(Sans)`
  position: absolute;
  text-align: center;
  white-space: nowrap;
  transform: translateX(-33%);
`
