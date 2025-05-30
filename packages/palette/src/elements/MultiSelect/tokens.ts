import { themeGet } from "@styled-system/theme-get"
import { css, ExecutionContext } from "styled-components"
import { State } from "../Select/types"

interface MultiSelectProps extends ExecutionContext {
  complete?: boolean
}

export const MULTISELECT_STATES: Record<State, any> = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.mono30")};

    & > label {
      color: ${themeGet("colors.mono60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.blue100")};
    text-decoration: underline;

    & > label {
      color: ${themeGet("colors.blue100")};
      transform: translateY(-250%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.mono60")};
    text-decoration: underline;

    & > label {
      color: ${themeGet("colors.blue100")};

      ${({ complete }: MultiSelectProps) =>
        !complete &&
        css`
          text-decoration: underline;
        `}
    }
  `,
  completed: css`
    border-color: ${themeGet("colors.mono60")};
    text-decoration: none;

    & > label {
      color: ${themeGet("colors.mono60")};
      transform: translateY(-250%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  disabled: css`
    color: ${themeGet("colors.mono30")};
    border-color: ${themeGet("colors.mono30")};
    text-decoration: none;

    & > label {
      color: ${themeGet("colors.mono30")};
      text-decoration: none;
    }
  `,
  error: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.red100")};

    & > label {
      color: ${themeGet("colors.red100")};
    }
  `,
}
