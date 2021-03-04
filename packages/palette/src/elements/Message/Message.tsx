import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { useThemeConfig } from "../../Theme"
import { Flex, FlexProps } from "../Flex"
import { Text, TextVariant } from "../Text"

const VARIANTS = {
  default: {
    backgroundColor: "black10",
    color: "black100",
  },
  info: {
    backgroundColor: "blue10",
    color: "blue100",
  },
  warning: {
    backgroundColor: "copper10",
    color: "copper100",
  },
  error: {
    backgroundColor: "red10",
    color: "red100",
  },
}

export interface MessageProps extends FlexProps {
  variant?: keyof typeof VARIANTS
  title?: string
  children?: React.ReactNode
}

const Container = styled(Flex)<MessageProps>`
  ${variant({ variants: VARIANTS })}
  flex-direction: column;
`

/** A generic message window for displaying ZerStates, notices, errors, etc. */
export const Message: React.FC<MessageProps> = ({
  children,
  title,
  ...rest
}) => {
  const size: TextVariant = useThemeConfig({ v2: "text", v3: "sm" })

  return (
    <Container p={2} {...rest}>
      <Text variant={size} color="currentColor">
        {title}
      </Text>

      <Text variant={size} color="black100">
        {children}
      </Text>
    </Container>
  )
}

Message.defaultProps = {
  variant: "default",
}
