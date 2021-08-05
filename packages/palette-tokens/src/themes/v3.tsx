import { TEXT_FONTS, TEXT_VARIANTS } from "../typography/v3";

/** A list of breakpoints accessible by key/value. */
export const breakpoints = {
  /** Above 1920 */
  lg: "1920px",
  /** Between 1280 and 1919 */
  md: "1280px",
  /** Between 768 and  1279 */
  sm: "768px",
  /** Below 767 */
  xs: "767px",
};

/** Copy of `breakpoints` as integers */
export const unitlessBreakpoints = {
  /** Above 1920 */
  lg: parseInt(breakpoints.lg, 10),
  /** Between 1280 and 1919 */
  md: parseInt(breakpoints.md, 10),
  /** Between 768 and  1279 */
  sm: parseInt(breakpoints.sm, 10),
  /** Below 767 */
  xs: parseInt(breakpoints.xs, 10),
};

/**
 * We alias breakpoints onto the scale so that styled-system has access
 * to the named breakpoints as well as the scale
 */
const BREAKPOINTS_SCALE = Object.assign(
  [breakpoints.sm, breakpoints.md, breakpoints.lg],
  breakpoints
);

/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team
 */
export const THEME = {
  id: "v3",

  breakpoints: BREAKPOINTS_SCALE,

  colors: {
    /** Full black, primary brand color  */
    black100: "#000000",
    /** 60% black, bold copy, lower in hierarchy  */
    black60: "#707070",
    /** 30 black (dark grey), placeholder text only  */
    black30: "#C2C2C2",
    /** 15 black (grey), borders, divider lines, and grey button only */
    black15: "#D8D8D8",
    /** 10 black (grey), borders, divider lines, and grey button only */
    black10: "#E7E7E7",
    /** 5 black (light grey), backgrounds only */
    black5: "#F7F7F7",
    /** Full Blue. Calls to action, highlights, edits */
    blue100: "#1023D7",
    /** Alias of blue100 */
    brand: "#1023D7",
    /** 10% of blue100 on white. Backgrounds */
    blue10: "#E6E7F5",
    /** Full copper. In consideration, transition, temporary */
    copper100: "#7B5927",
    /** 10% of copper100 on white. Backgrounds */
    copper10: "#ECE9E3",
    /** Full green. Success, approval, go */
    green100: "#127438",
    /** 10% of green100 on white. Backgrounds */
    green10: "#E0EAE4",
    /** Full red. Notification, error, stop */
    red100: "#C82400",
    /** 10% of red100 on white. Backgrounds */
    red10: "#F4E4E3",
    /** Full white */
    white100: "#FFFFFF",
  },

  fonts: TEXT_FONTS,

  // prettier-ignore
  // Media queries to work with in web
  mediaQueries: {
    lg: `(min-width: ${breakpoints.lg})`,
    md: `(min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg, 10) - 1}px)`,
    sm: `(min-width: ${breakpoints.sm}) and (max-width: ${parseInt(breakpoints.md, 10) - 1}px)`,
    xs: `(max-width: ${parseInt(breakpoints.sm, 10) - 1}px)`,
    /** Determines if the input device has the notion of hover, e.g. mouse. */
    hover: `not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)`,
  },

  // Empty grid object to prevent `Grid` component from throwing
  grid: {
    breakpoints: {},
  },

  space: {
    // unit: px value
    /** Equivalent to 5px  */
    0.5: "5px",
    /** Equivalent to 10px  */
    1: "10px",
    /** Equivalent to 20px  */
    2: "20px",
    /** Equivalent to 40px  */
    4: "40px",
    /** Equivalent to 60px  */
    6: "60px",
    /** Equivalent to 120px  */
    12: "120px",
  },

  textVariants: TEXT_VARIANTS,
};

/** All available px spacing maps */
export type SpacingUnit = keyof typeof THEME["space"];
/** All available color keys */
export type Color = keyof typeof THEME["colors"];
/** All available width breakpoint */
export type Breakpoint = keyof typeof breakpoints;
