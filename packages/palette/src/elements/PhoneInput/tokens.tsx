import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const PHONE_INPUT_STATES = {
  default: css`
    > div {
      border-color: ${themeGet("colors.mono30")};
    }

    > input {
      border-color: ${themeGet("colors.mono30")};
      outline: none;
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.mono60")};
    }
  `,
  active: css`
    > div,
    > button,
    > input {
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono100")};
    }

    > input::placeholder {
      color: ${themeGet("colors.mono100")};
    }

    > label {
      color: ${themeGet("colors.blue100")};
    }
  `,
  focus: css`
    > div,
    > button,
    > input {
      border-color: ${themeGet("colors.blue100")};
    }

    > input::placeholder {
      color: ${themeGet("colors.mono60")};
    }

    > label {
      color: ${themeGet("colors.blue100")};
    }
  `,
  hover: css`
    > div,
    > button,
    > input {
      border-color: ${themeGet("colors.mono60")};
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.mono60")};
    }
  `,
  completed: css`
    > div,
    > button,
    > input {
      border-color: ${themeGet("colors.mono60")};
      color: ${themeGet("colors.mono100")};
    }

    > label {
      color: ${themeGet("colors.mono60")};
    }
  `,
  disabled: css`
    > div,
    > input {
      cursor: default;
      background-color: transparent;
      border-color: ${themeGet("colors.mono30")};
    }

    > input::placeholder,
    > label {
      color: ${themeGet("colors.mono30")};
    }
  `,
  error: css`
    > div,
    > button,
    > input {
      border-color: ${themeGet("colors.red100")};
    }

    > label {
      color: ${themeGet("colors.red100")};
    }
  `,
}
