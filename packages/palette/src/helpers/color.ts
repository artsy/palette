import { THEME_V3 } from "@artsy/palette-tokens"
import { Color } from "../themes/types"

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component `color` or `borderColor` props, or `themeGet('colors.colorName')`
 */
export const color = (colorKey: Color | "currentColor") =>
  THEME_V3.colors[colorKey] ?? colorKey
