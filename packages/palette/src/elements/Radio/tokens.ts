import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const RADIO_DOT_STATES = {
  default: {
    resting: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black30")};
    `,
    selected: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black100")};
      background-color: ${themeGet("colors.black100")};
    `,
  },
  focus: {
    resting: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black100")};
    `,
    selected: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black100")};
      background-color: ${themeGet("colors.black100")};
    `,
  },
  disabled: {
    resting: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black30")};
    `,
    selected: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.black30")};
      background-color: ${themeGet("colors.black30")};
    `,
  },
  error: {
    resting: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.red100")};
    `,
    selected: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.red100")};
      background-color: ${themeGet("colors.red100")};
    `,
  },
  hover: {
    resting: css`
      border: 1px solid;
      color: transparent;
      border-color: ${themeGet("colors.blue100")};
      background-color: ${themeGet("colors.white100")};
    `,
    selected: css`
      border: 1px solid;
      color: ${themeGet("colors.white100")};
      border-color: ${themeGet("colors.blue100")};
      background-color: ${themeGet("colors.blue100")};
    `,
  },
}

export const RADIO_STATES = {
  default: css`
    color: ${themeGet("colors.black60")};
  `,
  focus: css`
    color: ${themeGet("colors.black100")};

    /* Label */
    > div > div:first-of-type {
      text-decoration: underline;
    }
  `,
  selected: css`
    color: ${themeGet("colors.black100")};
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};

    /* Label */
    > div > div:first-of-type {
      text-decoration: underline;
    }
  `,
  disabled: css`
    pointer-events: none;
    color: ${themeGet("colors.black30")};
  `,
  error: css`
    color: ${themeGet("colors.red100")};
  `,
} as const
