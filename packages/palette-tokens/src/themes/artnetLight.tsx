import { Colors, THEME as THEME_LIGHT } from "./v3";
import { TEXT_VARIANT_NAMES, TextTreatment } from "../typography/v3";

/**
 * Colors sourced by inspecting artnet.com and the artnet Price Database
 * (computed styles, July 2026). mono0/mono5/mono15/mono100 and the
 * blue100/brand/blue15 accent are directly observed values; the remaining
 * ramp steps (blue150/blue200/blue10, and all of green/yellow/orange/red)
 * are derived tints/shades to satisfy the required color contract — artnet
 * doesn't have distinct brand colors for those semantic slots.
 */
const COLORS: Colors = {
  /** Body/heading text color observed across artnet.com and the PDB */
  mono100: "#000000",
  /** Derived secondary text tone */
  mono60: "#666666",
  /** Derived, background only */
  mono30: "#a3a3a3",
  /** PDB result-row border color (Tailwind neutral-300) */
  mono15: "#d4d4d4",
  /** Derived divider tone (Tailwind neutral-200) */
  mono10: "#e5e5e5",
  /** PDB result-row card background (Tailwind neutral-100) */
  mono5: "#f5f5f5",
  /** Page background observed across artnet.com and the PDB */
  mono0: "#ffffff",

  /** Derived darker shade of the brand accent, for text on light backgrounds */
  blue200: "#8c2700",
  /** Derived hover/down state of the brand accent */
  blue150: "#c93900",
  /** artnet's CTA/accent color (homepage "Search" button) */
  blue100: "#fc4700",
  /** Alias of blue100 */
  brand: "#fc4700",
  /** PDB "Sold Above High Estimate" stat highlight swatch */
  blue15: "#ffd69c",
  /** Derived, lighter than blue15 */
  blue10: "#fff1e0",

  /** Derived */
  green150: "#14532d",
  /** Derived */
  green100: "#1f7a41",
  /** Derived, background only */
  green10: "#eaf6ee",

  /** Derived */
  yellow150: "#8a6d1a",
  /** Derived */
  yellow100: "#c9a227",
  /** Derived, background only */
  yellow10: "#fbf6e6",

  /** artnet has no separate orange from its brand accent — reuses it */
  orange150: "#c93900",
  /** artnet has no separate orange from its brand accent — reuses it */
  orange100: "#fc4700",
  /** artnet has no separate orange from its brand accent — reuses it */
  orange10: "#fff1e0",

  /** Derived */
  red150: "#4a0a10",
  /** Derived */
  red100: "#c11d2e",
  /** Derived, suitable for importance/urgency indicators */
  red50: "#e23c4b",
  /** Derived, background only */
  red10: "#fbeaea",
}

export type ArtnetColors = typeof COLORS

/**
 * Type sizes sourced the same way as COLORS above. sm/md/lg/xl/xs are
 * directly observed (body copy, homepage headline, PDB marketing headline,
 * PDB stat display, and PDB caption/highlight text, respectively); the
 * remaining sizes are interpolated to fill the required 11-variant contract.
 */
const TEXT_VARIANTS: Record<
  typeof TEXT_VARIANT_NAMES[number],
  TextTreatment
> = {
  /** Derived hero size, no direct observation */
  xxxl: { fontSize: "88px", lineHeight: "92px" },
  /** Derived, no direct observation */
  xxl: { fontSize: "64px", lineHeight: "68px" },
  /** PDB "Your Insights" stat display (e.g. "46%") */
  xl: { fontSize: "48px", lineHeight: "48px" },
  /** PDB price-database marketing section headline */
  lg: { fontSize: "30px", lineHeight: "36px" },
  /** Derived tighter variant of lg */
  "lg-display": { fontSize: "30px", lineHeight: "34px" },
  /** Derived, between lg and xl, no direct observation */
  bq: { fontSize: "40px", lineHeight: "46px" },
  /** artnet.com homepage section headline */
  md: { fontSize: "21px", lineHeight: "22px", letterSpacing: "1px" },
  /** PDB result-row body copy (artist/title/price) and nav links */
  sm: { fontSize: "16px", lineHeight: "24px" },
  /** Derived tighter variant of sm */
  "sm-display": { fontSize: "16px", lineHeight: "20px" },
  /** PDB result-row caption and "Sold Above High Estimate" stat label */
  xs: { fontSize: "14px", lineHeight: "18px" },
  /** Derived, no direct observation */
  xxs: { fontSize: "12px", lineHeight: "16px" },
}

/**
 * artnet's real interface (homepage, Price Database search and results)
 * has no rounded corners anywhere observed — inputs, buttons, and result
 * cards are all sharp-edged. Same index positions as the base theme's
 * radii scale (see v3.tsx) so numeric `borderRadius` props resolve
 * correctly under this theme too.
 */
const RADII = ["0px", "0px", "0px", "0px", "0px", "0px", "0px"]

const FONTS = {
  /**
   * artnet.com uses licensed typefaces (ArtnetGrotesk, Sailec,
   * NeueHelvetica) we can't use here — this is their own fallback stack
   * with the proprietary name stripped out.
   */
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
}

export const THEME_ARTNET_LIGHT = {
  ...THEME_LIGHT,
  id: "artnetLight",
  name: "artnet_light",
  colors: COLORS,
  fonts: FONTS,
  textVariants: TEXT_VARIANTS,
  radii: RADII,
}
