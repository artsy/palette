import { interpolate } from "d3-interpolate"
import { arc as d3_arc, pie as d3_pie } from "d3-shape"
import React, { useRef, useState } from "react"
import { Spring } from "react-spring"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { Color } from "../../Theme"
import { Box } from "../Box"
import { ChartHoverTooltip } from "../DataVis/ChartHoverTooltip"
import { coerceTooltip } from "../DataVis/ChartTooltip"
import { ProvideMousePosition } from "../DataVis/MousePositionContext"
import { ChartProps } from "../DataVis/utils/SharedTypes"
import { useGetWrapperWidth } from "../DataVis/utils/useGetWrapperWidth"
import { useHasEnteredViewport } from "../DataVis/utils/useHasEnteredViewPort"
import { Sans } from "../Typography"

const colors: Color[] = ["black10", "black30", "black60"]
/**
 * DonutChart is a component that displays data points with donut shaped arcs.
 * Good for illustrating numerical proportions.
 */
export const DonutChart: React.FC<ChartProps> = ({ points }) => {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [rest, setRest] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const hasEnteredViewport = useHasEnteredViewport(wrapperRef)

  const width = useGetWrapperWidth(wrapperRef)

  const margin = space(3)
  const donutWidth = space(4)
  const donutLabelMargin = space(2) / Math.sqrt(2)

  const centerX = width / 2 + margin
  const centerY = width / 2 + margin

  const values = points.map(d => d.value).sort()
  const angelInterpolator = interpolate(0, 2 * Math.PI)

  const arc = d3_arc()
    .innerRadius(width / 2 - margin - donutWidth)
    .outerRadius(width / 2 - margin)
    .padAngle(Math.PI / 360)

  // virtual donut to use its arc centroids to calculate label position
  const labelArc = d3_arc()
    .innerRadius(width / 2 - margin + donutLabelMargin)
    .outerRadius(width / 2 - margin + donutLabelMargin)
    .padAngle(Math.PI / 360)

  const pie = d3_pie()

  return (
    <ProvideMousePosition>
      <Box ref={wrapperRef as any} position="relative">
        {points.map((point, index) => {
          const hover = hoverIndex === index
          return hover ? (
            <ChartHoverTooltip key={`${index}-hover`}>
              {coerceTooltip(point.tooltip)}
            </ChartHoverTooltip>
          ) : null
        })}
        {pie(values).map((slice, index) => {
          const [x, y] = labelArc.centroid(slice as any)
          const axisLabelX = points[index].axisLabelX
          return (
            <>
              {axisLabelX ? (
                <DonutLabelContainer
                  key={index}
                  opacity={rest ? 1 : 0}
                  x={x + centerX}
                  y={y + centerY}
                  center={centerX}
                >
                  <Sans color="black60" size="2">
                    {axisLabelX}
                  </Sans>
                </DonutLabelContainer>
              ) : null}
            </>
          )
        })}
        <svg width={width} height={width}>
          <g transform={`translate(${centerX}, ${centerY})`}>
            <Spring
              from={{ num: 0 }}
              to={hasEnteredViewport ? { num: 1 } : { num: 0 }}
              delay={500}
              onRest={() => setRest(true)}
            >
              {({ num }) => {
                const angle = angelInterpolator(num)
                pie.endAngle(angle)
                const slices = pie(values).map((datum: any, index) => {
                  const arcColor: string = color(colors[index % 3])
                  return (
                    <>
                      <path
                        key={index}
                        fill={arcColor}
                        d={arc(datum)}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                      />
                    </>
                  )
                })
                return <g>{slices}</g>
              }}
            </Spring>
          </g>
        </svg>
      </Box>
    </ProvideMousePosition>
  )
}

interface DonutLabelContainerProps {
  x: number
  y: number
  center?: number
  opacity: number
}

// to create a float:right effect for labels that are on left side (also top)
const computeLabelTranslate = (dim, center) => {
  return dim < center ? "-100%" : 0
}

const DonutLabelContainer = styled.div<DonutLabelContainerProps>`
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  position: absolute;
  text-align: center;
  transform: translate(
    ${({ x, center }) => computeLabelTranslate(x, center)},
    ${({ y, center }) => computeLabelTranslate(y, center)}
  );
  white-space: nowrap;
  transition: opacity 0.4s ease-in;
  opacity: ${({ opacity }) => opacity};
`
