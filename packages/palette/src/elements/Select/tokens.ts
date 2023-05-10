import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const SELECT_STATES: Record<State, any> = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};

    + label {
      color: ${themeGet("colors.black60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};
    text-decoration: underline;

    + label {
      color: ${themeGet("colors.blue100")};
    }

    &:has(option[value=""]:checked) + label {
      text-decoration: underline;
    }
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.black60")};
    text-decoration: underline;

    + label {
      color: ${themeGet("colors.black60")};
    }

    &:has(option[value=""]:checked):not(:disabled) + label {
      color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    }
  `,
  completed: css`
    border-color: ${themeGet("colors.black60")};
    text-decoration: none;

    + label {
      color: ${themeGet("colors.black60")};
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    text-decoration: none;

    + label {
      color: ${themeGet("colors.black30")};
      text-decoration: none;
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  error: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.red100")};

    + label {
      color: ${themeGet("colors.red100")};
    }
  `,
}
