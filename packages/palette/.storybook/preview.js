import React, { useEffect, useCallback, useState } from "react"
import { THEMES, Theme } from "../src/Theme"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "storybook/viewport"
import { breakpoints } from "../src/Theme"
import { StylesProvider } from "storybook-states"
import { Clickable } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

const THEME_STORAGE_KEY = "storybook-theme"

const getStoredTheme = () => {
  if (typeof window === "undefined") return "light"
  return localStorage.getItem(THEME_STORAGE_KEY) || "light"
}

const setStoredTheme = (theme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
}

export const decorators = [
  (Story) => {
    const [theme, setTheme] = useState(getStoredTheme)

    const toggleTheme = useCallback(() => {
      setTheme((prevTheme) => {
        const nextTheme = prevTheme === "light" ? "dark" : "light"
        setStoredTheme(nextTheme)
        return nextTheme
      })
    }, [])

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.metaKey && event.key === "i") {
          event.preventDefault()
          toggleTheme()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [toggleTheme])

    const { colors, space } = THEMES[theme]

    return (
      <Theme theme={theme}>
        <StylesProvider
          styles={{
            state: {
              border: `1px dotted ${colors.mono15}`,
              padding: space[1],
              marginBottom: space[2],
            },
            stateProps: {
              display: "block",
              marginTop: space[0.5],
              paddingTop: space[0.5],
              fontFamily:
                "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
              fontSize: "0.8125rem",
              color: colors.mono60,
              borderTop: `1px dotted ${colors.mono15}`,
            },
            statePropsActive: {
              color: "currentColor",
            },
          }}
        >
          <GlobalStyles />

          <Story />
        </StylesProvider>
      </Theme>
    )
  },
]

const viewports = Object.entries(breakpoints).reduce((memo, [key, width]) => {
  if (["__docgenInfo", "displayName"].includes(key)) {
    return memo
  }

  return {
    ...memo,
    [key]: {
      name: `breakpoint: ${key}`,
      styles: {
        width,
        height: "100%",
      },
    },
  }
}, {})

export const parameters = {
  options: {
    inline: true,
    showPanel: false,
    sortStoriesByKind: true,
  },
  viewport: {
    viewports: {
      ...viewports,
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: "reset",
  },
}
