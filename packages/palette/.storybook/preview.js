import React from "react"
import { Theme } from "../src/Theme"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { breakpoints } from "../src/Theme"
import { StylesProvider } from "storybook-states"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  (Story) => {
    return (
      <Theme theme="light">
        <StylesProvider
          styles={{ statePropsActive: { color: "currentColor" } }}
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
