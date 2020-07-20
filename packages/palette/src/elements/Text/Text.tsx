import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { variant } from "styled-system"
import { textMixin, TextProps } from "./Text.shared"
import { TEXT_VARIANTS } from "./tokens"

/** Adds ellipsis to overflowing text */
export const overflowEllipsisMixin = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

/** Text */
export const Text = styled.div<TextProps & { overflowEllipsis?: boolean }>`
  ${variant({ variants: TEXT_VARIANTS.small })}

  @media (min-width: ${themeGet("breakpoints.0")}) {
    ${variant({ variants: TEXT_VARIANTS.large })}
  }

  ${textMixin}
  ${({ overflowEllipsis }) => overflowEllipsis && overflowEllipsisMixin}
`

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
}
