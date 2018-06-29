import { themeProps } from "./Theme"

/**
 * A helper to easily access colors when not in a styled-components or styled-systems context
 */
export const color = (colorKey: keyof typeof themeProps["colors"]) =>
  themeProps.colors[colorKey]

/**
 * A helper to easily access space values when not in a styled-components or styled-systems context
 */
export const space = (spaceKey: keyof typeof themeProps["space"]) =>
  themeProps.space[spaceKey]
