import { themeProps } from "../../Theme"
import { BoxProps } from "../Box"
import { SansProps } from "../Typography"

/** Available color themes */
export const BUTTON_VARIANTS = {
  primaryBlack: {
    backgroundColor: "black100",
    borderColor: "black100",
    color: "white100",
    [`@media ${themeProps.mediaQueries.hover}`]: {
      "&:hover": {
        backgroundColor: "purple100",
        borderColor: "purple100",
        color: "white100",
      },
    },
  },
  primaryWhite: {
    backgroundColor: "white100",
    borderColor: "white100",
    color: "black100",
    [`@media ${themeProps.mediaQueries.hover}`]: {
      "&:hover": {
        backgroundColor: "purple100",
        borderColor: "purple100",
        color: "white100",
      },
    },
  },
  secondaryGray: {
    backgroundColor: "black10",
    borderColor: "black10",
    color: "black100",
    [`@media ${themeProps.mediaQueries.hover}`]: {
      "&:hover": {
        backgroundColor: "black30",
        borderColor: "black30",
        color: "black100",
      },
    },
  },
  secondaryOutline: {
    backgroundColor: "white100",
    borderColor: "black10",
    color: "black100",
    [`@media ${themeProps.mediaQueries.hover}`]: {
      "&:hover": {
        backgroundColor: "white100",
        borderColor: "black100",
        color: "black100",
      },
    },
  },
  noOutline: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "black100",
  },
}

/** Name of color theme */
export type ButtonVariant = keyof typeof BUTTON_VARIANTS

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
