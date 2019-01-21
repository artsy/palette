import { Box, color, space, Spacer } from "@artsy/palette"
import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import { ArtsyCodeTheme } from "./ArtsyCodeTheme"

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

        <Spacer mb={2} />

        <ErrorContainer>
          <LiveError />
        </ErrorContainer>

        <EditorContainer my={1} px={2} py={0}>
          <ArtsyCodeTheme>
            <LiveEditor />
          </ArtsyCodeTheme>
        </EditorContainer>
      </LiveProvider>
    )
  }
)

const EditorContainer = styled(Box)`
  border-radius: 2px;
  border: 1px solid ${color("black10")};
  overflow-x: scroll;
  color: #989898;

  /* .token.punctuation {
    color: black;
  } */
`

const ErrorContainer = styled(Box)`
  .react-live-error {
    font-family: Menlo;
    font-size: 12px;
    color: ${color("red100")};
    white-space: pre;
    /* margin: ${space(1)}px 0; */
    padding: ${space(2)}px;
  }
`
