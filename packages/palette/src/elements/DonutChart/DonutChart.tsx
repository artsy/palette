import { color, space } from "../../helpers"
import { Color } from "../../Theme"
import { Box } from "../Box"
import { ChartProps } from "../LineChart"

import { interpolate } from "d3-interpolate"
import { arc as d3_arc, pie as d3_pie } from "d3-shape"
import React from "react"
import { Spring } from "react-spring"

const CHART_HEIGHT = 300
const CHART_WIDTH = 300
const CHART_MARGIN = space(2)

const colors: Color[] = ["black60", "black30", "black80"]

/**
 * DonutChart
 * @param data
 */
export const DonutChart = ({ data }: ChartProps) => {
  const values = data.map(d => d.value)
  const angelInterpolator = interpolate(0, 2 * Math.PI)

  const arc = d3_arc()
    .innerRadius(CHART_WIDTH / 2 - 50)
    .outerRadius(CHART_WIDTH / 2)
    .padAngle(Math.PI / 360)

  const pie = d3_pie()

  return (
    <Box m={1}>
      <svg
        width={CHART_WIDTH + 2 * CHART_MARGIN}
        height={CHART_HEIGHT + 2 * CHART_MARGIN}
      >
        <g
          transform={`translate(${CHART_MARGIN * 2 +
            CHART_WIDTH / 2}, ${CHART_MARGIN * 2 + CHART_HEIGHT / 2})`}
        >
          <Spring from={{ num: 0 }} to={{ num: 1 }} delay={1000}>
            {({ num }) => {
              const angle = angelInterpolator(num)
              pie.endAngle(angle)
              const slices = pie(values).map((d: any, i) => {
                return <path key={i} fill={color(colors[i % 3])} d={arc(d)} />
              })
              return <g>{slices}</g>
            }}
          </Spring>
        </g>
      </svg>
    </Box>
  )
}
