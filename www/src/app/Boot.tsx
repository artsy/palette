import { injectGlobalStyles, Sans, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { HeadProvider } from "react-head"
import { Playground } from "./components/Playground"

const { GlobalStyles } = injectGlobalStyles(`
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`)

const LayoutComponents = {
  h1: props => <Sans size="6">{props.children}</Sans>,
  code: Playground,
}

export const Boot = ({ element, ...props }) => {
  return (
    <HeadProvider>
      <MDXProvider components={LayoutComponents} {...props}>
        <Theme>
          <GlobalStyles>{element}</GlobalStyles>
        </Theme>
      </MDXProvider>
    </HeadProvider>
  )
}
