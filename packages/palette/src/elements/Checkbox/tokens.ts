import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const CHECK_STATES = {
  default: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.mono30")};
      color: ${themeGet("colors.mono0")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono100")};
      border-color: ${themeGet("colors.mono100")};
      color: ${themeGet("colors.mono0")};
    `,
  },
  disabled: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.mono30")};
      color: ${themeGet("colors.mono0")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono30")};
      border-color: ${themeGet("colors.mono30")};
      color: ${themeGet("colors.mono0")};
    `,
  },
  hover: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono0")};
    `,
    selected: css`
      background-color: ${themeGet("colors.blue100")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono0")};
    `,
  },
  focus: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.mono100")};
      color: ${themeGet("colors.mono0")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono100")};
      border-color: ${themeGet("colors.mono100")};
      color: ${themeGet("colors.mono0")};
    `,
  },
  error: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.red100")};
      color: ${themeGet("colors.mono0")};
    `,
    selected: css`
      background-color: ${themeGet("colors.red100")};
      border-color: ${themeGet("colors.red100")};
      color: ${themeGet("colors.mono0")};
    `,
  },
} as const

export const CHECKBOX_STATES = {
  default: css`
    color: ${themeGet("colors.mono60")};
  `,
  selected: css`
    color: ${themeGet("colors.mono100")};
  `,
  focus: css`
    text-decoration: underline;
    color: ${themeGet("colors.mono100")};
  `,
  hover: css`
    text-decoration: underline;
    color: ${themeGet("colors.blue100")};
  `,
  disabled: css`
    pointer-events: none;
    color: ${themeGet("colors.mono30")};
  `,
  error: css`
    color: ${themeGet("colors.red100")};
  `,
} as const
