import { Box, color, Flex, space, Spacer, Toggle } from "@artsy/palette"
import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import { ArtsyCodeTheme } from "./ArtsyCodeTheme"

interface CodeEditorProps {
  code: string
  editable?: boolean
  expanded?: boolean
  hideToggle?: boolean
  layout?: "column" | "row"
  scope: object
  title?: string
}

export const CodeEditor: React.SFC<CodeEditorProps> = withMDXScope(
  ({
    code,
    scope,
    title,
    editable = true,
    expanded = true,
    hideToggle = true,
    layout = "row",
  }) => {
    const getLayout = () => {
      switch (layout) {
        case "column": {
          return (
            <Flex justifyContent="space-between">
              <PreviewContainer width="50%" mr={2}>
                <LivePreview />
                <ErrorContainer>
                  <LiveError />
                </ErrorContainer>
              </PreviewContainer>

              <EditorContainer width="50%" px={2}>
                <ArtsyCodeTheme>
                  <LiveEditor />
                </ArtsyCodeTheme>
              </EditorContainer>
            </Flex>
          )
        }
        case "row": {
          return (
            <Box>
              <PreviewContainer mr={2}>
                <LivePreview />
                <ErrorContainer>
                  <LiveError />
                </ErrorContainer>
              </PreviewContainer>

              <Spacer mb={2} />

              <EditorContainer px={2}>
                <ArtsyCodeTheme>
                  <LiveEditor />
                </ArtsyCodeTheme>
              </EditorContainer>
            </Box>
          )
        }
      }
    }

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
        <Box mb={4}>
          {hideToggle ? (
            getLayout()
          ) : (
            <Toggle label={title} textSize="4" expanded={expanded}>
              {getLayout()}
            </Toggle>
          )}
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
