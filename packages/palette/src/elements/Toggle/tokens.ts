import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const SWITCH_STATES = {
  selected: css`
    background-color: white;
    transform: translateX(19px);
  `,
  default: css`
    background-color: white;
  `,
} as const

export const TOGGLE_STATES = {
  default: css`
    background-color: ${themeGet("colors.black30")};
  `,
  selected: css`
    background-color: ${themeGet("colors.blue100")};
  `,
  focus: css`
    /* color: ${themeGet("colors.black100")}; */
  `,
  hover: css`
    cursor: pointer;
  `,
  disabled: css`
    pointer-events: none;
  `,
  error: css`
    /* color: ${themeGet("colors.red100")}; */
  `,
} as const
