import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const TEXTAREA_STATES: Record<State, any> = {
  default: css`
    height: ${themeGet("space.9")};
    font-size: ${themeGet("fontSizes.size3")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black10")};
    background-color: ${themeGet("colors.white100")};
  `,
  focus: css`
    border-color: ${themeGet("colors.purple100")};
  `,
  hover: css`
    border-color: ${themeGet("colors.black60")};
  `,
  disabled: css`
    color: ${themeGet("colors.black60")};
    border-color: ${themeGet("colors.black10")};
    background-color: ${themeGet("colors.black5")};
  `,
  error: css`
    border-color: ${themeGet("colors.red100")};
  `,
}
