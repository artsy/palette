import { interpolate } from "d3-interpolate"
import { arc as d3_arc, pie as d3_pie } from "d3-shape"
import React, { useRef, useState } from "react"
import { Spring } from "react-spring"
import styled from "styled-components"
import { color, media, space } from "../../helpers"
import { Color } from "../../Theme"
import { ChartHoverTooltip } from "../DataVis/ChartHoverTooltip"
import { coerceTooltip } from "../DataVis/ChartTooltip"
import { ProvideMousePosition } from "../DataVis/MousePositionContext"
import { ChartProps } from "../DataVis/utils/SharedTypes"
import { useGetWrapperWidth } from "../DataVis/utils/useGetWrapperWidth"
import { useHasEnteredViewport } from "../DataVis/utils/useHasEnteredViewPort"
import { Flex } from "../Flex"
import { Sans } from "../Typography"

const colors: Color[] = ["black10", "black30", "black60"]
/**
 * DonutChart is a component that displays data points with donut shaped arcs.
 * Good for illustrating numerical proportions.
 */
export const DonutChart: React.FC<ChartProps> = ({ height, points }) => {
  const [hoverIndex, setHoverIndex] = useState(-1)

  const margin = space(2) // TODO: small screen -> 10
  const donutWidth = space(4)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const hasEnteredViewport = useHasEnteredViewport(wrapperRef)

  const width = useGetWrapperWidth(wrapperRef)

  const values = points.map(d => d.value).sort()
  const angelInterpolator = interpolate(0, 2 * Math.PI)

  const arc = d3_arc()
    .innerRadius(width / 2 - 2 * margin - donutWidth)
    .outerRadius(width / 2 - 2 * margin)
    .padAngle(Math.PI / 360)

  const pie = d3_pie()

  return (
    <ProvideMousePosition>
      <Flex ref={wrapperRef as any}>
        {points.map((point, index) => {
          const hover = hoverIndex === index
          return hover ? (
            <ChartHoverTooltip key={`${index}-hover`}>
              {coerceTooltip(point.tooltip)}
            </ChartHoverTooltip>
          ) : null
        })}

        <svg width={width} height={width}>
          <g
            transform={`translate(${margin + width / 2}, ${margin +
              width / 2})`}
          >
            <Spring
              from={{ num: 0 }}
              to={hasEnteredViewport ? { num: 1 } : { num: 0 }}
              delay={500}
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
      </Flex>
    </ProvideMousePosition>
  )
}
