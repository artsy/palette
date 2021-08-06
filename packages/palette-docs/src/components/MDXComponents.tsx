import * as paletteComponents from "@artsy/palette"
import { Box, Text } from "@artsy/palette"
import React from "react"
import { State, Toggle as Toggler } from "react-powerplug"
import { CodeEditor, Playground } from "../components/CodeEditor"
import { ColorComponent } from "../components/ColorComponent"
import { Table } from "../components/Table"

/**
 * All components defined here are globally accessible in .mdx. We need to also
 * define a similar list in gatsby-config under `globalScope`.
 */
export const MDXComponents = {
  ...paletteComponents,

  CodeEditor,
  ColorComponent,
  Playground,
  State,
  Table,
  Toggler,

  blockquote: (props) => {
    return (
      <Box p={1} backgroundColor="black10">
        <Text variant="xxl">{props.children}</Text>
      </Box>
    )
  },

  code: ({ children, className: language }) => {
    return <CodeEditor code={children} language={language} editable={false} />
  },

  div: (props) => {
    return <div className="contentDiv">{props.children}</div>
  },

  h1: (props) => (
    <Box mb={5}>
      <Text as="h1" variant="xxl" color="black100" className="DocSearch-lvl1">
        {props.children}
      </Text>
    </Box>
  ),

  h2: (props) => (
    <Box mb={2} mt={4}>
      <Text as="h2" variant="xl" color="black100" className="DocSearch-lvl2">
        {props.children}
      </Text>
    </Box>
  ),

  h3: (props) => (
    <Box mb={2} mt={4}>
      <Text as="h3" variant="lg" color="black100" className="DocSearch-lvl3">
        {props.children}
      </Text>
    </Box>
  ),

  h4: (props) => (
    <Box mb={1}>
      <Text as="h4" variant="sm" color="black100" className="DocSearch-lvl4">
        {props.children}
      </Text>
    </Box>
  ),

  ol: (props) => {
    return (
      <ol>
        <Text variant="md">{props.children}</Text>
      </ol>
    )
  },

  p: (props) => (
    <Text
      as="p"
      variant="md"
      color="black100"
      className="contentDiv"
      lineHeight="24px"
    >
      {props.children}
    </Text>
  ),
}

export const PaletteComponents = paletteComponents
