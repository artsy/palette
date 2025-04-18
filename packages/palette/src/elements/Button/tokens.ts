import { BUTTON_STATES, BUTTON_VARIANT_NAMES } from "./types"
import { TextProps } from "../Text"
import { ButtonSize, ButtonState, ButtonVariant } from "./types"

const DEFAULT_PRIMARY_STATES = {
  focus: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "mono0",
    textDecoration: "underline",
  },
  hover: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "mono0",
    textDecoration: "underline",
  },
  active: {
    backgroundColor: "blue150",
    borderColor: "blue150",
    color: "mono0",
    textDecoration: "underline",
  },
  loading: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "mono0",
  },
  disabled: {
    backgroundColor: "mono30",
    borderColor: "mono30",
    color: "mono0",
  },
  success: {
    backgroundColor: "blue100",
    borderColor: "blue100",
    color: "mono0",
  },
}

const DEFAULT_SECONDARY_STATES = {
  ...DEFAULT_PRIMARY_STATES,
  disabled: {
    backgroundColor: "transparent",
    borderColor: "mono30",
    color: "mono30",
  },
}

export const BUTTON_STYLES: Record<ButtonVariant, Record<ButtonState, any>> = {
  primaryBlack: {
    default: {
      backgroundColor: "mono100",
      borderColor: "mono100",
      color: "mono0",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  primaryWhite: {
    default: {
      backgroundColor: "mono0",
      borderColor: "mono0",
      color: "mono100",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  primaryBlue: {
    default: {
      backgroundColor: "blue100",
      borderColor: "blue100",
      color: "mono0",
    },
    ...DEFAULT_PRIMARY_STATES,
    focus: {
      backgroundColor: "blue150",
      borderColor: "blue150",
      color: "mono0",
      textDecoration: "underline",
    },
    hover: {
      backgroundColor: "blue150",
      borderColor: "blue150",
      color: "mono0",
      textDecoration: "underline",
    },
    active: {
      backgroundColor: "blue200",
      borderColor: "blue200",
      color: "mono0",
      textDecoration: "underline",
    },
  },

  primaryGray: {
    default: {
      backgroundColor: "mono10",
      borderColor: "mono10",
      color: "mono100",
    },
    ...DEFAULT_PRIMARY_STATES,
  },

  secondaryBlack: {
    default: {
      backgroundColor: "transparent",
      borderColor: "mono100",
      color: "mono100",
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
      borderColor: "mono0",
      color: "mono0",
    },
    ...DEFAULT_SECONDARY_STATES,
  },

  /** Used for follow buttons */
  secondaryNeutral: {
    default: {
      backgroundColor: "transparent",
      borderColor: "mono100",
      color: "mono100",
    },
    ...DEFAULT_SECONDARY_STATES,
    focus: {
      backgroundColor: "mono10",
      borderColor: "mono10",
      color: "mono100",
      textDecoration: "underline",
    },
    hover: {
      backgroundColor: "mono100",
      borderColor: "mono100",
      color: "mono0",
      textDecoration: "underline",
    },
    active: {
      backgroundColor: "mono100",
      borderColor: "mono100",
      color: "mono0",
      textDecoration: "underline",
    },
    loading: {
      backgroundColor: "mono100",
      borderColor: "mono100",
      color: "mono0",
    },
    success: {
      backgroundColor: "transparent",
      borderColor: "mono100",
      color: "mono100",
    },
  },

  tertiary: {
    default: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "mono100",
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
      backgroundColor: "blue15",
      borderColor: "blue15",
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
      color: "mono30",
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
