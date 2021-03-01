import { BoxProps } from "../../Box"
import { SansProps } from "../../Typography"

/** Names of button treatments */
export const BUTTON_TREATMENTS = [
  "primaryBlack",
  "primaryWhite",
  "secondaryGray",
  "secondaryOutline",
  "noOutline",
]

/** Name of treatments */
export type ButtonVariant = typeof BUTTON_TREATMENTS[number]

/** Possible states that require styling */
export type ButtonState = "default" | "hover" | "focus" | "loading" | "disabled"

/** Available variants */
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
      backgroundColor: "white100",
      borderColor: "black10",
      color: "black100",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
  },
  focus: {
    primaryBlack: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
      textDecoration: "underline",
    },
    primaryWhite: {
      backgroundColor: "white100",
      borderColor: "white100",
      color: "black100",
      textDecoration: "underline",
    },
    secondaryGray: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
      textDecoration: "underline",
    },
    secondaryOutline: {
      backgroundColor: "white100",
      borderColor: "black10",
      color: "black100",
      textDecoration: "underline",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
      textDecoration: "underline",
    },
  },
  hover: {
    primaryBlack: {
      backgroundColor: "purple100",
      borderColor: "purple100",
      color: "white100",
    },
    primaryWhite: {
      backgroundColor: "purple100",
      borderColor: "purple100",
      color: "white100",
    },
    secondaryGray: {
      backgroundColor: "black30",
      borderColor: "black30",
      color: "black100",
    },
    secondaryOutline: {
      backgroundColor: "white100",
      borderColor: "black100",
      color: "black100",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
  },
  loading: {
    primaryBlack: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
    primaryWhite: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
    secondaryGray: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
    secondaryOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
    noOutline: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
  },
  disabled: {
    primaryBlack: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "white100",
    },
    primaryWhite: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "white100",
    },
    secondaryGray: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "white100",
    },
    secondaryOutline: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "white100",
    },
    noOutline: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "white100",
    },
  },
}

/** Buttons can be displayed "block" or "inline" (defaults to "block") */
export type ButtonMode = "block" | "inline"

/** Available sizes */
export type ButtonSize = "small" | "medium" | "large"

/** Styles associated with available sizes */
export const BUTTON_SIZES: {
  [K in ButtonMode]: Record<ButtonSize, BoxProps>
} = {
  block: {
    small: {
      height: "26px",
      px: 1.5,
    },
    medium: {
      height: "41px",
      px: 2,
    },
    large: {
      height: "50px",
      px: 3,
    },
  },
  inline: {
    small: {
      height: "17px",
      px: 0,
    },
    medium: {
      height: "21px",
      px: 0,
    },
    large: {
      height: "21px",
      px: 0,
    },
  },
}

/** Text sizes associated with available button sizes */
export const BUTTON_TEXT_SIZES: { [K in ButtonSize]: SansProps["size"] } = {
  small: "2",
  medium: "3t",
  large: "3t",
}
