import { TextProps } from "../../Text"
import { ButtonSize, ButtonState, ButtonVariant } from "../types"

/** Available button variants */
export const BUTTON_VARIANTS: Record<
  ButtonState,
  Record<ButtonVariant, any>
> = {
  default: {
    primaryBlack: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
    },
    primaryWhite: {
      backgroundColor: "white100",
      borderColor: "white100",
      color: "black100",
    },
    secondaryGray: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
    },
    secondaryOutline: {
      backgroundColor: "transparent",
      borderColor: "black10",
      color: "black100",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
  },
  hover: {
    primaryBlack: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    primaryWhite: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    secondaryGray: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    secondaryOutline: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    noOutline: {
      backgroundColor: "blue10",
      borderColor: "blue10",
      color: "blue100",
      textDecoration: "underline",
    },
  },
  focus: {
    primaryBlack: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
      boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    },
    primaryWhite: {
      backgroundColor: "white100",
      borderColor: "white100",
      color: "black100",
      boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    },
    secondaryGray: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
      boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    },
    secondaryOutline: {
      backgroundColor: "transparent",
      borderColor: "black100",
      color: "black100",
    },
    noOutline: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
    },
  },
  loading: {
    primaryBlack: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    primaryWhite: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    secondaryGray: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    secondaryOutline: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
      textDecoration: "underline",
    },
    noOutline: {
      backgroundColor: "blue10",
      borderColor: "blue10",
      color: "blue100",
      textDecoration: "underline",
    },
  },
  disabled: {
    primaryBlack: {
      backgroundColor: "black30",
      borderColor: "black30",
      color: "white100",
    },
    primaryWhite: {
      backgroundColor: "black30",
      borderColor: "black30",
      color: "white100",
    },
    secondaryGray: {
      backgroundColor: "black30",
      borderColor: "black30",
      color: "white100",
    },
    secondaryOutline: {
      backgroundColor: "transparent",
      borderColor: "black30",
      color: "black30",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black30",
    },
  },
}

/** Available button sizes */
export const BUTTON_SIZES = {
  small: {
    height: "30px",
    borderRadius: "15px",
    px: 2,
  },
  medium: {
    height: "50px",
    borderRadius: "25px",
    px: 4,
  },
} as const

/** Text sizes associated with available button sizes */
export const BUTTON_TEXT_SIZES: Record<ButtonSize, TextProps["variant"]> = {
  small: "xs",
  medium: "sm",
  large: "sm",
}
