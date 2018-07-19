import { themeProps, Color, SpacingUnit, Breakpoint } from "./Theme"

type MediaType = "all" | "print" | "screen" | "speech"

/**
 * A helper to easily access colors when not in a styled-components or styled-systems context
 */
export const color = (colorKey: Color) => themeProps.colors[colorKey]

/**
 * A helper to easily access space values when not in a styled-components or styled-systems context
 */
export const space = (spaceKey: SpacingUnit) => themeProps.space[spaceKey]

/**
 * A helper to construct media query strings for responsive style targeting
 */
export const media = (
  breakpointKey: Breakpoint,
  mediaType: MediaType = "screen"
) => `@media ${mediaType} and ${themeProps.mediaQueries[breakpointKey]}`
