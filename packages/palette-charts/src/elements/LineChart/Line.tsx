import { color } from "@artsy/palette"
import React from "react"

/**
 * Line is the component responsible for rendering a line that goes through all of the data points
 * in a line chart.
 */
export const Line = ({ path, color: customColor }: { path: string; color?: string }) => {
  return <path fill="none" stroke={customColor || color("mono10")} d={path} />
}
