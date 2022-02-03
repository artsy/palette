import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { BorderBoxBase, BorderBoxProps } from "./BorderBoxBase"

/**
 * A `div` that has a common border and padding set by default, with an optional
 * `hover` property for visually focusing content.
 * @deprecated: Use `Box` along with props e.g. `border="1px solid" borderColor="black10"`,
 * as needed.
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
