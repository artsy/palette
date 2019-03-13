// @ts-check

import React from "react"
import * as Palette from "@artsy/palette"
import { CodeEditor } from "../components/Playground"

import {
  Box,
  Sans,
  Serif,
  injectGlobalStyles,
  color,
  space,
} from "@artsy/palette"

/**
 * FIXME:
 * Components that intersect this dependency path *must* be .jsx, not .tsx due
 * to an issue with NetlifyCMS and typescript compilation.
 *
 * Components defined here style overall markdown look and feel as well as CMS preview
 */

export const globalCSS = `
  a {
    &:hover {
      text-decoration: none;
    }
  }

  code {
    font-size: 14px;
    background: #f3f3f3;
    padding: 2px;
    padding-left: ${space(0.5)}px;
    padding-right: ${space(0.5)}px;
    color: ${color("black60")};
    border-radius: ${space(0.3)}px;
  }

  div {
    &.contentDiv {
      a {
        text-decoration: underline;

        &:hover {
          color: ${color("purple100")};
        }
      }

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
    <Box mb={5}>
      <Serif size="8" color="black100">
        {props.children}
      </Serif>
    </Box>
  ),
  h2: props => (
    <Box mb={1}>
      <Sans size="5" weight="medium" color="black100">
        {props.children}
      </Sans>
    </Box>
  ),
  h3: props => (
    <Box mb={1}>
      <Sans size="4" weight="medium" color="black100">
        {props.children}
      </Sans>
    </Box>
  ),
  h4: props => (
    <Box mb={1}>
      <Serif size="4" color="black100">
        {props.children}
      </Serif>
    </Box>
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
