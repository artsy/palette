import {
  TEXT_FONT_SIZES,
  TEXT_FONTS,
  TEXT_LETTER_SPACING,
  TEXT_LINE_HEIGHTS,
  TEXT_VARIANTS,
} from "../elements/Text/tokens/v2"
import { fontFamily } from "../platform/fonts"

/**
 * A list of breakpoints accessible by key/value
 */
export const breakpoints = {
  /** Above 1192 */
  xl: "1192px",
  /** Between 1024 and  1191 */
  lg: "1024px",
  /** Between 900 and 1023 */
  md: "900px",
  /** Between 768 and  899 */
  sm: "768px",
  /** Below 767 */
  xs: "767px",
}

/**
 * Copy of `breakpoints` as integers
 */
export const unitlessBreakpoints = {
  /** Above 1192 */
  xl: parseInt(breakpoints.xl, 10),
  /** Between 1024 and  1191 */
  lg: parseInt(breakpoints.lg, 10),
  /** Between 900 and 1023 */
  md: parseInt(breakpoints.md, 10),
  /** Between 768 and  899 */
  sm: parseInt(breakpoints.sm, 10),
  /** Below 767 */
  xs: parseInt(breakpoints.xs, 10),
}

/**
 * We alias breakpoints onto the scale so that styled-system has access
 * to the named breakpoints as well as the scale
 */
const BREAKPOINTS_SCALE = Object.assign(
  [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl],
  breakpoints
)

/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 */
export const THEME = {
  id: "v2",

  /** Border variations */
  borders: ["1px solid", "2px solid"],

  /**
   *  This allows styled-system to hook into our breakpoints
   */
  breakpoints: BREAKPOINTS_SCALE,

  /**
   * Artsy's color schemes
   */
  colors: {
    /** Full black, primary brand color  */
    black100: "#000",
    /** 80% black  */
    black80: "#333",
    /** 60% black, bold copy, lower in hierarchy  */
    black60: "#666",
    /** 30 black (dark grey), placeholder text only  */
    black30: "#C2C2C2",
    /** 10 black (grey), borders, divider lines, and grey button only */
    black10: "#E5E5E5",
    /** 5 black (light grey), backgrounds only */
    black5: "#F8F8F8",
    /** Full Blue. Calls to action, highlights, edits */
    blue100: "#0A1AB4",
    /** 10% of blue100 on white. Backgrounds */
    blue10: "#E6E8F7",
    /** Full copper. In consideration, transition, temporary */
    copper100: "#A85F00",
    /** 10% of copper100 on white. Backgrounds */
    copper10: "#F6EFE5",
    /** Full green. Success, approval, go */
    green100: "#217C44",
    /** 10% of green100 on white. Backgrounds */
    green10: "#E9F2EC",
    /** Full purple, secondary brand color. Should only used in time/transitions (on hover, active state), for highlighting vital text, and links.   */
    purple100: "#6E1EFF",
    /** 30 purple (light purple), avoid usage  */
    purple30: "#D3BBFF",
    /* 5 purple, highlight, accent */
    purple5: "#F8F3FF",
    /** Full red. Notification, error, stop */
    red100: "#E82F1D",
    /** 10% of red100 on white. Backgrounds */
    red10: "#FDEAE8",
    /** Replaced by copper100; hex updated here for consistency but copper100 should be used instead! */
    yellow100: "#A85F00",
    /** 30 yellow (light yellow), avoid future use */
    yellow30: "#FAE7BA",
    /** Replaced by copper10; hex updated here for consistency but copper10 should be used instead! */
    yellow10: "#F6EFE5",
    /** Full white */
    white100: "#FFF",
  },

  fontFamily,

  fonts: TEXT_FONTS,
  fontSizes: TEXT_FONT_SIZES,
  letterSpacings: TEXT_LETTER_SPACING,
  lineHeights: TEXT_LINE_HEIGHTS,

  // prettier-ignore
  /** Media queries to work with in web  */
  mediaQueries: {
    xl: `(min-width: ${breakpoints.xl})`,
    lg: `(min-width: ${breakpoints.lg}) and (max-width: ${parseInt(breakpoints.xl, 10) - 1})`,
    md: `(min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg, 10) - 1})`,
    sm: `(min-width: ${breakpoints.sm}) and (max-width: ${parseInt(breakpoints.md, 10) - 1})`,
    xs: `(max-width: ${parseInt(breakpoints.sm, 10) - 1})`,
    /** Determines if the input device has the notion of hover, e.g. mouse. */
    hover: `not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)`,
  },

  // https://github.com/dragma/styled-bootstrap-grid#styled-bootstrap-grid
  grid: {
    /**
     * Breakpoints for the Artsy grid,
     * https://www.notion.so/artsy/Grid-e489a52e26bd4319b6ee7898044a8a53
     *
     * This version of `styled-bootstrap-grid` requires breakpoint
     * values to be integers (not px literals)
     */
    breakpoints: unitlessBreakpoints,
    container: {
      padding: 0,
    },
    row: {
      padding: 0,
    },
    col: {
      padding: 0,
    },
  },

  space: {
    // unit: px value
    /** Equivalent to 3px  */
    0.3: "3px",
    /** Equivalent to 5px  */
    0.5: "5px",
    /** Equivalent to 10px  */
    1: "10px",
    /** Equivalent to 15px  */
    1.5: "15px",
    /** Equivalent to 20px  */
    2: "20px",
    /** Equivalent to 30px  */
    3: "30px",
    /** Equivalent to 40px  */
    4: "40px",
    /** Equivalent to 50px  */
    5: "50px",
    /** Equivalent to 60px  */
    6: "60px",
    /** Equivalent to 90px  */
    9: "90px",
    /** Equivalent to 120px  */
    12: "120px",
    /** Equivalent to 180px  */
    18: "180px",
  },

  /**
   * Our type system is based on:
   * https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221
   */
  typeSizes: {
    /** Unica  */
    sans: {
      /** Equivalent to 8px size / 8px line-height  */
      "0": {
        fontSize: "8px",
        lineHeight: "8px",
      },
      /** Equivalent to 10px size / 14px line-height  */
      "1": {
        fontSize: "10px",
        lineHeight: "14px",
      },
      /** Equivalent to 12px size / 16px line-height  */
      "2": {
        fontSize: "12px",
        lineHeight: "16px",
      },
      /** Equivalent to 14px size / 24px line-height  */
      "3": {
        fontSize: "14px",
        lineHeight: "24px",
      },
      /** Equivalent to 14px size / 20px line-height  */
      "3t": {
        fontSize: "14px",
        lineHeight: "20px",
      },
      /** Equivalent to 16px size / 26px line-height  */
      "4": {
        fontSize: "16px",
        lineHeight: "26px",
      },
      /** Equivalent to 16px size / 22px line-height  */
      "4t": {
        fontSize: "16px",
        lineHeight: "22px",
      },
      /** Equivalent to 18px size / 30px line-height  */
      "5": {
        fontSize: "18px",
        lineHeight: "30px",
      },
      /** Equivalent to 18px size / 26px line-height  */
      "5t": {
        fontSize: "18px",
        lineHeight: "26px",
      },
      /** Equivalent to 22px size / 30px line-height  */
      "6": {
        fontSize: "22px",
        lineHeight: "30px",
      },
      /** Equivalent to 28px size / 36px line-height  */
      "8": {
        fontSize: "28px",
        lineHeight: "36px",
      },
      /** Equivalent to 42px size / 50px line-height  */
      "10": {
        fontSize: "42px",
        lineHeight: "50px",
      },
      /** Equivalent to 60px size / 66px line-height  */
      "12": {
        fontSize: "60px",
        lineHeight: "66px",
      },
      /** Equivalent to 80px size / 84px line-height  */
      "14": {
        fontSize: "80px",
        lineHeight: "84px",
      },
      /** Equivalent to 100px size / 104px line-height  */
      "16": {
        fontSize: "100px",
        lineHeight: "104px",
      },
    },

    /** Garamond  */
    serif: {
      /** Equivalent to 12px size / 16px line-height  */
      "1": {
        fontSize: "12px",
        lineHeight: "16px",
      },
      /** Equivalent to 14px size / 18px line-height  */
      "2": {
        fontSize: "14px",
        lineHeight: "18px",
      },
      /** Equivalent to 16px size / 24px line-height  */
      "3": {
        fontSize: "16px",
        lineHeight: "24px",
      },
      /** Equivalent to 16px size / 20px line-height  */
      "3t": {
        fontSize: "16px",
        lineHeight: "20px",
      },
      /** Equivalent to 18px size / 26px line-height  */
      "4": {
        fontSize: "18px",
        lineHeight: "26px",
      },
      /** Equivalent to 18px size / 22px line-height  */
      "4t": {
        fontSize: "18px",
        lineHeight: "22px",
      },
      /** Equivalent to 22px size / 32px line-height  */
      "5": {
        fontSize: "22px",
        lineHeight: "32px",
      },
      /** Equivalent to 22px size / 28px line-height  */
      "5t": {
        fontSize: "22px",
        lineHeight: "28px",
      },
      /** Equivalent to 26px size / 32px line-height  */
      "6": {
        fontSize: "26px",
        lineHeight: "32px",
      },
      /** Equivalent to 32px size / 38px line-height  */
      "8": {
        fontSize: "32px",
        lineHeight: "38px",
      },
      /** Equivalent to 44px size / 50px line-height  */
      "10": {
        fontSize: "44px",
        lineHeight: "50px",
      },
      /** Equivalent to 60px size / 70px line-height  */
      "12": {
        fontSize: "60px",
        lineHeight: "70px",
      },
    },

    /** Avant Garde  */
    display: {
      /** Equivalent to 10px size / 12px line-height  */
      "2": {
        fontSize: "10px",
        lineHeight: "12px",
      },
      /** Equivalent to 12px size / 16px line-height  */
      "3t": {
        fontSize: "12px",
        lineHeight: "16px",
      },
      /** Equivalent to 14px size / 18px line-height  */
      "4t": {
        fontSize: "14px",
        lineHeight: "18px",
      },
      /** Equivalent to 16px size / 20px line-height  */
      "5t": {
        fontSize: "16px",
        lineHeight: "20px",
      },
      /** Equivalent to 18px size / 22px line-height  */
      "6": {
        fontSize: "18px",
        lineHeight: "22px",
      },
      /** Equivalent to 22px size / 24px line-height  */
      "8": {
        fontSize: "22px",
        lineHeight: "24px",
      },
    },
  },

  textVariants: TEXT_VARIANTS,
}

/** All available px spacing maps */
export type SpacingUnit = keyof typeof THEME["space"]
/** All available color keys */
export type Color = keyof typeof THEME["colors"]
/** All available width breakpoint */
export type Breakpoint = keyof typeof breakpoints

/** All available type sizes */
export type TypeSizes = typeof THEME.typeSizes
/** All available sizes for our sans font */
export type SansSize = keyof TypeSizes["sans"] | Array<keyof TypeSizes["sans"]>
/** All available sizes for our serif font */
export type SerifSize =
  | keyof TypeSizes["serif"]
  | Array<keyof TypeSizes["serif"]>
/** All available sizes for our display font */
export type DisplaySize =
  | keyof TypeSizes["display"]
  | Array<keyof TypeSizes["display"]>

/** Alias for backwards-compatibility */
export const themeProps = THEME
