import { Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { GlobalStyles, MarkdownComponents } from "./components/GlobalComponents"

export const Boot = ({ element }) => {
  return (
    <StateProvider>
      <MDXProvider components={MarkdownComponents}>
        <Theme>
          <GlobalStyles>{element}</GlobalStyles>
        </Theme>
      </MDXProvider>
    </StateProvider>
  )
}
