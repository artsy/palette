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
  layout?: "vertical" | "horizontal"
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
    layout = "vertical",
  }) => {
    const getLayout = () => {
      switch (layout) {
        case "vertical": {
          return (
            <Box>
              <PreviewContainer>
                <LivePreview />
                {editable && (
                  <ErrorContainer>
                    <LiveError />
                  </ErrorContainer>
                )}
              </PreviewContainer>

              <Spacer mb={2} />

              <EditorContainer px={2}>
                <ArtsyCodeTheme editable={editable}>
                  <LiveEditor />
                </ArtsyCodeTheme>
              </EditorContainer>
            </Box>
          )
        }
        case "horizontal": {
          return (
            <Flex justifyContent="space-between">
              <PreviewContainer width="50%" mr={2}>
                <LivePreview />
                {editable && (
                  <ErrorContainer>
                    <LiveError />
                  </ErrorContainer>
                )}
              </PreviewContainer>

              <EditorContainer width="50%" pl={2}>
                <ArtsyCodeTheme editable={editable}>
                  <LiveEditor />
                </ArtsyCodeTheme>
              </EditorContainer>
            </Flex>
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
