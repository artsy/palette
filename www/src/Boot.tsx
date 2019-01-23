import { injectGlobalStyles, Sans, Serif, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { HeadProvider } from "react-head"
import { Provider as StateProvider } from "unstated"
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
  h1: props => (
    <Serif size="8" color="black100" mb={2}>
      {props.children}
    </Serif>
  ),
  h3: props => (
    <Sans size="4" weight="medium" color="black100">
      {props.children}
    </Sans>
  ),
  h4: props => (
    <Serif size="4" color="black100" mb={2}>
      {props.children}
    </Serif>
  ),
  p: props => (
    <Sans size="3" color="black100">
      {props.children}{" "}
    </Sans>
  ),
  code: Playground,
}

export const Boot = ({ element, ...props }) => {
  return (
    <StateProvider>
      <HeadProvider>
        <MDXProvider components={LayoutComponents} {...props}>
          <Theme>
            <GlobalStyles>{element}</GlobalStyles>
          </Theme>
        </MDXProvider>
      </HeadProvider>
    </StateProvider>
  )
}
