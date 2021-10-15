import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Clickable } from "../Clickable"
import { Text } from "../Text"

export type ToastVariant = keyof typeof TOAST_VARIANTS

export interface ToastProps extends BoxProps {
  action?: {
    label: string
    onClick(): void
  }
  description?: string
  message: string
  onClose?(): void
  variant?: ToastVariant
}

export const Toast: React.FC<ToastProps> = ({
  action,
  description,
  message,
  onClose,
  ...rest
}) => {
  return (
    <Container
      width="100%"
      px={2}
      py={1}
      bg="black100"
      color="white100"
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClose?.()
        }
      }}
      style={{ cursor: "pointer" }}
      {...rest}
    >
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text variant="md">{message}</Text>

        {action && (
          <Clickable
            onClick={action.onClick}
            textDecoration="underline"
            color="rgba(255, 255, 255, 0.9)"
          >
            <Text variant="xs">{action.label}</Text>
          </Clickable>
        )}
      </Flex>

      {description && <Text variant="xs">{description}</Text>}
    </Container>
  )
}

export const TOAST_VARIANTS = {
  message: {
    backgroundColor: "black100",
    color: "white100",
  },
  alert: {
    backgroundColor: "blue100",
    color: "white100",
  },
  success: {
    backgroundColor: "green100",
    color: "white100",
  },
  error: {
    backgroundColor: "red100",
    color: "white100",
  },
}

const Container = styled(Box)`
  ${variant({ variants: TOAST_VARIANTS })}
`
