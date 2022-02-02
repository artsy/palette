import { Text } from "@artsy/palette"
import React, { FC } from "react"
import { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT } from "./CodeEditorTheme"

export const CodeSnippet: FC = ({ children }) => {
  return (
    <Text
      as="pre"
      fontSize={FONT_SIZE}
      lineHeight={LINE_HEIGHT}
      fontFamily={FONT_FAMILY}
      border="1px solid"
      borderColor="black10"
      overflowX="auto"
      p={2}
    >
      {children}
    </Text>
  )
}
