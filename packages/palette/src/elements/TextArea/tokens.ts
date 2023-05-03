import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const TEXTAREA_STATES: Record<State, any> = {
  default: css`
    min-height: ${themeGet("space.12")};
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    line-height: ${themeGet("textVariants.sm.lineHeight")};
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
    }
  `,
  completed: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};

    & + label {
      color: ${themeGet("colors.black60")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    background-color: transparent;

    ::placeholder {
      color: ${themeGet("colors.black30")};
      opacity: 1;
    }

    &:not(:placeholder-shown) + label {
      color: ${themeGet("colors.black30")};
      transform: translateY(-150%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
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
    }
  `,
}
