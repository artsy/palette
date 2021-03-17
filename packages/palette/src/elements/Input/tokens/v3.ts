import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const INPUT_STATES: Record<State, any> = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};
  `,
  focus: css`
    border-color: ${themeGet("colors.black60")};
  `,
  hover: css`
    border-color: ${themeGet("colors.black60")};
  `,
  disabled: css`
    color: ${themeGet("colors.black60")};
    border-color: ${themeGet("colors.black10")};
  `,
  error: css`
    border-color: ${themeGet("colors.red100")};
  `,
}
