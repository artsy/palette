import styled from "styled-components"
import {
  border,
  BorderProps,
  space as styledSpace,
  SpaceProps,
} from "styled-system"
import { color, space } from "../../helpers"
import { Flex, FlexProps } from "../Flex"

export interface BorderBoxProps extends FlexProps, BorderProps, SpaceProps {
  hover?: boolean
}

/**
 * A `View` or `div` (depending on the platform) that has a common border
 * and padding set by default
 */
export const BorderBoxBase = styled(Flex)<BorderBoxProps>`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  padding: ${space(2)}px;
  ${border}
  ${styledSpace}
`
