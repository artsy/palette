import React, { useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { CloseIcon } from "../../svgs/CloseIcon"
import { Clickable } from "../Clickable"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

export type BannerVariant = keyof typeof BANNER_VARIANTS

export interface BannerProps extends FlexProps {
  variant?: BannerVariant
  dismissable?: boolean
}

/** A banner */
export const Banner: React.FC<BannerProps> = ({
  dismissable = false,
  children,
  ...rest
}) => {
  const [dismissed, setDismissed] = useState(false)

  const handleClick = () => {
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <Container position="relative" py={1} px={4} {...rest}>
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

Banner.defaultProps = {
  variant: "defaultLight",
}

export const BANNER_VARIANTS = {
  defaultLight: {
    backgroundColor: "black10",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
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
  brand: {
    backgroundColor: "brand",
    color: "white100",
  },
}

const Container = styled(Flex)`
  ${variant({ variants: BANNER_VARIANTS })}
`
