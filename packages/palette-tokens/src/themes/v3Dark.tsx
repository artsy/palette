import { Colors, Effects, THEME as THEME_LIGHT } from "./v3";

const COLORS: Colors = {
  /** Suitable for text on black10 and lighter */
  black100: "#ffffff",
  /** Suitable for text on black5 and lighter */
  black60: "#949494",
  /** Background only */
  black30: "#4d4d4d",
  /** Background only */
  black15: "#404040",
  /** Background only */
  black10: "#333333",
  /** Suitable for text on black60 and darker */
  black5: "#1a1a1a",
  /** Suitable for text on black60 and darker */
  white100: "#000000",

  /** Suitable for text on black10 and lighter */
  blue200: "#d3d9fd",
  /** Suitable for text on black10 and lighter */
  blue150: "#a2b1fb",
  /** Suitable for text on black10 and lighter */
  blue100: "#707eff",
  /** Alias of blue100 */
  brand: "#707eff",
  /** Background only */
  blue15: "#474d8a",
  /** Background only */
  blue10: "#31335e",

  /** Hover/down state and suitable for text on green10 */
  green150: "#c8fff0",
  /** Suitable for text on green10, black10 and lighter */
  green100: "#98ffe2",
  /** Background only */
  green10: "#161d10",

  /** Hover/down state and suitable for text on yellow10 */
  yellow150: "#f0c65b",
  /** Suitable for text on black10 and lighter */
  yellow100: "#d6ad1d",
  /** Background only */
  yellow10: "#2b2203",

  /** Hover/down state and suitable for text on orange10 */
  orange150: "#e38b57",
  /** Suitable for text on black10 and lighter */
  orange100: "#dd6a25",
  /** Background only */
  orange10: "#2b1d12",

  /** Hover/down state and suitable for text on red10 */
  red150: "#f4aeae",
  /** Suitable for text on red10, black10, and lighter */
  red100: "#ff5b37",
  /** Background only */
  red10: "#533332",
};

const EFFECTS: Effects = {
  dropShadow: "0 2px 10px 0 rgba(255, 255, 255, 0.25)",
  innerShadow: "1px 1px 2px 0 rgba(255, 255, 255, 0.1) inset",
  flatShadow: "0 1px 1px 0 rgba(255, 255, 255, 0.05)",
  /** Shadow to drop under text to improve legibility when over images */
  textShadow: "0 0 15px rgba(255, 255, 255, 0.25)",
  /** Overlay to improve legibility of text */
  overlayGradient:
    "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25))",
  /** Fade right edge */
  fadeRight:
    "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
  /** Translucent gray for dialog backdrops */
  backdrop: "rgba(26, 26, 26, 0.5)",
};

export const THEME_DARK = {
  ...THEME_LIGHT,
  id: "v3Dark",
  name: "dark",
  colors: COLORS,
  effects: EFFECTS,
};
