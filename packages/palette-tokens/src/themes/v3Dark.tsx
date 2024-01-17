import { Colors, Effects, THEME as THEME_LIGHT } from "./v3";

const COLORS: Colors = {
  /** Suitable for text on black10 and lighter */
  black100: "#ffffff",
  /** Suitable for text on black10 and lighter */
  black60: "#8f8f8f",
  /** Background only */
  black30: "#3d3d3d",
  /** Background only */
  black15: "#272727",
  /** Background only */
  black10: "#181818",
  /** Suitable for text on black60 and darker */
  black5: "#080808",
  /** Suitable for text on black60 and darker */
  white100: "#000000",

  /** Suitable for text on black10 and lighter */
  blue200: "#c1cafa",
  /** Suitable for text on black10 and lighter */
  blue150: "#8496f5",
  /** Suitable for text on black10 and lighter */
  blue100: "#283bef",
  /** Alias of blue100 */
  brand: "#283bef",
  /** Background only */
  blue15: "#131635",
  /** Background only */
  blue10: "#0a0b19",

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
  yellow10: "#161100",

  /** Hover/down state and suitable for text on orange10 */
  orange150: "#e38b57",
  /** Suitable for text on black10 and lighter */
  orange100: "#dd6a25",
  /** Background only */
  orange10: "#0c0703",

  /** Hover/down state and suitable for text on red10 */
  red150: "#f4aeae",
  /** Suitable for text on red10, black10, and lighter */
  red100: "#ff5b37",
  /** Background only */
  red10: "#1c0c0b",
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
