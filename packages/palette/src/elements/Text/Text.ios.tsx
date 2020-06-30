import React from "react"
import { variant as systemVariant } from "styled-system"
import { styled as primitives } from "../../platform/primitives"
import { textMixin, TextProps } from "./Text.shared"
import {
  calculateLetterSpacing,
  calculateLineHeight,
  isControlledFontSize,
  isControlledLetterSpacing,
  isControlledLineHeight,
  TEXT_VARIANTS,
} from "./tokens.ios"

/**
 * InnerText
 */
const InnerText = primitives.Text<TextProps>`
  ${systemVariant({ variants: TEXT_VARIANTS })}
  ${textMixin}
`

/**
 * Text
 * TODO: Compose RN props
 */
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
