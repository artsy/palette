import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const INPUT_STATES: Record<State, any> = {
  default: css`
    background-color: ${themeGet("colors.white100")};
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};

    ::placeholder {
      color: ${themeGet("colors.black60")};
    }

    & + label {
      color: ${themeGet("colors.black60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.black60")};
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
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};

    ::placeholder {
      color: ${themeGet("colors.black100")};
    }

    & + label {
      color: ${themeGet("colors.black100")};
    }
  `,
  active: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.black100")};
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
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};

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
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    background-color: transparent;
    /* For Safari: */
    -webkit-text-fill-color: ${themeGet("colors.black30")};
    /* For iOS */
    opacity: 1;

    ::placeholder {
      color: ${themeGet("colors.black30")};
    }

    &:not(:placeholder-shown) + label {
      color: ${themeGet("colors.black30")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};

      & > span {
        height: 2px;
        top: 50%;
      }
    }

    &:placeholder-shown + label {
      color: ${themeGet("colors.black30")};
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
