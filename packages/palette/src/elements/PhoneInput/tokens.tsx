import { themeGet } from "@styled-system/theme-get"
import { css } from "styled-components"

export const PHONE_INPUT_STATES = {
  focus: css`
    > div,
    > input {
      border-color: ${themeGet("colors.blue100")};
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

    > label {
      color: ${themeGet("colors.black100")};
    }
  `,
  completed: css`
    > div,
    > input {
      border-color: ${themeGet("colors.black60")};
    }

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

    > input::placeholder {
      color: ${themeGet("colors.black30")};
    }

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

// export const INPUT_STATES = {
//   default: css`
//     font-size: ${themeGet("textVariants.sm-display.fontSize")};
//     color: ${themeGet("colors.black100")};
//     border-color: ${themeGet("colors.black30")};

//     ::placeholder {
//       color: ${themeGet("colors.black60")};
//     }

//     & + label {
//       color: ${themeGet("colors.black60")};
//       font-size: ${themeGet("textVariants.sm-display.fontSize")};
//     }
//   `,
//   focus: css`
//     color: ${themeGet("colors.black100")};
//     border-color: ${themeGet("colors.blue100")};

//     ::placeholder {
//       color: ${themeGet("colors.black60")};
//       opacity: 1;
//     }

//     & + label {
//       color: ${themeGet("colors.blue100")};
//       // scale(0.8125) is the result of font size xs / sm-display (13/16)
//       transform: translate(-5px, -150%) scale(0.8125);
//       padding: 0 5px;
//     }
//   `,
//   hover: css`
//     color: ${themeGet("colors.black100")};
//     border-color: ${themeGet("colors.black60")};

//     ::placeholder {
//       color: ${themeGet("colors.black100")};
//     }

//     & + label {
//       color: ${themeGet("colors.black100")};
//     }
//   `,
//   active: css`
//     color: ${themeGet("colors.black100")};
//     border-color: ${themeGet("colors.blue100")};

//     ::placeholder {
//       color: ${themeGet("colors.black100")};
//     }

//     & + label {
//       color: ${themeGet("colors.blue100")};
//       transform: translate(-5px, -150%) scale(0.8125);
//       padding: 0 5px;
//     }
//   `,
//   completed: css`
//     color: ${themeGet("colors.black100")};
//     border-color: ${themeGet("colors.black60")};

//     & + label {
//       color: ${themeGet("colors.blue60")};
//       transform: translate(-5px, -150%) scale(0.8125);
//       padding: 0 5px;
//     }
//   `,
//   disabled: css`
//     color: ${themeGet("colors.black30")};
//     border-color: ${themeGet("colors.black30")};
//     background-color: transparent;

//     ::placeholder {
//       color: ${themeGet("colors.black30")};
//     }

//     &:not(:placeholder-shown) + label {
//       color: ${themeGet("colors.black30")};
//       transform: translate(-5px, -150%) scale(0.8125);
//     }

//     &:placeholder-shown + label {
//       color: ${themeGet("colors.black30")};
//     }
//   `,
//   error: css`
//     border-color: ${themeGet("colors.red100")};

//     & + label {
//       color: ${themeGet("colors.red100")};
//       transform: translate(-5px, -150%) scale(0.8125);
//       padding: 0 5px;
//     }
//   `,
// }
