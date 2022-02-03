import styled from "styled-components"
import { Flex, FlexProps } from "../Flex"

export interface BorderBoxProps extends FlexProps {
  hover?: boolean
}

/**
 * A `div` that has a common border and padding set by default
 * @deprecated: Use `Box`
 */
export const BorderBoxBase = styled(Flex)<BorderBoxProps>`
  border-width: 1px;
  border-style: solid;
`

BorderBoxBase.defaultProps = {
  borderColor: "black10",
  p: 2,
}
