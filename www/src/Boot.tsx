import { injectGlobalStyles, space, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { Provider as StateProvider } from "unstated"
// import { MarkdownComponents } from "./components/GlobalComponents"

const { GlobalStyles } = injectGlobalStyles(`
  a {

    &:hover {
      text-decoration: none;
    }
  }

  code {
    font-size:  14px;
  }

  div {
    &.contentDiv {
      margin-bottom: ${space(2)}px;
    }
  }

  img {
    margin-bottom: ${space(3)}px;
  }

  ol {
    padding-left: ${space(3)}px;
  }
`)

import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import * as Palette from "@artsy/palette"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/styles/prism"

// import * as RP from "react-powerplug"

export const PaletteComponents = Palette

// Components in this list represent all the various elements that can be rendered
// in markdown. Still need to fill this out a bit!
export const MarkdownComponents = {
  h1: props => (
    <>
      <Serif size="8" color="black100">
        {props.children}
      </Serif>
      <Spacer mb={5} />
    </>
  ),
  h2: props => (
    <>
      <Sans size="5" weight="medium" color="black100">
        {props.children}
      </Sans>
      <Spacer mb={1} />
    </>
  ),
  h3: props => (
    <Sans size="4" weight="medium" color="black100">
      {props.children}
    </Sans>
  ),
  h4: props => (
    <Serif size="4" color="black100">
      {props.children}
    </Serif>
  ),
  div: props => {
    return <div className="contentDiv">{props.children}</div>
  },
  // ul: props => {}
  p: props => (
    // @ts-ignore
    <Sans size="3" color="black100" className="contentDiv">
      {props.children}
    </Sans>
  ),
  ol: props => {
    return (
      <ol>
        <Sans size="3">{props.children}</Sans>
      </ol>
    )
  },
  // li: props => {
  //   return <li style={{ marginLeft: 0 }}>{props.children}</li>
  // },
  code: props => {
    return (
      <SyntaxHighlighter language="javascript" style={prism}>
        {props.children}
      </SyntaxHighlighter>
    )
  },
}

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
