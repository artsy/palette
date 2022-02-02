import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useMDXScope } from "gatsby-plugin-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import styled from "styled-components"
import { copyStringToClipboard } from "utils/copyStringToClipboard"
import {
  CodeEditorTheme,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
} from "./CodeEditorTheme"

interface CodeEditorProps {
  code: string
  editable?: boolean
  expanded?: boolean
  language?: any
  layout?: "vertical" | "horizontal"
  showEditor?: boolean
  showPreview?: boolean
  title?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  expanded = true,
  title,
  ...rest
}) => {
  const scope = useMDXScope()

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
        <EditorWindow code={code} {...rest} />
      </Box>
    </LiveProvider>
  )
}

const EditorWindow: React.FC<CodeEditorProps> = ({
  code,
  editable = true,
  language = "html",
  layout = "vertical",
  showEditor = true,
  showPreview = true,
}) => {
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
            <EditorContainer px={2} position="relative">
              <CodeEditorTheme editable={editable}>
                <LiveEditor {...({ language } as any)} />

                <CopyButton
                  onClick={() => copyStringToClipboard(code)}
                  position="absolute"
                  top={10}
                  right={10}
                >
                  <Text
                    variant="xs"
                    textTransform="uppercase"
                    backgroundColor="white"
                  >
                    Copy
                  </Text>
                </CopyButton>
              </CodeEditorTheme>
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
              <CodeEditorTheme editable={editable}>
                <LiveEditor {...({ language } as any)} />
              </CodeEditorTheme>
            </EditorContainer>
          )}
        </Flex>
      )
    }
  }
}

const CopyButton = styled(Clickable)`
  opacity: 0;
`

const PreviewContainer = styled(Box)`
  overflow-x: scroll;
  box-sizing: border-box;
`

const EditorContainer = styled(Box)`
  border: 1px solid ${themeGet("colors.black10")};
  overflow-x: scroll;
  color: ${themeGet("colors.black60")};

  &:hover {
    ${CopyButton} {
      opacity: 1;

      &:active {
        opacity: 0.7;
      }
    }
  }

  pre {
    outline: none;
  }

  .prism-code {
    /* Edits */
  }
`

const ErrorContainer = styled(Box)`
  .react-live-error {
    font-family: ${FONT_FAMILY};
    font-size: ${FONT_SIZE};
    line-height: ${LINE_HEIGHT};
    color: ${themeGet("colors.red100")};
    white-space: pre;
    padding-top: ${themeGet("space.2")}px;
  }
`

// Wrapper .mdx wrapper tag which is replaced via playgroundHastPlugin with a CodeEditor
export const Playground = ({ children }) => children
