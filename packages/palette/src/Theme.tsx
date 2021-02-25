import React, { useContext } from "react"
import { ThemeContext, ThemeProvider } from "styled-components"
import { isReactNative } from "./helpers/isReactNative"
import { Theme as TTheme, THEME_V2 } from "./themes"

export * from "./themes/v2"

/**
 * Creates a new Grid context for web. On React Native it serves as a noop.
 */
const GridThemeProvider = ({ children }) => {
  if (isReactNative()) {
    return children
  } else {
    const StyledGrid = require("styled-bootstrap-grid")
    return (
      <StyledGrid.GridThemeProvider gridTheme={THEME_V2.grid}>
        {children}
      </StyledGrid.GridThemeProvider>
    )
  }
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

/** Returns the current theme */
export const useTheme = () => {
  const theme: TTheme = useContext(ThemeContext)
  return { theme }
}
