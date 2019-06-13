import React from "react"
import { configure, addDecorator, addParameters } from "@storybook/react"
import { create } from "@storybook/theming"
import { Theme } from "../src/Theme"
import "storybook-chromatic"

// automatically import all files ending in *.story.tsx.
const req = require.context("../src", true, /\.story\.tsx$/)
function loadStories() {
  req
    .keys()
    .sort()
    .forEach(filename => req(filename))
}

addParameters({
  options: {
    theme: create({
      base: "light",
      brandTitle: "Palette",
      brandUrl: "https://palette.artsy.net",
    }),

    inline: true,
    showPanel: false,
    sortStoriesByKind: true,
  },
})

addDecorator(storyFn => <Theme>{storyFn()}</Theme>)

configure(loadStories, module)
