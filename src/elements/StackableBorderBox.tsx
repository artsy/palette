import { space as styledSpace } from "styled-system"
import { media, space } from "../helpers"
import { BorderBox } from "./BorderBox"

/**
 * A stackable border box is a BorderBox that shares borders with its siblings.
 */
export const StackableBorderBox = BorderBox.extend`
  padding: ${space(3)}px;

  ${media.sm`
    padding: ${space(2)}px;
    ${styledSpace};
  `};

  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`
