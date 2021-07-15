import { THEME as THEME_V2 } from "./v2";
import { THEME as THEME_V3 } from "./v3";

const THEMES = { v2: THEME_V2, v3: THEME_V3 };

export type ThemeV2 = typeof THEME_V2;
export type ThemeV3 = typeof THEME_V3;
export type Theme = ThemeV2 | ThemeV3;

export { THEME_V2, THEME_V3, THEMES };

/** Exports all of v2 for backwards-compatibility  */
export * from "./v2";
