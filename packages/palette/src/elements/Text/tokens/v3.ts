import { TEXT_FONTS, TextTreatment } from "./v2"

export const V3_TEXT_FONTS = { sans: TEXT_FONTS.sans }

export const V3_TEXT_TREATMENTS = ["xxl", "xl", "lg", "md", "sm", "xs"] as const

export const V3_TEXT_VARIANTS: Record<
  typeof V3_TEXT_TREATMENTS[number],
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
export type V3TextVariant = keyof typeof V3_TEXT_VARIANTS
