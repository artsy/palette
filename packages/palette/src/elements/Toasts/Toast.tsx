import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Clickable } from "../Clickable"
import { Text } from "../Text"

export type ToastVariant = keyof typeof TOAST_VARIANTS

export interface ToastProps extends BoxProps {
  id: string
  action?: {
    label: string
    onClick(): void
  }
  description?: string
  message: string
  onClose?(id: string): void
  variant?: ToastVariant
}

export const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({
  id,
  action,
  description,
  message,
  onClose,
  ...rest
}) => {
  const handleClick = () => {
    onClose?.(id)
  }

  return (
    <Container
      width="100%"
      px={2}
      py={1}
      bg="mono100"
      color="mono0"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClose?.(id)
        }
      }}
      style={{ cursor: "pointer" }}
      {...rest}
    >
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text variant="sm-display">{message}</Text>

        {action && (
          <Clickable onClick={action.onClick} textDecoration="underline">
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
    backgroundColor: "mono100",
    color: "mono0",
  },
  alert: {
    backgroundColor: "blue100",
    color: "mono0",
  },
  success: {
    backgroundColor: "green100",
    color: "mono0",
  },
  error: {
    backgroundColor: "red100",
    color: "mono0",
  },
}

const Container = styled(Box)`
  ${variant({ variants: TOAST_VARIANTS })}
  user-select: none;
`
