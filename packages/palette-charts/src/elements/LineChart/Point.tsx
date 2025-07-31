import { Color, useTheme } from "@artsy/palette"
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
  const { theme } = useTheme()
  const defaultColor = theme.colors[primaryColor || "mono10"]
  const hoveredColor = theme.colors[hoverColor || primaryColor || "mono30"]
  
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
