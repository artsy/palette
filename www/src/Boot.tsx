import { injectGlobalStyles, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { MarkdownComponents } from "./components/GlobalComponents"
import { Playground } from "./components/Playground"

const { GlobalStyles } = injectGlobalStyles()

export const LayoutComponents = {
  ...MarkdownComponents,
  code: Playground,
}

export const Boot = ({ element }) => {
  return (
    <StateProvider>
      <MDXProvider components={LayoutComponents}>
        <Theme>
          <GlobalStyles>{element}</GlobalStyles>
        </Theme>
      </MDXProvider>
    </StateProvider>
  )
}
