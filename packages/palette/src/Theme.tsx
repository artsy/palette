import React, { useContext } from "react"
import { GridThemeProvider as StyledGridThemeProvider } from "styled-bootstrap-grid"
// FIXME: Upgrading styled-components types to get `ThemeContext` breaks many other typings.
// Notably: `Icon` and `Sans|Serif`
// @ts-ignore
import { ThemeContext, ThemeProvider } from "styled-components"
import { Theme as TTheme, THEME_V2, THEME_V3 } from "./themes"

export * from "./themes/v2"

/**
 * Creates a new Grid context for web. This glues the v2 grid theme into any other theme.
 */
const GridThemeProvider = ({ children }) => {
  return (
    <StyledGridThemeProvider gridTheme={THEME_V2.grid}>
      {children}
    </StyledGridThemeProvider>
  )
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme: React.FC<{ theme?: any }> = ({
  children,
  theme = THEME_V2,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider>{children}</GridThemeProvider>
    </ThemeProvider>
  )
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
