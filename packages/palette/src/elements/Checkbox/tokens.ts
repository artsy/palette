import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const CHECK_STATES = {
  default: {
    resting: css`
      background-color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black30")};
      color: ${themeGet("colors.white100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.black100")};
      color: ${themeGet("colors.white100")};
    `,
  },
  disabled: {
    resting: css`
      background-color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black30")};
      color: ${themeGet("colors.white100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.black30")};
      border-color: ${themeGet("colors.black30")};
      color: ${themeGet("colors.white100")};
    `,
  },
  hover: {
    resting: css`
      background-color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.white100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.blue100")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.white100")};
    `,
  },
  focus: {
    resting: css`
      background-color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black100")};
      color: ${themeGet("colors.white100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.black100")};
      color: ${themeGet("colors.white100")};
    `,
  },
  error: {
    resting: css`
      background-color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.red100")};
      color: ${themeGet("colors.white100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.red100")};
      border-color: ${themeGet("colors.red100")};
      color: ${themeGet("colors.white100")};
    `,
  },
} as const

export const CHECKBOX_STATES = {
  default: css`
    color: ${themeGet("colors.black60")};
  `,
  selected: css`
    color: ${themeGet("colors.black100")};
  `,
  focus: css`
    text-decoration: underline;
    color: ${themeGet("colors.black100")};
  `,
  hover: css`
    text-decoration: underline;
    color: ${themeGet("colors.blue100")};
  `,
  disabled: css`
    pointer-events: none;
    color: ${themeGet("colors.black30")};
  `,
  error: css`
    color: ${themeGet("colors.red100")};
  `,
} as const
