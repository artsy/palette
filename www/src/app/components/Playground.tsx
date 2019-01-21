import { Box, color } from "@artsy/palette"
import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import unescapeJs from "unescape-js"

// require("prismjs/themes/prism-coy.css")
// require("prismjs/themes/prism-dark.css")
// require("prismjs/themes/prism-funky.css")
// require("prismjs/themes/prism-okaidia.css")
require("prismjs/themes/prism-solarizedlight.css")
// require("prismjs/themes/prism-tomorrow.css")
// require("prismjs/themes/prism-twilight.css")

// Wrapper .mdx wrapper tag which is replaced via playgroundHastPlugin with a CodeEditor
export const Playground = ({ children }) => children

interface PlaygroundProps {
  code: string
  scope: object

  // TODO: Currently props cannot be passed to Playground from .mdx files
  editable?: boolean
}

export const CodeEditor: React.SFC<PlaygroundProps> = withMDXScope(
  ({ code, scope, editable = true }) => {
    console.log(code)
    return (
      <LiveProvider
        code={code}
        scope={scope}
        mountStylesheet={false}
        style={{
          pointerEvents: editable ? "inherit" : "none",
        }}
      >
        <LivePreview />
        <LiveError />

        <LiveEditorWrapper my={2} px={2} py={0}>
          <LiveEditor />
        </LiveEditorWrapper>
      </LiveProvider>
    )
  }
)

const LiveEditorWrapper = styled(Box)`
  border-radius: 2px;
  border: 1px solid ${color("black10")};
  overflow-x: scroll;
`
