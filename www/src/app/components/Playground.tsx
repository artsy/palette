import { Box, color, space, Toggle } from "@artsy/palette"
import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import { ArtsyCodeTheme } from "./ArtsyCodeTheme"

interface CodeEditorProps {
  code: string
  editable?: boolean
  expanded?: boolean
  scope: object
  title?: string
}

export const CodeEditor: React.SFC<CodeEditorProps> = withMDXScope(
  ({ code, scope, title, editable = true, expanded = true }) => {
    return (
      <LiveProvider
        code={code}
        scope={scope}
        mountStylesheet={false}
        style={{
          pointerEvents: editable ? "inherit" : "none",
          overflowX: "hidden",
        }}
      >
        <Box my={2}>
          <Toggle label={title} textSize="4" expanded={expanded}>
            <PreviewContainer my={2}>
              <LivePreview />
            </PreviewContainer>

            <ErrorContainer>
              <LiveError />
            </ErrorContainer>

            <EditorContainer my={1} px={2} py={0}>
              <ArtsyCodeTheme>
                <LiveEditor />
              </ArtsyCodeTheme>
            </EditorContainer>
          </Toggle>
        </Box>
      </LiveProvider>
    )
  }
)

const PreviewContainer = styled(Box)`
  overflow-x: scroll;
  box-sizing: border-box;
`

const EditorContainer = styled(Box)`
  border-radius: 2px;
  border: 1px solid ${color("black10")};
  overflow-x: scroll;
  color: #989898;

  .prism-code {
    /* Edits */
  }
`

const ErrorContainer = styled(Box)`
  .react-live-error {
    font-family: Menlo;
    font-size: 12px;
    color: ${color("red100")};
    white-space: pre;
    padding-top: ${space(2)}px;
  }
`

// Wrapper .mdx wrapper tag which is replaced via playgroundHastPlugin with a CodeEditor
export const Playground = ({ children }) => children
