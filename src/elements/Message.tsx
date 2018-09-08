import React, { SFC } from "react"

import { color } from "helpers"
import { Flex, FlexProps } from "./Flex"
import { Sans } from "elements/Typography"
import { SansSize } from "Theme"

const StyledFlex = Flex.extend`
  background-color: ${color("black5")};
  border-radius: 2px;
`

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
  /**
   * Size of text to display in message window
   */
  textSize?: SansSize
}

/**
 * A generic message window for displaying ZerStates, notices, errors, etc.
 */
export const Message: SFC<MessageProps> = ({
  children,
  textSize = "3t",
  ...others
}) => {
  return (
    <StyledFlex p={2} {...others}>
      <Sans size={textSize} color={color("black60")} weight="regular">
        {children}
      </Sans>
    </StyledFlex>
  )
}
