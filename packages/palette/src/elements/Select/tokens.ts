import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const SELECT_STATES = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  focus: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.black60")};
    text-decoration: underline;
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.black60")};
    text-decoration: underline;
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    text-decoration: none;
  `,
  error: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.red100")};
  `,
}
