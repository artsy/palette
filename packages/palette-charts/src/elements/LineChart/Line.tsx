import { color, Color } from "@artsy/palette"
import React from "react"

/**
 * Line is the component responsible for rendering a line that goes through all of the data points
 * in a line chart.
 */
export const Line = ({
  path,
  color: customColor,
}: {
  path: string
  color?: Color
}) => {
  return <path fill="none" stroke={color(customColor || "mono10")} d={path} />
}
