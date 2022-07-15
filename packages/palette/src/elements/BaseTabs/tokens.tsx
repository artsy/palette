import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const STATES = {
  default: css`
    height: 40px;
    padding: 0 ${themeGet("space.2")};
    color: ${themeGet("colors.black60")};
    border-bottom: 1px solid transparent;
  `,
  active: css`
    outline: 0;
    color: ${themeGet("colors.black100")};
    border-bottom-color: ${themeGet("colors.black100")};

    &:hover {
      text-decoration: none !important;
      color: inherit !important;
    }
  `,
  focus: css`
    text-decoration: underline;
    color: ${themeGet("colors.black100")};
  `,
  hover: css`
    text-decoration: underline;
    color: ${themeGet("colors.blue100")};
  `,
}
