import { Text } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"

const VARIANTS = {
  defaultLight: {
    backgroundColor: "black10",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
  brand: {
    backgroundColor: "brand",
    color: "white100",
  },
}

export interface BadgeProps extends BoxProps {
  variant?: keyof typeof VARIANTS
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  return (
    <Container display="inline-block" px={0.5} {...rest}>
      <Text variant="xs">{children}</Text>
    </Container>
  )
}

Badge.defaultProps = {
  variant: "defaultDark",
}

const Container = styled(Box)`
  ${variant({ variants: VARIANTS })}
`
