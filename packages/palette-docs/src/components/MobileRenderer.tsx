import * as Elements from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import { ColorComponent } from "components/ColorComponent"
import { MobilePreview } from "components/MobilePreview"
import { CodeEditor, Playground } from "components/Playground"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import React from "react"
import { Toggle as Toggler } from "react-powerplug"
import { MarkdownComponents } from "./GlobalComponents"

export const MobileRenderer = ({ children }) => {
  return (
    <MDXProvider components={MarkdownComponents}>
      <MDXRenderer
        scope={{
          CodeEditor,
          ColorComponent,
          MobilePreview,
          Playground,
          Toggler,
          ...Elements,
          ...MarkdownComponents,
          Box: require("@artsy/palette/dist/elements/Box/Box.ios").Box,
          Button: require("@artsy/palette/dist/elements/Button/Button.ios")
            .Button,
          Flex: require("@artsy/palette/dist/elements/Flex/Flex.ios").Flex,
        }}
      >
        {children}
      </MDXRenderer>
    </MDXProvider>
  )
}
