import { injectGlobalStyles, Sans, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { HeadProvider } from "react-head"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

const { GlobalStyles } = injectGlobalStyles(`
  a {
    text-decoration: none;
  }
`)

const LayoutComponents = {
  h1: props => <Sans size="6">{props.children}</Sans>,
  code: props => (
    <LiveProvider code={props.children}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  ),
}

export const Boot = ({ element }) => {
  return (
    <HeadProvider>
      <MDXProvider components={LayoutComponents}>
        <Theme>
          <GlobalStyles>{element}</GlobalStyles>
        </Theme>
      </MDXProvider>
    </HeadProvider>
  )
}
