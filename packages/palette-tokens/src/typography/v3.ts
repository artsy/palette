export interface TextTreatment {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: "normal" | "bold";
}

/** Available fonts */
export const TEXT_FONTS = {
  sans: '"ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif',
};

/** Available text variant names */
export const TEXT_VARIANT_NAMES = [
  "xxxl",
  "xxl",
  "xl",
  "lg",
  "lg-display",
  "md",
  "sm",
  "sm-display",
  "xs",
  "bq",
] as const;

/** Available text variants */
export const TEXT_VARIANTS: Record<
  typeof TEXT_VARIANT_NAMES[number],
  TextTreatment
> = {
  xxxl: {
    fontSize: "102px",
    lineHeight: "108px",
    letterSpacing: "-0.01em",
  },
  xxl: {
    fontSize: "60px",
    lineHeight: "70px",
    letterSpacing: "-0.01em",
  },
  xl: {
    fontSize: "40px",
    lineHeight: "48px",
    letterSpacing: "-0.01em",
  },
  lg: {
    fontSize: "26px",
    lineHeight: "40px",
    letterSpacing: "-0.01em",
  },
  "lg-display": {
    fontSize: "26px",
    lineHeight: "32px",
    letterSpacing: "-0.01em",
  },
  md: {
    fontSize: "20px",
    lineHeight: "32px",
  },
  sm: {
    fontSize: "16px",
    lineHeight: "26px",
  },
  "sm-display": {
    fontSize: "16px",
    lineHeight: "20px",
  },
  xs: {
    fontSize: "13px",
    lineHeight: "20px",
  },
  bq: {
    fontSize: "50px",
    lineHeight: "60px",
    letterSpacing: "-0.01em",
  },
};

/** Name of typographic treatment */
export type TextVariant = keyof typeof TEXT_VARIANTS;
