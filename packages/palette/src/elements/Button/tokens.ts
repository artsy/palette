import { themeProps } from "../../Theme"

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
