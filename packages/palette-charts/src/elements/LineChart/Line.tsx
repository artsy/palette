import { Color, useTheme } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
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
  const { theme } = useTheme()
  return (
    <path fill="none" stroke={theme.colors[customColor || "mono10"]} d={path} />
  )
}
