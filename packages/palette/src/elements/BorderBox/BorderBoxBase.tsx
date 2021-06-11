import styled from "styled-components"
import { BorderProps, SpaceProps } from "styled-system"
import { Flex, FlexProps } from "../Flex"

export interface BorderBoxProps extends FlexProps, BorderProps, SpaceProps {
  hover?: boolean
}

/**
 * A `div` that has a common border and padding set by default
 */
export const BorderBoxBase = styled(Flex)<BorderBoxProps>`
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
`

BorderBoxBase.defaultProps = {
  borderColor: "black10",
  p: 2,
}
