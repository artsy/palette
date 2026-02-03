import React, { useContext } from "react"
import { ThemeContext, ThemeProvider } from "styled-components"
import { THEME, Theme as TTheme } from "./themes"

export * from "@artsy/palette-tokens/dist/themes/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
export type { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"

export const THEMES = {
  light: THEME,
  dark: THEME_DARK,
}

const DEFAULT_THEME = THEME

interface ThemeProps {
  children?: React.ReactNode
  theme?: "light" | "dark"
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme: React.FC<React.PropsWithChildren<ThemeProps>> = ({
  children,
  theme = "light",
}) => {
  const selectedTheme = THEMES[theme]
  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
}

/** Returns the current theme */
export const useTheme = <T extends TTheme>() => {
  const theme: T = (useContext(ThemeContext) || DEFAULT_THEME) as T
  return { theme }
}
