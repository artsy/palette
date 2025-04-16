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
    background-color: ${themeGet("colors.mono30")};
  `,
  selected: css`
    background-color: ${themeGet("colors.blue100")};
  `,
  hover: css`
    cursor: pointer;
  `,
  disabled: {
    default: css`
      background-color: ${themeGet("colors.mono10")};
      pointer-events: none;
    `,
    selected: css`
      background-color: ${themeGet("colors.blue10")};
      pointer-events: none;
    `,
  },
} as const
