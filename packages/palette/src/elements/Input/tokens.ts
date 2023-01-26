import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"
import { State } from "./types"

export const INPUT_STATES: Record<State, any> = {
  default: css`
    font-size: ${themeGet("textVariants.sm.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};

    ::placeholder {
      color: ${themeGet("colors.black60")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.black60")};
    }
  `,
  hover: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};

    ::placeholder {
      color: ${themeGet("colors.black100")};
    }
  `,
  active: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};

    ::placeholder {
      color: ${themeGet("colors.black100")};
    }
  `,
  completed: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    background-color: transparent;

    ::placeholder {
      color: ${themeGet("colors.black30")};
    }
  `,
  error: css`
    border-color: ${themeGet("colors.red100")};
  `,
}
