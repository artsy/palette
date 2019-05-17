import React from "react"
import { color } from "../../helpers"

/**
 * Point is the component responsible for rendering a data point
 * in a line chart.
 */
export const Point = ({
  cx,
  cy,
  hovered,
}: {
  cx: number
  cy: number
  hovered: boolean
}) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r="4"
      fill={hovered ? color("black30") : color("black10")}
    />
  )
}
