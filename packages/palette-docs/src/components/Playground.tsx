import { Box, Flex, Spacer, Toggle } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useMDXScope } from "gatsby-plugin-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import { ArtsyCodeTheme } from "./ArtsyCodeTheme"

interface CodeEditorProps {
  code: string
  editable?: boolean
  expanded?: boolean
  language?: any
  layout?: "vertical" | "horizontal"
  scope: object
  showEditor?: boolean
  showPreview?: boolean
  showToggle?: boolean
  title?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  editable = true,
  expanded = true,
  language = "html",
  layout = "vertical",
  showEditor = true,
  showPreview = true,
  showToggle = false,
  title,
}) => {
  const scope = useMDXScope()

  const getLayout = () => {
    if (/language-(sh|bash)/.test(language)) {
      showPreview = false
    }

    if (/language-(js|ts)x?/.test(language)) {
      language = "jsx"
    } else {
      language = "html"
    }

    switch (layout) {
      case "vertical": {
        return (
          <Box>
            {showPreview && (
              <>
                <PreviewContainer>
                  <LivePreview />
                </PreviewContainer>
                <Spacer mb={2} />
              </>
            )}

            {showEditor && (
              <EditorContainer px={2}>
                <ArtsyCodeTheme editable={editable}>
                  <LiveEditor {...{ language }} />
                </ArtsyCodeTheme>
              </EditorContainer>
            )}

            {editable && (
              <ErrorContainer>
                <LiveError />
              </ErrorContainer>
            )}
          </Box>
        )
      }
      case "horizontal": {
        return (
          <Flex justifyContent="space-between">
            {showPreview && (
              <PreviewContainer width="50%" mr={2}>
                <LivePreview />
                {editable && (
                  <ErrorContainer>
                    <LiveError />
                  </ErrorContainer>
                )}
              </PreviewContainer>
            )}

            {showEditor && (
              <EditorContainer width="50%" pl={2}>
                <ArtsyCodeTheme editable={editable}>
                  <LiveEditor {...{ language }} />
                </ArtsyCodeTheme>
              </EditorContainer>
            )}
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
        {showToggle ? (
          <Toggle label={title} textSize="4" expanded={expanded}>
            {getLayout()}
          </Toggle>
        ) : (
          getLayout()
        )}
      </Box>
    </LiveProvider>
  )
}

const PreviewContainer = styled(Box)`
  overflow-x: scroll;
  box-sizing: border-box;
`

const EditorContainer = styled(Box)`
  border-radius: 2px;
  border: 1px solid ${themeGet("colors.black10")};
  overflow-x: scroll;
  color: #989898;

  pre {
    outline: none;
  }

  .prism-code {
    /* Edits */
  }
`

const ErrorContainer = styled(Box)`
  .react-live-error {
    font-family: Menlo;
    font-size: 12px;
    color: ${themeGet("colors.red100")};
    white-space: pre;
    padding-top: ${themeGet("space.2")}px;
  }
`

// Wrapper .mdx wrapper tag which is replaced via playgroundHastPlugin with a CodeEditor
export const Playground = ({ children }) => children
