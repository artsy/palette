import React, { useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Clickable } from "../Clickable"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

export type BannerVariant = keyof typeof BANNER_VARIANTS

export interface BannerProps extends FlexProps {
  variant?: BannerVariant
  dismissable?: boolean
  onClose?: () => void
}

/** A banner */
export const Banner: React.FC<React.PropsWithChildren<BannerProps>> = ({
  dismissable = false,
  variant = "defaultLight",
  onClose,
  children,
  ...rest
}) => {
  const [dismissed, setDismissed] = useState(false)

  const handleClick = () => {
    if (onClose) {
      onClose()
    }
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <Container position="relative" py={1} px={4} variant={variant} {...rest}>
      <Text
        variant="xs"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        flex={1}
      >
        {children}
      </Text>

      {dismissable && (
        <Clickable
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          p={1}
          display="flex"
          alignItems="center"
          color="currentColor"
          onClick={handleClick}
        >
          <CloseIcon style={{ fill: "currentcolor" }} />
        </Clickable>
      )}
    </Container>
  )
}

export const BANNER_VARIANTS = {
  defaultLight: {
    backgroundColor: "mono10",
    color: "mono100",
  },
  defaultDark: {
    backgroundColor: "mono100",
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
  brand: {
    backgroundColor: "brand",
    color: "mono0",
  },
}

const Container = styled(Flex)<{ variant: BannerVariant }>`
  ${variant({ variants: BANNER_VARIANTS })}
`
