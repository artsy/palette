import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State, Variant } from "./types"

export const SELECT_VARIANTS: Record<Variant, Record<State, any>> = {
  default: {
    default: css`
      height: 40px;
      font-size: ${themeGet("fontSizes.size2")};
      color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.black10")};
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
    `,
    error: css`
      border-color: ${themeGet("colors.red100")};
    `,
  },
  inline: {
    default: css`
      height: 26px;
      font-weight: bold;
      font-size: ${themeGet("fontSizes.size1")};
      color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.black10")};
      background-color: ${themeGet("colors.black10")};
      border-radius: 2px;
    `,
    focus: css`
      outline: 0;
      border-color: ${themeGet("colors.black30")};
      background-color: ${themeGet("colors.black30")};
    `,
    hover: css`
      border-color: ${themeGet("colors.black30")};
      background-color: ${themeGet("colors.black30")};
    `,
    disabled: css`
      color: ${themeGet("colors.black60")};
      border-color: ${themeGet("colors.black10")};
      background-color: ${themeGet("colors.black10")};
    `,
    error: css`
      color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.red10")};
      background-color: ${themeGet("colors.red10")};
    `,
  },
}
