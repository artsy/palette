import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const PHONE_INPUT_STATES = {
  focus: css`
    > div,
    > input {
      border-color: ${themeGet("colors.blue100")};
    }

    > input::placeholder {
      color: ${themeGet("colors.black60")};
    }

    > label {
      color: ${themeGet("colors.blue100")};
    }
  `,
  hover: css`
    > div,
    > input {
      border-color: ${themeGet("colors.black100")};
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.black100")};
    }
  `,
  completed: css`
    > div,
    > input {
      border-color: ${themeGet("colors.black60")};
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.black60")};
    }
  `,
  disabled: css`
    > div,
    > input {
      cursor: default;
      background-color: transparent;
      border-color: ${themeGet("colors.black30")};
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.black30")};
    }
  `,
  error: css`
    > div,
    > input {
      border-color: ${themeGet("colors.red100")};
    }

    > label {
      color: ${themeGet("colors.red100")};
    }
  `,
}
