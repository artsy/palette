import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const STATES = {
  default: css`
    height: 38px;
    color: ${themeGet("colors.black60")};
    border-bottom: 2px solid transparent;
  `,
  active: css`
    outline: 0;
    color: ${themeGet("colors.black100")};
    border-bottom-color: ${themeGet("colors.black100")};
  `,
  focus: css`
    color: ${themeGet("colors.purple100")};
  `,
  hover: css`
    color: ${themeGet("colors.black100")};
  `,
}
