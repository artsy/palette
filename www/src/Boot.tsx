import { Sans, Serif, Spacer } from "@artsy/palette"
import * as Palette from "@artsy/palette"
import { injectGlobalStyles, space, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { CodeEditor } from "./components/Playground"

export const PaletteComponents = Palette

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

/**
 * Components in this list represent all the various elements that can be rendered
 * in markdown. Still need to fill this out a bit!
 */
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

  /**
   * Use the code editor for displaying code blocks. Doesn't need a scope because
   * it's not interactive.
   */
  code: ({ children, className: language }) => {
    return (
      <CodeEditor
        code={children}
        language={language}
        editable={false}
        scope={{}}
      />
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
