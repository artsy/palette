import React, { FC } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { SansSize } from "../../Theme"
import { Flex, FlexProps } from "../Flex"
import { Sans } from "../Typography"

/**
 * Spec: zpl.io/2Zg4Rdq
 */

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
  /**
   * Size of text to display in message window
   */
  textSize?: SansSize
}

const StyledFlex = styled(Flex)`
  background-color: ${color("black5")};
  border-radius: 2px;
`

/**
 * A generic message window for displaying ZerStates, notices, errors, etc.
 *
 * Spec: zpl.io/2Zg4Rdq
 */
export const Message: FC<MessageProps> = ({
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
