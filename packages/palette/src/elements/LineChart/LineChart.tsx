import { interpolateArray } from "d3-interpolate"
import { line as d3Line } from "d3-shape"
import React, { useEffect, useRef, useState } from "react"
import { Spring } from "react-spring"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { max, useHasEnteredViewport } from "../../helpers/visualizationHelpers"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { Line } from "./Line"
import { Point } from "./Point"

export interface PointDescriptor {
  value: number
  axisLabelX?: React.ReactNode
}

export interface LineChartProps {
  points: PointDescriptor[]
}

const margin = space(2)

/**
 * LineChart is a component that displays some data points connected by lines.
 * Useful for visualizing a time series, etc.
 */
export const LineChart = ({ points }: LineChartProps) => {
  const maxValue: number = max(points, item => item.value)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(87)

  console.log(width)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const setContainerWidth = () => {
    if(wrapperRef.current) {
      setWidth(wrapperRef.current.getBoundingClientRect().width - 5)
    }
  }

  if(!width) {
    setContainerWidth()
  }

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

  const displayYPosition = d => h - (d * h) / maxValue
  const displayXPosition = (_d, i) => (i / (points.length - 1)) * w

  const line = d3Line()
    .x(displayXPosition)
    .y(displayYPosition)

  return (
    <Flex flexDirection="column" ref={wrapperRef as any} width="100%">
      {width && (
        <svg width={width} height={height}>
          <g transform={`translate(0, ${margin})`}>
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
            <line stroke={color("black10")} x1="0" x2={width} y1={h} y2={h} />
          </g>
        </svg>
      )}
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
    </Flex>
  )
}

interface AxisContainerProps {
  last: boolean
}

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
