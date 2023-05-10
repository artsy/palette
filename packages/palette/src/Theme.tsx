import React, { useContext } from "react"
import {
  // FIXME: Upgrading styled-components types to get `ThemeContext` breaks many other typings.
  // Notably: `Icon` and `Sans|Serif`
  // @ts-expect-error  MIGRATE_STRICT_MODE
  ThemeContext,
  ThemeProvider,
} from "styled-components"
import { Theme as TTheme, THEME } from "./themes"

export * from "@artsy/palette-tokens/dist/themes/v3"
export { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"

interface ThemeProps {
  children?: React.ReactNode
}

/**
 * A wrapper component for passing down the Artsy theme context
 */
export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>
}

/** Returns the current theme */
export const useTheme = <T extends TTheme>() => {
  const theme: T = useContext(ThemeContext)
  return { theme }
}
