import React, { useEffect, useCallback, useState } from "react"
import { Theme } from "../src/Theme"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
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

// TODO: Replace with https://storybook.js.org/addons/storybook-dark-mode
// once we upgrade Storybook
const ThemeToggle = ({ theme, onToggle }) => (
  <Clickable
    onClick={onToggle}
    position="fixed"
    bottom={0}
    right={0}
    zIndex={1}
    p={2}
  >
    {theme === "light" ? "🌑" : "☀️"}
  </Clickable>
)

export const decorators = [
  (Story) => {
    const [theme, setTheme] = useState(getStoredTheme)

    const toggleTheme = useCallback(() => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === "light" ? "dark" : "light"
        setStoredTheme(newTheme)
        return newTheme
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

    return (
      <Theme theme={theme}>
        <StylesProvider
          styles={{ statePropsActive: { color: "currentColor" } }}
        >
          <GlobalStyles />

          <ThemeToggle theme={theme} onToggle={toggleTheme} />

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
