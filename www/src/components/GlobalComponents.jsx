// @ts-check

import React from "react"
import { Sans, Serif, Spacer, injectGlobalStyles, space } from "@artsy/palette"
import * as Palette from "@artsy/palette"
import { CodeEditor } from "../components/Playground"
import { css } from "styled-components"

// FIXME:
// Components that intersect this dependency path *must* be .jsx, not .tsx
// due to an issue with NetlifyCMS and typescript compilation.

// Components defined here style overall markdown look and feel as well as CMS preview

export const globalCSS = css`
  a {
    &:hover {
      text-decoration: none;
    }
  }

  code {
    font-size: 14px;
  }

  div {
    &.contentDiv {
      margin-bottom: ${space(2)}px;
    }
  }

  ol {
    padding-left: ${space(3)}px;
  }

  /* NetlifyCMS root */

  #nc-root {
    font-family: Unica77LLWebRegular, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
  }
`

export const { GlobalStyles } = injectGlobalStyles(`
  ${globalCSS};
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

export const PaletteComponents = Palette
