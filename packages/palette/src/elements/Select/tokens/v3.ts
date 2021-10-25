import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State, Variant } from "./types"

const DEFAULT_SELECT_VARIANT = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  hover: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black10")};
  `,
  error: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.red100")};
  `,
}

export const SELECT_VARIANTS: Record<Variant, Record<State, any>> = {
  default: DEFAULT_SELECT_VARIANT,
  inline: DEFAULT_SELECT_VARIANT,
}
