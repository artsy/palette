import { color, Color } from "@artsy/palette"
import React from "react"

/**
 * Point is the component responsible for rendering a data point
 * in a line chart.
 */
export const Point = ({
  cx,
  cy,
  opacity,
  hovered,
  primaryColor,
  hoverColor,
}: {
  cx: number
  cy: number
  opacity: number
  hovered: boolean
  primaryColor?: Color
  hoverColor?: Color
}) => {
  const defaultColor = primaryColor || color("mono10")
  const hoveredColor = hoverColor || primaryColor || color("mono30")
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r="4"
      opacity={opacity}
      fill={hovered ? hoveredColor : defaultColor}
    />
  )
}
