import React from "react"
import { color } from "../../helpers"

/**
 * Point is the component responsible for rendering a data point
 * in a line chart.
 */
export const Point = ({ cx, cy }: { cx: number; cy: number }) => {
  return <circle cx={cx} cy={cy} r="4" fill={color("black30")} />
}
