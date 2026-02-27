import styled from "styled-components"
import { Flex, FlexProps } from "../Flex"

export interface BorderBoxProps extends FlexProps {
  hover?: boolean
}

/**
 * A `div` that has a common border and padding set by default
 * @deprecated: Use `Box`
 */
export const BorderBoxBase = styled(Flex).attrs<BorderBoxProps>((props) => ({
  borderColor: props.borderColor ?? "mono10",
  p: props.p ?? 2,
}))<BorderBoxProps>`
  border-width: 1px;
  border-style: solid;
`
