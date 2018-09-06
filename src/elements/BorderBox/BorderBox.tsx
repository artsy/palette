import { color } from "../../helpers"
import { BorderBoxBase } from "./BorderBoxBase"
import { css } from "styled-components"

/**
 * A `div` that has a common border and padding set by default, with an optional
 * `hover` property for visually focusing content.
 */
export const BorderBox = BorderBoxBase.extend`
  ${({ hover }) =>
    hover &&
    css`
      :hover {
        border-color: ${color("black60")};
      }
    `};
`
