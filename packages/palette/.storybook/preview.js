import React from "react"
import { addDecorator } from "@storybook/react"
import { Theme } from "../src/Theme"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { breakpoints } from "../src/Theme"

const { GlobalStyles } = injectGlobalStyles()

addDecorator((storyFn) => (
  <Theme>
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  </Theme>
))

const viewports = Object.entries(breakpoints).reduce(
  (memo, [key, width]) => {
    if (['__docgenInfo', 'displayName'].includes(key)) {
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
  },
  {}
)

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
