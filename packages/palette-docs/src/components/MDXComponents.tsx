import * as paletteComponents from "@artsy/palette"
import { Text } from "@artsy/palette"
import * as chartComponents from "@artsy/palette-charts"
import React from "react"
import { State, Toggle as Toggler } from "react-powerplug"
import { CodeEditor, Playground } from "../components/CodeEditor"
import { CodeSnippet } from "../components/CodeSnippet"
import { ColorComponent } from "../components/ColorComponent"
import { Table } from "../components/Table"

/**
 * All components defined here are globally accessible in .mdx. We need to also
 * define a similar list in gatsby-config under `globalScope`.
 */
export const MDXComponents = {
  ...paletteComponents,
  ...chartComponents,

  CodeEditor,
  CodeSnippet,
  ColorComponent,
  Playground,
  State,
  Table,
  Toggler,

  blockquote: (props) => {
    return (
      <Text variant="xxl" p={1} backgroundColor="black10">
        {props.children}
      </Text>
    )
  },

  code: ({ children, className: language }) => {
    return <CodeEditor code={children} language={language} editable={false} />
  },

  div: (props) => {
    return <div className="contentDiv">{props.children}</div>
  },

  h1: (props) => (
    <Text as="h1" variant="xxl" className="DocSearch-lvl1" mb={5}>
      {props.children}
    </Text>
  ),

  h2: (props) => (
    <Text as="h2" variant="xl" className="DocSearch-lvl2" mb={2} mt={4}>
      {props.children}
    </Text>
  ),

  h3: (props) => (
    <Text as="h3" variant="lg" className="DocSearch-lvl3" mb={2} mt={4}>
      {props.children}
    </Text>
  ),

  h4: (props) => (
    <Text as="h4" variant="sm" className="DocSearch-lvl4" mb={1}>
      {props.children}
    </Text>
  ),

  ol: (props) => {
    return (
      <Text variant="md" as="ol">
        {props.children}
      </Text>
    )
  },

  p: (props) => (
    <Text as="p" variant="sm" className="contentDiv">
      {props.children}
    </Text>
  ),
}

export const PaletteComponents = paletteComponents
