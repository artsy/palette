import { color, space } from "../../helpers"
import { Box } from "../Box"

import { interpolateArray } from "d3-interpolate"
import { line as d3_line } from "d3-shape"
import React from "react"
import { Spring } from "react-spring"

const CHART_HEIGHT = 150
const CHART_WIDTH = 500
const CHART_MARGIN = space(2)

export interface DataPoint {
  value: number
}

export interface ChartProps {
  data: DataPoint[]
}

/**
 * LineChart component
 * @param param0 line chart
 */
export const LineChart = ({ data }: ChartProps) => {
  const values = data.map(d => d.value)
  const zeros = values.map(() => 0)
  const valuesInterpolator = interpolateArray(zeros, values)

  const displayY = d => CHART_HEIGHT - (d * CHART_HEIGHT) / 400
  const displayX = (_d, i) => (i * CHART_WIDTH) / values.length

  const line = d3_line()
    .x(displayX)
    .y(displayY)

  return (
    <Box m={1}>
      <svg
        width={CHART_WIDTH + 2 * CHART_MARGIN}
        height={CHART_HEIGHT + 2 * CHART_MARGIN}
      >
        <g transform={`translate(${CHART_MARGIN}, ${CHART_MARGIN})`}>
          <Spring from={{ num: 0 }} to={{ num: 1 }} delay={1000}>
            {({ num }) => {
              const interpolatedValues: any = valuesInterpolator(num)
              const circles = interpolatedValues.map((d, i) => (
                <circle
                  key={i}
                  cx={displayX(d, i)}
                  cy={displayY(d)}
                  r="4"
                  fill={color("black30")}
                />
              ))
              return (
                <React.Fragment>
                  <path
                    fill="none"
                    stroke={color("black30")}
                    d={line(interpolatedValues)}
                  />
                  {circles}
                </React.Fragment>
              )
            }}
          </Spring>
          <line
            stroke={color("black30")}
            x1="0"
            x2={CHART_WIDTH}
            y1={CHART_HEIGHT}
            y2={CHART_HEIGHT}
          />
        </g>
      </svg>
    </Box>
  )
}
