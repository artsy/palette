import { color } from "@artsy/palette"
import React from "react"

/**
 * Line is the component responsible for rendering a line that goes through all of the data points
 * in a line chart.
 */
export const Line = ({ path }: { path: string }) => {
  return <path fill="none" stroke={color("mono10")} d={path} />
}
