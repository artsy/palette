import { themeGet } from "@styled-system/theme-get"
import { css, ExecutionContext } from "styled-components"
import { State } from "./types"

interface SelectProps extends ExecutionContext {
  optionSelected?: boolean
  disabled?: boolean
}

export const SELECT_STATES: Record<State, any> = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.mono30")};

    + label {
      color: ${themeGet("colors.mono60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    // Firefox polyfill for :has
    ${({ optionSelected }: SelectProps) =>
      optionSelected &&
      css`
        + label {
          transform: translateY(-150%);
          font-size: ${themeGet("textVariants.xs.fontSize")};

          & > span {
            height: 2px;
            top: 50%;
          }
        }
      `}
  `,
  focus: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.blue100")};
    text-decoration: underline;

    + label {
      color: ${themeGet("colors.blue100")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    &:has(option[value=""]:checked) + label {
      text-decoration: underline;
    }

    // Firefox polyfill for :has
    ${({ optionSelected }: SelectProps) =>
      !optionSelected &&
      css`
        + label {
          text-decoration: underline;
        }
      `}
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.mono60")};
    text-decoration: underline;

    + label {
      color: ${themeGet("colors.mono60")};
    }

    &:has(option[value=""]:checked):not(:disabled) + label {
      color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    }

    // Firefox polyfill for :has
    ${({ optionSelected, disabled }: SelectProps) =>
      !optionSelected &&
      !disabled &&
      css`
        + label {
          color: ${themeGet("colors.blue100")};
          text-decoration: underline;
        }
      `}
  `,
  completed: css`
    border-color: ${themeGet("colors.mono60")};
    text-decoration: none;

    + label {
      color: ${themeGet("colors.mono60")};
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    // Firefox polyfill for :has
    ${({ optionSelected }: SelectProps) =>
      optionSelected &&
      css`
        + label {
          transform: translateY(-150%);
          font-size: ${themeGet("textVariants.xs.fontSize")};

          & > span {
            height: 2px;
            top: 50%;
          }
        }
      `}
  `,
  disabled: css`
    color: ${themeGet("colors.mono30")};
    border-color: ${themeGet("colors.mono30")};
    text-decoration: none;

    + label {
      color: ${themeGet("colors.mono30")};
      text-decoration: none;
    }

    &:not(:has(option[value=""]:checked)) + label {
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    // Firefox polyfill for :has
    ${({ optionSelected }: SelectProps) =>
      optionSelected &&
      css`
        + label {
          transform: translateY(-150%);
          font-size: ${themeGet("textVariants.xs.fontSize")};

          & > span {
            height: 2px;
            top: 50%;
          }
        }
      `}
  `,
  error: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.red100")};

    + label {
      color: ${themeGet("colors.red100")};
    }
  `,
}
