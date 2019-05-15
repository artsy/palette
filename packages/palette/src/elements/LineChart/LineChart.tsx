import { line as d3_line } from "d3-shape"
import React from "react"
import { Line } from "./Line"
import { Point } from "./Point"

export interface PointDescriptor {
  value: number
}

export interface LineChartProps {
  points: PointDescriptor[]
}

const CHART_HEIGHT = 150
const CHART_WIDTH = 500

/**
 * LineChart is a component that displays some data ponts connected by lines.
 * Useful for visualizing a time series, etc.
 */
export const LineChart = ({ points }: LineChartProps) => {
  const maxValue = points.reduce((max, { value }) => {
    return value > max ? value : max
  }, -Infinity)

  const displayY = d => CHART_HEIGHT - (d * CHART_HEIGHT) / maxValue
  const displayX = (_d, i) => (i * CHART_WIDTH) / points.length

  const line = d3_line()
    .x(displayX)
    .y(displayY)

  return (
    <svg>
      <Line d={line(points.map(d => d.value) as any)} />
      {points.map(({ value }, index) => {
        return (
          <Point key={index} cx={displayX(value, index)} cy={displayY(value)} />
        )
      })}
    </svg>
  )
}
