import { THEME_V3 } from "@artsy/palette-tokens"
import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"

/**
 * A helper to easily access space values when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component spacing props, or `themeGet('space.n')`
 */
export const space = (spaceKey: SpacingUnit): number => {
  return parseInt(THEME_V3.space[spaceKey], 10)
}
