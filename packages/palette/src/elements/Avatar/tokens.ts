import { TextVariant } from "../Text"

export const V2_TOKENS = {
  fontWeight: "bold",
  color: "black60",
  bg: "black10",
  xxs: {
    diameter: 30,
    variant: "text" as TextVariant,
  },
  xs: {
    diameter: 45,
    variant: "text" as TextVariant,
  },
  sm: {
    diameter: 70,
    variant: "title" as TextVariant,
  },
  md: {
    diameter: 100,
    variant: "largeTitle" as TextVariant,
  },
}

export const V3_TOKENS = {
  fontWeight: "normal",
  color: "black100",
  bg: "transparent",
  xxs: {
    diameter: 30,
    variant: "xs" as TextVariant,
  },
  xs: {
    diameter: 45,
    variant: "xs" as TextVariant,
  },
  sm: {
    diameter: 70,
    variant: "md" as TextVariant,
  },
  md: {
    diameter: 100,
    variant: "lg" as TextVariant,
  },
}
