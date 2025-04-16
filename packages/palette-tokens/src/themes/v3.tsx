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

const COLORS = {
  /** Suitable for text on mono10 and lighter */
  mono100: "#000000",
  /** Suitable for text on mono5 and lighter */
  mono60: "#707070",
  /** Background only */
  mono30: "#C2C2C2",
  /** Background only */
  mono15: "#D8D8D8",
  /** Background only */
  mono10: "#E7E7E7",
  /** Suitable for text on mono60 and darker */
  mono5: "#F7F7F7",
  /** Suitable for text on mono60 and darker */
  mono0: "#FFFFFF",

  /** Suitable for text on mono10 and lighter */
  blue200: "#050e3e",
  /** Suitable for text on mono10 and lighter */
  blue150: "#0A1C7B",
  /** Suitable for text on mono10 and lighter */
  blue100: "#1023D7",
  /** Alias of blue100 */
  brand: "#1023D7",
  /** Background only */
  blue15: "#cacdec",
  /** Background only */
  blue10: "#E6E7F5",

  /** Hover/down state and suitable for text on green10 */
  green150: "#003728",
  /** Suitable for text on green10, mono10 and lighter */
  green100: "#00674A",
  /** Background only */
  green10: "#E8EFE2",

  /** Hover/down state and suitable for text on yellow10 */
  yellow150: "#A47A0F",
  /** Suitable for text on mono10 and lighter */
  yellow100: "#E2B929",
  /** Background only */
  yellow10: "#FFFAE9",

  /** Hover/down state and suitable for text on orange10 */
  orange150: "#A8501C",
  /** Suitable for text on mono10 and lighter */
  orange100: "#DA6722",
  /** Background only */
  orange10: "#FCF7F3",

  /** Hover/down state and suitable for text on red10 */
  red150: "#510B0B",
  /** Suitable for text on red10, mono10, and lighter */
  red100: "#D71023",
  /** Suitable for importance/urgency indicators */
  red50: "#FF1023",
  /** Background only */
  red10: "#FEF2EF",
};

export type Colors = typeof COLORS;

const EFFECTS = {
  dropShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
  innerShadow: "1px 1px 2px 0 rgba(0, 0, 0, 0.1) inset",
  flatShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.05)",
  /** Shadow to drop under text to improve legibility when over images */
  textShadow: "0 0 15px rgba(0, 0, 0, 0.25)",
  /** Overlay to improve legibility of text */
  overlayGradient: `
    linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.006) 8.1%,
      hsla(0, 0%, 0%, 0.024) 15.5%,
      hsla(0, 0%, 0%, 0.052) 22.5%,
      hsla(0, 0%, 0%, 0.088) 29%,
      hsla(0, 0%, 0%, 0.13) 35.3%,
      hsla(0, 0%, 0%, 0.176) 41.2%,
      hsla(0, 0%, 0%, 0.225) 47.1%,
      hsla(0, 0%, 0%, 0.275) 52.9%,
      hsla(0, 0%, 0%, 0.324) 58.8%,
      hsla(0, 0%, 0%, 0.37) 64.7%,
      hsla(0, 0%, 0%, 0.412) 71%,
      hsla(0, 0%, 0%, 0.448) 77.5%,
      hsla(0, 0%, 0%, 0.476) 84.5%,
      hsla(0, 0%, 0%, 0.494) 91.9%,
      hsla(0, 0%, 0%, 0.5) 100%
    );
  `,
  /** Fade right edge */
  fadeRight:
    "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
  /** Translucent gray for dialog backdrops */
  backdrop: "rgba(229, 229, 229, 0.5)",
};

export type Effects = typeof EFFECTS;

/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team
 */
export const THEME = {
  id: "v3",
  name: "light",
  breakpoints: BREAKPOINTS_SCALE,
  colors: COLORS,
  effects: EFFECTS,
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
/** All available color values */
export type ColorValue = typeof THEME["colors"][Color];
/** All available width breakpoint */
export type Breakpoint = keyof typeof breakpoints;
