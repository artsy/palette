import { BUTTON_STATES, BUTTON_VARIANT_NAMES } from "./types"
import { TextProps } from "../Text"
import { ButtonSize, ButtonState, ButtonVariant } from "./types"

const DEFAULT_PRIMARY_STATES = {
  focus: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "white100",
    textDecoration: "underline",
  },
  hover: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "white100",
    textDecoration: "underline",
  },
  active: {
    backgroundColor: "blue150",
    borderColor: "blue150",
    color: "white100",
    textDecoration: "underline",
  },
  loading: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "white100",
  },
  disabled: {
    backgroundColor: "black30",
    borderColor: "black30",
    color: "white100",
  },
  success: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "white100",
  },
}

const DEFAULT_SECONDARY_STATES = {
  ...DEFAULT_PRIMARY_STATES,
  disabled: {
    backgroundColor: "transparent",
    borderColor: "black30",
    color: "black30",
  },
}

export const BUTTON_STYLES: Record<ButtonVariant, Record<ButtonState, any>> = {
  primaryBlack: {
    default: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  primaryWhite: {
    default: {
      backgroundColor: "white100",
      borderColor: "white100",
      color: "black100",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  primaryBlue: {
    default: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "white100",
    },
    ...DEFAULT_PRIMARY_STATES,
    focus: {
      backgroundColor: "blue150",
      borderColor: "blue150",
      color: "white100",
      textDecoration: "underline",
    },
    hover: {
      backgroundColor: "blue150",
      borderColor: "blue150",
      color: "white100",
      textDecoration: "underline",
    },
    active: {
      backgroundColor: "#050e3e", // Unique color to this state
      borderColor: "#050e3e", // Unique color to this state
      color: "white100",
      textDecoration: "underline",
    },
  },

  primaryGray: {
    default: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  secondaryBlack: {
    default: {
      backgroundColor: "transparent",
      borderColor: "black100",
      color: "black100",
    },
    ...DEFAULT_SECONDARY_STATES,
  },

  secondaryBlue: {
    default: {
      backgroundColor: "transparent",
      borderColor: "blue100",
      color: "blue100",
    },
    ...DEFAULT_SECONDARY_STATES,
  },

  secondaryWhite: {
    default: {
      backgroundColor: "transparent",
      borderColor: "white100",
      color: "white100",
    },
    ...DEFAULT_SECONDARY_STATES,
  },

  /** Used for follow buttons */
  secondaryNeutral: {
    default: {
      backgroundColor: "transparent",
      borderColor: "black100",
      color: "black100",
    },
    ...DEFAULT_SECONDARY_STATES,
    focus: {
      backgroundColor: "black10",
      borderColor: "black10",
      color: "black100",
      textDecoration: "underline",
    },
    hover: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
      textDecoration: "underline",
    },
    active: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
      textDecoration: "underline",
    },
    loading: {
      backgroundColor: "black100",
      borderColor: "black100",
      color: "white100",
    },
    success: {
      backgroundColor: "transparent",
      borderColor: "black100",
      color: "black100",
    },
  },

  tertiary: {
    default: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black100",
    },
    focus: {
      backgroundColor: "blue10",
      borderColor: "blue10",
      color: "blue100",
      textDecoration: "underline",
    },
    hover: {
      backgroundColor: "blue10",
      borderColor: "blue10",
      color: "blue100",
      textDecoration: "underline",
    },
    active: {
      backgroundColor: "#cacdec", // Unique color to this state
      borderColor: "#cacdec", // Unique color to this state
      color: "blue100",
      textDecoration: "underline",
    },
    loading: {
      backgroundColor: "blue10",
      borderColor: "blue10",
      color: "blue100",
    },
    disabled: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "black30",
    },
    success: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "blue100",
    },
  },
}

type ButtonVariants = Record<ButtonState, Record<ButtonVariant, any>>

/** Inverts the structure of the style object so that we can use responsive values for `variant` */
export const BUTTON_VARIANTS: ButtonVariants = BUTTON_STATES.reduce(
  (variantsMemo, state) => {
    return {
      ...variantsMemo,
      [state]: BUTTON_VARIANT_NAMES.reduce((stateMemo, variant) => {
        return {
          ...stateMemo,
          [variant]: BUTTON_STYLES[variant][state],
        }
      }, {}),
    }
  },
  {} as ButtonVariants
)

/** Available button sizes */
export const BUTTON_SIZES = {
  small: {
    height: "30px",
    borderRadius: "15px",
    px: "25px",
  },
  large: {
    height: "50px",
    borderRadius: "25px",
    px: "25px",
  },
} as const

/** Text sizes associated with available button sizes */
export const BUTTON_TEXT_SIZES: Record<ButtonSize, TextProps["variant"]> = {
  small: "xs",
  large: "sm-display",
}
