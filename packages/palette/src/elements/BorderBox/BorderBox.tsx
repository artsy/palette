import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { BorderBoxBase, BorderBoxProps } from "./BorderBoxBase"

/**
 * A `div` that has a common border and padding set by default, with an optional
 * `hover` property for visually focusing content.
 */
export const BorderBox = styled(BorderBoxBase)<BorderBoxProps>`
  ${({ hover }) =>
    hover &&
    css`
      :hover {
        border-color: ${themeGet("colors.black60")};
      }
    `};
`

BorderBox.displayName = "BorderBox"
