import styled from "styled-components"
import { BorderBox, BorderBoxProps } from "../BorderBox"

export type StackableBorderBoxProps = BorderBoxProps

/**
 * A stackable border box is a BorderBox that shares borders with its siblings.
 */
export const StackableBorderBox = styled(BorderBox)<BorderBoxProps>`
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

StackableBorderBox.displayName = "StackableBorderBox"

StackableBorderBox.defaultProps = {
  ...BorderBox.defaultProps,
}
