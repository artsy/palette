import { THEME_V3 } from ".";
import { Color, SpacingUnit } from "./themes/types";

/**
 * A helper to easily access space values when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component spacing props, or `themeGet('space.n')`
 */
export const space = (spaceKey: SpacingUnit): number => {
  return parseInt(THEME_V3.space[spaceKey], 10);
};

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component `color` or `borderColor` props, or `themeGet('colors.colorName')`
 */
export function color(colorKey: undefined): undefined;
export function color(colorKey: Color): string;
export function color(colorKey?: Color): string | undefined;
export function color(colorKey?: Color): string | undefined {
  if (colorKey === undefined) {
    return undefined;
  }
  return THEME_V3.colors[colorKey];
}
