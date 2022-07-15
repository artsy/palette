import React, { useContext } from "react"
// FIXME: Upgrading styled-components types to get `ThemeContext` breaks many other typings.
// Notably: `Icon` and `Sans|Serif`
// @ts-expect-error  MIGRATE_STRICT_MODE
import { ThemeContext, ThemeProvider } from "styled-components"
import { Theme as TTheme, THEME_V2, THEME_V3, ThemeV2, ThemeV3 } from "./themes"

export { THEME_V2, THEME_V3 } from "./themes"
export * from "@artsy/palette-tokens/dist/themes/v2"

export { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"

const THEMES = {
  v2: THEME_V2,
  v3: THEME_V3,
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme: React.FC<{ theme?: TTheme | keyof typeof THEMES }> = ({
  children,
  theme: themeOrThemeKey = THEME_V2,
}) => {
  const theme =
    themeOrThemeKey === "v2" || themeOrThemeKey === "v3"
      ? THEMES[themeOrThemeKey]
      : themeOrThemeKey

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

/** Utilize only the v2 theme */
export const ThemeProviderV2: React.FC = ({ children }) => {
  return <ThemeProvider theme={THEME_V2}>{children}</ThemeProvider>
}

/** Utilize only the v3 theme */
export const ThemeProviderV3: React.FC = ({ children }) => {
  return <ThemeProvider theme={THEME_V3}>{children}</ThemeProvider>
}

/** Returns the current theme */
export const useTheme = <T extends TTheme>() => {
  const theme: T = useContext(ThemeContext)
  return { theme }
}

/** Returns a config specific to the current theme. For use in React components */
export const useThemeConfig = <T, U>({ v2, v3 }: { v2: T; v3: U }): U | T => {
  const { theme = { id: "v2" } } = useTheme()
  return theme.id === "v2" ? v2 : v3
}

/** Returns a config specific to the current theme. For use in styled-components */
export const getThemeConfig = <T, U>(
  props: Record<string, any>,
  { v2, v3 }: { v2: T; v3: U }
): U | T => {
  const { theme = { id: "v2" } } = props
  return theme.id === "v2" ? v2 : v3
}

/** Typeguard for v2 */
export const isThemeV2 = (theme: TTheme): theme is ThemeV2 => {
  return theme.id === "v2"
}

/** Typeguard for v3 */
export const isThemeV3 = (theme: TTheme): theme is ThemeV3 => {
  return theme.id === "v3"
}
