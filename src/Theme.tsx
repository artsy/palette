import React from "react"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { ThemeProvider } from "styled-components"
import { fontFamily } from "./platform/fonts"

/**
 * Spec: https://www.notion.so/artsy/Design-92030f16ed7c4c72bb3eb832b4243d04
 * Styled System API: https://jxnblk.com/styled-system/api
 * Table: https://jxnblk.com/styled-system/table
 */

/**
 * A list of breakpoints accessible by key/value. See:
 * https://www.notion.so/artsy/Grid-e489a52e26bd4319b6ee7898044a8a53
 */
export const breakpoints = {
  /** Above 1192 */
  xl: 1192,
  /** Between 1024 and  1191 */
  lg: 1024,
  /** Between 900 and 1023 */
  md: 900,
  /** Between 768 and  899 */
  sm: 768,
  /** Below 767 */
  xs: 767,
}

/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.notion.so/artsy/Master-Library-810612339f474d0997fe359af4285c56
 */
export const themeProps = {
  /** Border variations */
  borders: ["1px solid", "2px solid"],

  /**
   *  This allows styled-system to hook into our breakpoints
   */
  breakpoints: [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl],

  /**
   * Artsy's color schemes:
   * https://www.notion.so/artsy/Color-a0c24896daf8433d9409aee2146ac267
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
    /** Full purple, secondary brand color. Should only used in time/transitions (on hover, active state), for highlighting vital text, and links.   */
    purple100: "#6E1EFF",
    /** 30 purple (light purple), avoid usage  */
    purple30: "#D3BBFF",
    /* 5 purple, highlight, accent */
    purple5: "#F8F3FF",
    /** Full green, success */
    green100: "#0EDA83",
    /** Full red, error */
    red100: "#F7625A",
    /** Full yellow, warn */
    yellow100: "#F1AF1B",
    /** 30 yellow (light yellow), avoid future use */
    yellow30: "#FAE7BA",
    /** 10 yellow (lightest yellow), avoid future use */
    yellow10: "#FDF7E8",
    /** Full white */
    white100: "#FFF",
  },

  fontFamily,

  // prettier-ignore
  /** Media queries to work with in web  */
  mediaQueries: {
    xl: `(min-width: ${breakpoints.xl}px)`,
    lg: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
    md: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
    sm: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
    xs: `(max-width: ${breakpoints.sm -1}px)`,
    /** Determines if the input device has the notion of hover, e.g. mouse. */
    hover: `not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)`,
  },

  // https://github.com/dragma/styled-bootstrap-grid#styled-bootstrap-grid
  grid: {
    /**
     * Breakpoints for the Artsy grid,
     * https://www.notion.so/artsy/Grid-e489a52e26bd4319b6ee7898044a8a53
     */
    breakpoints,
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

  /**
   * The spacing system is based on
   * https://www.notion.so/artsy/Spacing-93eeaed9fdf9480099fec7094fd1b9f3
   */
  space: {
    // unit: px value
    /** Equivalent to 3px  */
    0.3: 3,
    /** Equivalent to 5px  */
    0.5: 5,
    /** Equivalent to 10px  */
    1: 10,
    /** Equivalent to 20px  */
    2: 20,
    /** Equivalent to 30px  */
    3: 30,
    /** Equivalent to 40px  */
    4: 40,
    /** Equivalent to 60px  */
    6: 60,
    /** Equivalent to 90px  */
    9: 90,
    /** Equivalent to 120px  */
    12: 120,
    /** Equivalent to 180px  */
    18: 180,
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
        fontSize: 8,
        lineHeight: 8,
      },
      /** Equivalent to 10px size / 14px line-height  */
      "1": {
        fontSize: 10,
        lineHeight: 14,
      },
      /** Equivalent to 12px size / 16px line-height  */
      "2": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 24px line-height  */
      "3": {
        fontSize: 14,
        lineHeight: 24,
      },
      /** Equivalent to 14px size / 20px line-height  */
      "3t": {
        fontSize: 14,
        lineHeight: 20,
      },
      /** Equivalent to 16px size / 26px line-height  */
      "4": {
        fontSize: 16,
        lineHeight: 26,
      },
      /** Equivalent to 16px size / 22px line-height  */
      "4t": {
        fontSize: 16,
        lineHeight: 22,
      },
      /** Equivalent to 18px size / 30px line-height  */
      "5": {
        fontSize: 18,
        lineHeight: 30,
      },
      /** Equivalent to 18px size / 26px line-height  */
      "5t": {
        fontSize: 18,
        lineHeight: 26,
      },
      /** Equivalent to 22px size / 30px line-height  */
      "6": {
        fontSize: 22,
        lineHeight: 30,
      },
      /** Equivalent to 28px size / 36px line-height  */
      "8": {
        fontSize: 28,
        lineHeight: 36,
      },
      /** Equivalent to 42px size / 50px line-height  */
      "10": {
        fontSize: 42,
        lineHeight: 50,
      },
      /** Equivalent to 60px size / 66px line-height  */
      "12": {
        fontSize: 60,
        lineHeight: 66,
      },
      /** Equivalent to 80px size / 84px line-height  */
      "14": {
        fontSize: 80,
        lineHeight: 84,
      },
      /** Equivalent to 100px size / 104px line-height  */
      "16": {
        fontSize: 100,
        lineHeight: 104,
      },
    },

    /** Garamond  */
    serif: {
      /** Equivalent to 12px size / 16px line-height  */
      "1": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 18px line-height  */
      "2": {
        fontSize: 14,
        lineHeight: 18,
      },
      /** Equivalent to 16px size / 24px line-height  */
      "3": {
        fontSize: 16,
        lineHeight: 24,
      },
      /** Equivalent to 16px size / 20px line-height  */
      "3t": {
        fontSize: 16,
        lineHeight: 20,
      },
      /** Equivalent to 18px size / 26px line-height  */
      "4": {
        fontSize: 18,
        lineHeight: 26,
      },
      /** Equivalent to 18px size / 22px line-height  */
      "4t": {
        fontSize: 18,
        lineHeight: 22,
      },
      /** Equivalent to 22px size / 32px line-height  */
      "5": {
        fontSize: 22,
        lineHeight: 32,
      },
      /** Equivalent to 22px size / 28px line-height  */
      "5t": {
        fontSize: 22,
        lineHeight: 28,
      },
      /** Equivalent to 26px size / 32px line-height  */
      "6": {
        fontSize: 26,
        lineHeight: 32,
      },
      /** Equivalent to 32px size / 38px line-height  */
      "8": {
        fontSize: 32,
        lineHeight: 38,
      },
      /** Equivalent to 44px size / 50px line-height  */
      "10": {
        fontSize: 44,
        lineHeight: 50,
      },
      /** Equivalent to 60px size / 70px line-height  */
      "12": {
        fontSize: 60,
        lineHeight: 70,
      },
    },

    /** Avant Garde  */
    display: {
      /** Equivalent to 10px size / 12px line-height  */
      "2": {
        fontSize: 10,
        lineHeight: 12,
      },
      /** Equivalent to 12px size / 16px line-height  */
      "3t": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 18px line-height  */
      "4t": {
        fontSize: 14,
        lineHeight: 18,
      },
      /** Equivalent to 16px size / 20px line-height  */
      "5t": {
        fontSize: 16,
        lineHeight: 20,
      },
      /** Equivalent to 18px size / 22px line-height  */
      "6": {
        fontSize: 18,
        lineHeight: 22,
      },
      /** Equivalent to 22px size / 24px line-height  */
      "8": {
        fontSize: 22,
        lineHeight: 24,
      },
    },
  },
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme = props => {
  return (
    <ThemeProvider theme={themeProps}>
      <GridThemeProvider gridTheme={themeProps.grid}>
        {props.children}
      </GridThemeProvider>
    </ThemeProvider>
  )
}

/** All available px spacing maps */
export type SpacingUnit = keyof typeof themeProps["space"]
/** All available color keys */
export type Color = keyof typeof themeProps["colors"]
/** All available width breakpoint */
export type Breakpoint = keyof typeof breakpoints

/** All available type sizes */
export type TypeSizes = typeof themeProps.typeSizes
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
