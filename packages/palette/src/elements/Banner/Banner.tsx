import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import React, { useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { CloseIcon } from "../../svgs/CloseIcon"
import { useThemeConfig } from "../../Theme"
import { Clickable } from "../Clickable"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

export interface BannerProps extends FlexProps {
  variant?: keyof typeof VARIANTS
  dismissable?: boolean
}

/** A banner */
export const Banner: React.FC<BannerProps> = ({
  dismissable = false,
  children,
  ...rest
}) => {
  const size: TextVariant = useThemeConfig({ v2: "small", v3: "xs" })

  const [dismissed, setDismissed] = useState(false)

  const handleClick = () => {
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <Container p={1} {...rest}>
      <Text
        variant={size}
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
          pl={1}
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

const VARIANTS = {
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
  ${variant({ variants: VARIANTS })}
`
