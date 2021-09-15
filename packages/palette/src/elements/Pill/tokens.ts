import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { DROP_SHADOW } from "../../helpers/shadow"
import { PillState, PillVariant } from "./Pill"

export const PILL_VARIANTS: Record<PillVariant, Record<PillState, any>> = {
  textRound: {
    default: css`
      border-radius: 15px;
      height: 30px;
      padding: 0 ${themeGet("space.1")};
    `,
    hover: css`
      background-color: transparent;
      border-color: transparent;
      box-shadow: ${DROP_SHADOW};
      color: ${themeGet("colors.brand")};
    `,
    focus: css`
      background-color: ${themeGet("colors.black5")};
      border-color: ${themeGet("colors.brand")};
    `,
    active: css`
      background-color: transparent;
      border-color: ${themeGet("colors.black60")};
    `,
  },
  textSquare: {
    default: css`
      height: 30px;
      padding: 0 ${themeGet("space.1")};
    `,
    hover: css`
      background-color: transparent;
      border-color: transparent;
      box-shadow: ${DROP_SHADOW};
      color: ${themeGet("colors.brand")};
    `,
    focus: css`
      background-color: ${themeGet("colors.black5")};
      border-color: ${themeGet("colors.brand")};
    `,
    active: css`
      background-color: transparent;
      border-color: ${themeGet("colors.black60")};
    `,
  },
  filter: {
    default: css`
      border-radius: 20px;
      height: 40px;
      padding: 0 ${themeGet("space.2")};
    `,
    hover: css`
      background-color: transparent;
      border-color: transparent;
      box-shadow: ${DROP_SHADOW};
    `,
    focus: css`
      background-color: ${themeGet("colors.black5")};
      border-color: ${themeGet("colors.brand")};
    `,
    active: css`
      background-color: transparent;
      border-color: ${themeGet("colors.black60")};
    `,
  },
  artist: {
    default: css`
      border-radius: 25px;
      height: 50px;
      padding: 0 ${themeGet("space.2")} 0 ${themeGet("space.1")};
    `,
    hover: css`
      background-color: transparent;
      border-color: transparent;
      box-shadow: ${DROP_SHADOW};
    `,
    focus: css`
      background-color: ${themeGet("colors.black5")};
      border-color: ${themeGet("colors.brand")};
    `,
    active: css``, // Not used
  },
}
