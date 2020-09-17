import React, { SFC } from "react"
import { color } from "../../helpers"
import { styledWrapper } from "../../platform/primitives"
import { Flex, FlexProps } from "../Flex"
import { Text, TextVariant } from "../Text"

/**
 * Spec: zpl.io/2Zg4Rdq
 */

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
  /**
   * Size of text to display in message window
   */
  variant?: TextVariant
}

const StyledFlex = styledWrapper(Flex)`
  background-color: ${color("black5")};
  border-radius: 2px;
`

/**
 * A generic message window for displaying ZerStates, notices, errors, etc.
 *
 * Spec: zpl.io/2Zg4Rdq
 */
export const Message: SFC<MessageProps> = ({
  children,
  variant = "text",
  ...others
}) => {
  return (
    <StyledFlex p={2} {...others}>
      <Text color={color("black60")} variant="text">
        {children}
      </Text>
    </StyledFlex>
  )
}
