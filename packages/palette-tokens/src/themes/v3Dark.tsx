import { Colors, Effects, THEME as THEME_LIGHT } from "./v3";

const COLORS: Colors = {
  /** Suitable for text on mono10 and lighter */
  mono100: "#ffffff",
  /** Suitable for text on mono5 and lighter */
  mono60: "#C2C2C2",
  /** Background only */
  mono30: "#707070",
  /** Background only */
  mono15: "#404040",
  /** Background only */
  mono10: "#333333",
  /** Suitable for text on mono60 and darker */
  mono5: "#1a1a1a",
  /** Suitable for text on mono60 and darker */
  mono0: "#121212",

  /** Suitable for text on mono10 and lighter */
  blue200: "#d3d9fd",
  /** Suitable for text on mono10 and lighter */
  blue150: "#a2b1fb",
  /** Suitable for text on mono10 and lighter */
  blue100: "#0f77ff",
  /** Alias of blue100 */
  brand: "#707eff",
  /** Background only */
  blue15: "#474d8a",
  /** Background only */
  blue10: "#31335e",

  /** Hover/down state and suitable for text on green10 */
  green150: "#c8fff0",
  /** Suitable for text on green10, mono10 and lighter */
  green100: "#019f73",
  /** Background only */
  green10: "#161d10",

  /** Hover/down state and suitable for text on yellow10 */
  yellow150: "#f0c65b",
  /** Suitable for text on mono10 and lighter */
  yellow100: "#e2b929",
  /** Background only */
  yellow10: "#2b2203",

  /** Hover/down state and suitable for text on orange10 */
  orange150: "#e38b57",
  /** Suitable for text on mono10 and lighter */
  orange100: "#da6722",
  /** Background only */
  orange10: "#2b1d12",

  /** Hover/down state and suitable for text on red10 */
  red150: "#f9d2d2",
  /** Suitable for text on red10, mono10, and lighter */
  red100: "#e44738",
  /** Suitable for importance/urgency indicators */
  red50: "#d60012",
  /** Background only */
  red10: "#561406",
};

const EFFECTS: Effects = {
  dropShadow: "0 2px 10px 0 rgba(255, 255, 255, 0.25)",
  innerShadow: "1px 1px 2px 0 rgba(255, 255, 255, 0.1) inset",
  flatShadow: "0 1px 1px 0 rgba(255, 255, 255, 0.05)",
  /** Shadow to drop under text to improve legibility when over images */
  textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
  /** Overlay to improve legibility of text */
  overlayGradient: `
    linear-gradient(
      to bottom,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0.01) 8.1%,
      hsla(0, 0%, 100%, 0.036) 15.5%,
      hsla(0, 0%, 100%, 0.078) 22.5%,
      hsla(0, 0%, 100%, 0.132) 29%,
      hsla(0, 0%, 100%, 0.194) 35.3%,
      hsla(0, 0%, 100%, 0.264) 41.2%,
      hsla(0, 0%, 100%, 0.338) 47.1%,
      hsla(0, 0%, 100%, 0.412) 52.9%,
      hsla(0, 0%, 100%, 0.486) 58.8%,
      hsla(0, 0%, 100%, 0.556) 64.7%,
      hsla(0, 0%, 100%, 0.618) 71%,
      hsla(0, 0%, 100%, 0.672) 77.5%,
      hsla(0, 0%, 100%, 0.714) 84.5%,
      hsla(0, 0%, 100%, 0.74) 91.9%,
      hsla(0, 0%, 100%, 0.75) 100%
    );
`,
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
