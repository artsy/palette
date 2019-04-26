import React from "react"
import { configure, addDecorator, addParameters } from "@storybook/react"
import { themes } from "@storybook/theming"
import { Theme } from "../src/Theme"
import "storybook-chromatic"

// automatically import all files ending in *.story.tsx.
const req = require.context("../src", true, /\.story\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    theme: themes.light,
    showPanel: false,
  },
})

addDecorator(storyFn => <Theme>{storyFn()}</Theme>)

configure(loadStories, module)
