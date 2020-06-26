import { themeGet } from "@styled-system/theme-get"
import { variant } from "styled-system"
import { styled as primitives } from "../../platform/primitives"
import { textMixin, TextProps } from "./Text.shared"
import { TEXT_VARIANTS } from "./tokens"

/**
 * Text
 */
export const Text = primitives.Text<TextProps>`
  ${variant({ variants: TEXT_VARIANTS.small })}

  @media (min-width: ${themeGet("breakpoints.0")}) {
    ${variant({ variants: TEXT_VARIANTS.large })}
  }

  ${textMixin}
`

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
}
