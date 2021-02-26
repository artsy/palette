import React, { useState } from "react"
import { Theme } from "../src/Theme"
import { THEMES } from "../src/themes"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { breakpoints } from "../src/Theme"
import { Tabs, Tab } from "../src/elements/Tabs"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  (Story) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "v2")

    return (
      <Theme theme={THEMES[theme]}>
        <>
          <GlobalStyles />

          <Tabs
            initialTabIndex={["v2", "v3"].indexOf(theme)}
            onChange={({ name }) => {
              setTheme(name)
              localStorage.setItem("theme", name)
            }}
          >
            <Tab name="v2">
              <Story />
            </Tab>

            <Tab name="v3">
              <Story />
            </Tab>
          </Tabs>
        </>
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
