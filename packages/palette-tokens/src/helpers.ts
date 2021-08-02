import tokens, { Color, ColorValue, SpacingUnit } from "./index";

/**
 * A helper to easily access space values when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component spacing props, or `themeGet('space.n')`
 */
export const space = (spaceKey: SpacingUnit): number => {
  return parseInt(tokens.space[spaceKey], 10);
};

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 *
 * @deprecated use component `color` or `borderColor` props, or `themeGet('colors.colorName')`
 */
export function color(colorKey: undefined): undefined;
export function color(colorKey: Color): ColorValue;
export function color(colorKey?: Color): ColorValue | undefined;
export function color(colorKey?: Color): ColorValue | undefined {
  if (colorKey === undefined) {
    return undefined;
  }
  return tokens.colors[colorKey];
}
