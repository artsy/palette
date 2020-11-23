import React from "react"
import { ThemeProvider } from "styled-components"
import { isReactNative } from "./helpers/isReactNative"
import { fontFamily } from "./platform/fonts"
import tokens from "@artsy/palette-tokens"

/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.notion.so/artsy/Master-Library-810612339f474d0997fe359af4285c56
 *
 * These values have been moved to the `@artsy/palette-tokens` package
 *
 * @see https://github.com/artsy/palette/blob/master/packages/palette-tokens/src/index.ts
 */
export * from "@artsy/palette-tokens"
export const themeProps = {
  ...tokens,
  fontFamily,
}

/**
 * Creates a new Grid context for web. On React Native it serves as a noop.
 */
const GridThemeProvider = ({ children }) => {
  if (isReactNative()) {
    return children
  } else {
    const StyledGrid = require("styled-bootstrap-grid")
    return (
      <StyledGrid.GridThemeProvider gridTheme={themeProps.grid}>
        {children}
      </StyledGrid.GridThemeProvider>
    )
  }
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme = props => {
  return (
    <ThemeProvider theme={themeProps}>
      <GridThemeProvider>{props.children}</GridThemeProvider>
    </ThemeProvider>
  )
}
