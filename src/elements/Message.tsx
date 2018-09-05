import React, { SFC } from "react"

import { color } from "../helpers"
import { Flex, FlexProps } from "./Flex"
import { Sans } from "../elements/Typography"
import { SansSize } from "../Theme"

export const StyledFlex = Flex.extend`
  background-color: ${color("black5")};
  border-radius: 2px;
`

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
  size?: SansSize
}

export const Message: SFC<MessageProps> = ({
  children,
  size = "3t",
  ...others
}) => {
  return (
    <StyledFlex p={2} {...others}>
      <Sans size={size} color={color("black60")} weight="regular">
        {children}
      </Sans>
    </StyledFlex>
  )
}
