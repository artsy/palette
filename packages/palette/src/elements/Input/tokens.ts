import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const INPUT_STATES: Record<State, any> = {
  default: css`
    background-color: ${themeGet("colors.mono0")};
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.mono30")};

    ::placeholder {
      color: ${themeGet("colors.mono60")};
    }

    & + label {
      color: ${themeGet("colors.mono60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.mono60")};
      opacity: 1;
    }

    & + label {
      color: ${themeGet("colors.blue100")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
      padding: 0 5px;

      & > span {
        height: 2px;
        top: 50%;
      }
    }
  `,
  hover: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.mono60")};

    ::placeholder {
      color: ${themeGet("colors.mono100")};
    }

    & + label {
      color: ${themeGet("colors.mono100")};
    }
  `,
  active: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.mono100")};
    }

    & + label {
      color: ${themeGet("colors.blue100")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
      padding: 0 5px;

      & > span {
        height: 2px;
        top: 50%;
      }
    }
  `,
  completed: css`
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.mono60")};

    & + label {
      color: ${themeGet("colors.blue60")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
      padding: 0 5px;

      & > span {
        height: 2px;
        top: 50%;
      }
    }
  `,
  disabled: css`
    color: ${themeGet("colors.mono30")};
    border-color: ${themeGet("colors.mono30")};
    background-color: transparent;
    /* For Safari: */
    -webkit-text-fill-color: ${themeGet("colors.mono30")};
    /* For iOS */
    opacity: 1;

    ::placeholder {
      color: ${themeGet("colors.mono30")};
    }

    &:not(:placeholder-shown) + label {
      color: ${themeGet("colors.mono30")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    &:placeholder-shown + label {
      color: ${themeGet("colors.mono30")};
    }
  `,
  error: css`
    border-color: ${themeGet("colors.red100")};

    & + label {
      color: ${themeGet("colors.red100")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
      padding: 0 5px;

      & > span {
        height: 2px;
        top: 50%;
      }
    }
  `,
}
