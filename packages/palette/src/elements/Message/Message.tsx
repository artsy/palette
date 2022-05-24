import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { useThemeConfig } from "../../Theme"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

export const MESSAGE_VARIANTS = {
  default: {
    backgroundColor: "black10",
    color: "black100",
  },
  info: {
    backgroundColor: "blue10",
    color: "blue100",
  },
  success: {
    backgroundColor: "green10",
    color: "green150",
  },
  alert: {
    backgroundColor: "orange10",
    color: "orange150",
  },
  warning: {
    backgroundColor: "yellow10",
    color: "yellow150",
  },
  error: {
    backgroundColor: "red10",
    color: "red100",
  },
}

export type MessageVariant = keyof typeof MESSAGE_VARIANTS

export interface MessageProps extends FlexProps {
  children?: React.ReactNode
  title?: string
  variant?: MessageVariant
}

const Container = styled(Flex)<MessageProps>`
  ${variant({ variants: MESSAGE_VARIANTS })}
  flex-direction: column;
`

/**
 * `Message` is used for in-line communication. These should fill the allotted
 * container or space they are placed and key for temporal messages and
 * comments within flows. Additionally, they can be used to highlight particular
 * messaging within a specific section of a page or screen.
 */
export const Message: React.FC<MessageProps> = ({
  children,
  title,
  variant,
  ...rest
}) => {
  const size: TextVariant = useThemeConfig({ v2: "text", v3: "sm-display" })
  const color = variant === "default" ? "black60" : "black100"

  return (
    <Container p={2} variant={variant} {...rest}>
      <Text variant={size} color="currentColor">
        {title}
      </Text>

      <Text variant={size} color={color}>
        {children}
      </Text>
    </Container>
  )
}

Message.defaultProps = {
  variant: "default",
}
