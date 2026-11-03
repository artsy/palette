import React, { createContext, useContext } from "react"
import { ThemeContext, ThemeProvider } from "styled-components"
import { THEME, Theme as TTheme } from "./themes"
import {
  getPaletteThemeAttributes,
  PALETTE_THEME_ATTRIBUTE,
  PaletteThemeName,
} from "./styles/themeAttribute"
import { useIsomorphicLayoutEffect } from "./utils/useIsomorphicLayoutEffect"

export * from "@artsy/palette-tokens/dist/themes/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
export type { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
export { getPaletteThemeAttributes, PALETTE_THEME_ATTRIBUTE }
export type { PaletteThemeName }

export const THEMES = {
  light: THEME,
  dark: THEME_DARK,
}

const DEFAULT_THEME = THEME

const PaletteThemeContext = createContext<PaletteThemeName | null>(null)

interface ThemeProps {
  children?: React.ReactNode
  theme?: PaletteThemeName
}

/**
 * A wrapper component for passing down the Artsy theme context.
 *
 * The outermost `Theme` mirrors its value to `<html data-palette-theme>` so
 * that portaled content picks up the CSS variables too. A nested `Theme` with
 * a different value scopes them to a `display: contents` wrapper.
 */
export const Theme: React.FC<React.PropsWithChildren<ThemeProps>> = ({
  children,
  theme = "light",
}) => {
  const parentTheme = useContext(PaletteThemeContext)
  const isRoot = parentTheme === null

  useIsomorphicLayoutEffect(() => {
    if (!isRoot) return

    document.documentElement.setAttribute(PALETTE_THEME_ATTRIBUTE, theme)
  }, [isRoot, theme])

  const selectedTheme = THEMES[theme]
  const content = (
    <PaletteThemeContext.Provider value={theme}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </PaletteThemeContext.Provider>
  )

  if (isRoot || parentTheme === theme) {
    return content
  }

  return (
    <div {...getPaletteThemeAttributes(theme)} style={{ display: "contents" }}>
      {content}
    </div>
  )
}

/** Returns the current theme */
export const useTheme = <T extends TTheme>() => {
  const theme: T = (useContext(ThemeContext) || DEFAULT_THEME) as T
  return { theme }
}
