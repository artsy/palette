import React from "react"
import { Text as NativeText, TextProps as NativeTextProps } from "react-native"
import { styled } from "styled-components/native"
import { variant as systemVariant } from "styled-system"
import { BaseTextProps, textMixin } from "./Text.shared"
import {
  calculateLetterSpacing,
  calculateLineHeight,
  isControlledFontSize,
  isControlledLetterSpacing,
  isControlledLineHeight,
  TEXT_VARIANTS,
} from "./tokens.ios"

/** TextProps */
export type TextProps = BaseTextProps & NativeTextProps

const InnerText = styled(NativeText)<TextProps>`
  ${systemVariant({ variants: TEXT_VARIANTS })}
  ${textMixin}
`

/** Text */
export const Text: React.FC<TextProps> = ({
  children,
  variant,
  fontSize,
  letterSpacing,
  lineHeight,
  ...rest
}) => {
  const props = {
    variant,
    fontSize,
    ...(!variant && letterSpacing && fontSize
      ? // Possibly convert the letterSpacing
        {
          letterSpacing:
            isControlledLetterSpacing(letterSpacing) &&
            isControlledFontSize(fontSize)
              ? calculateLetterSpacing(fontSize, letterSpacing)
              : letterSpacing,
        }
      : {}),
    ...(!variant && lineHeight && fontSize
      ? // Possibly convert the lineHeight
        {
          lineHeight:
            isControlledLineHeight(lineHeight) && isControlledFontSize(fontSize)
              ? calculateLineHeight(fontSize, lineHeight)
              : lineHeight,
        }
      : {}),
    ...rest,
  }

  return <InnerText {...props}>{children}</InnerText>
}

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
}
