import { Color, THEME } from "../Theme"

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component `color` or `borderColor` props, or `themeGet('colors.colorName')`
 */
export const color = (colorKey: Color | "currentColor") =>
  THEME.colors[colorKey] ?? colorKey
