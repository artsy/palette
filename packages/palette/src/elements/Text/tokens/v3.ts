import { TextTreatment } from "./types"

/** Available fonts */
export const TEXT_FONTS = { sans: '"ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif', }

/** Available text variant names */
export const TEXT_VARIANT_NAMES = ["xxl", "xl", "lg", "md", "sm", "xs"] as const

/** Available text variants */
export const TEXT_VARIANTS: Record<
  typeof TEXT_VARIANT_NAMES[number],
  TextTreatment
> = {
  xxl: {
    fontSize: "50px",
    lineHeight: "54px",
    letterSpacing: "-0.02em",
  },
  xl: {
    fontSize: "34px",
    lineHeight: "38px",
    letterSpacing: "-0.02em",
  },
  lg: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "-0.02em",
  },
  md: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  sm: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  xs: {
    fontSize: "13px",
    lineHeight: "18px",
  },
}

/** Name of typographic treatment */
export type TextVariant = keyof typeof TEXT_VARIANTS
