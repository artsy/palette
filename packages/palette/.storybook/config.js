import React from "react"
import { configure, addDecorator, addParameters } from "@storybook/react"
import { Theme } from "../src/Theme"
import { injectGlobalStyles } from "../src/helpers/injectGlobalStyles"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { breakpoints } from "../src/Theme"
import "storybook-chromatic"

// Automatically import all files ending in *.story.tsx.
const req = require.context("../src", true, /\.story\.tsx$/)
function loadStories() {
  req
    .keys()
    .sort()
    .forEach(filename => req(filename))
}

addParameters({
  options: {
    inline: true,
    showPanel: false,
    sortStoriesByKind: true,
  },
})

const { GlobalStyles } = injectGlobalStyles()

addDecorator(storyFn => (
  <Theme>
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  </Theme>
))

const viewports = Object.entries(breakpoints).reduce(
  (memo, [key, width]) => ({
    ...memo,
    [key]: {
      name: `breakpoint: ${key}`,
      styles: {
        width,
        height: "100%",
      },
    },
  }),
  {}
)

addParameters({
  viewport: {
    viewports: {
      ...viewports,
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: "reset",
  },
})

configure(loadStories, module)
