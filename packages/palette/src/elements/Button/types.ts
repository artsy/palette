/** Names of button variants */
export const BUTTON_VARIANT_NAMES = [
  "primaryBlack",
  "primaryWhite",
  "primaryBlue",
  "primaryGray",
  "secondaryBlack",
  "secondaryBlue",
  "secondaryWhite",
  "secondaryNeutral",
  "tertiary",
] as const

/** Name of treatments */
export type ButtonVariant = typeof BUTTON_VARIANT_NAMES[number]

export const BUTTON_STATES = [
  "default",
  "hover",
  "focus",
  "active",
  "loading",
  "disabled",
  "success",
] as const

/** Possible states that require styling */
export type ButtonState = typeof BUTTON_STATES[number]

/** Names of button sizes */
export const BUTTON_SIZE_NAMES = ["small", "large"] as const

/** Available sizes */
export type ButtonSize = typeof BUTTON_SIZE_NAMES[number]
