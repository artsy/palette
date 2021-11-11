import { Color, themeProps } from "../Theme"

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component `color` or `borderColor` props, or `themeGet('colors.colorName')`
 */
export const color = (colorKey: Color | "currentColor") =>
  themeProps.colors[colorKey] ?? colorKey
