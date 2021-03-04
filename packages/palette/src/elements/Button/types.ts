/** Names of button variants */
export const BUTTON_VARIANT_NAMES = [
  "primaryBlack",
  "primaryWhite",
  "secondaryGray",
  "secondaryOutline",
  "noOutline",
] as const

/** Name of treatments */
export type ButtonVariant = typeof BUTTON_VARIANT_NAMES[number]

/** Possible states that require styling */
export type ButtonState = "default" | "hover" | "focus" | "loading" | "disabled"

/** Buttons can be displayed "block" or "inline" (defaults to "block") */
export type ButtonMode = "block" | "inline"

/** Names of button sizes */
export const BUTTON_SIZE_NAMES = [
  "small",
  "medium",
  // DEPRECATED
  "large",
] as const

/** Available sizes */
export type ButtonSize = typeof BUTTON_SIZE_NAMES[number]
