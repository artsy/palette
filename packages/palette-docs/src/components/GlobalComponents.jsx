// @ts-check

import React from "react"
import * as Palette from "@artsy/palette"
import { CodeEditor } from "../components/Playground"
import { ColorComponent } from "../components/ColorComponent"

import {
  Box,
  Text,
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
  /**
   * Use color to render a color bar and relevant information about it.
   *
   * Color is the color from Palette's theme, e.g. purple100
   */
  ColorComponent: (props) => {
    return <ColorComponent color={props.color} />
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
  div: (props) => {
    return <div className="contentDiv">{props.children}</div>
  },
  h1: (props) => (
    <Box mb={5}>
      <Text as="h1" variant='xl' color="black100" className="DocSearch-lvl1">
        {props.children}
      </Text>
    </Box>
  ),
  h2: (props) => (
    <Box mb={1} mt={4}>
      <Text
        as="h2"
        variant='lg'
        weight="medium"
        color="black100"
        className="DocSearch-lvl2"
      >
        {props.children}
      </Text>
    </Box>
  ),
  h3: (props) => (
    <Box mb={1}>
      <Text
        as="h3"
        variant='md'
        weight="medium"
        color="black100"
        className="DocSearch-lvl3"
      >
        {props.children}
      </Text>
    </Box>
  ),
  h4: (props) => (
    <Box mb={1}>
      <Text as="h4" variant='sm' color="black100" className="DocSearch-lvl4">
        {props.children}
      </Text>
    </Box>
  ),

  ol: (props) => {
    return (
      <ol>
        <Text variant='md'>{props.children}</Text>
      </ol>
    )
  },

  p: (props) => (
    <Text as="p" variant='md' color="black100" className="contentDiv">
      {props.children}
    </Text>
  ),
}

export const PaletteComponents = Palette
