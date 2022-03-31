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
    backgroundColor: "black10",
    color: "black100",
  },
  brand: {
    backgroundColor: "black10",
    color: "black100",
  },
}

export interface BadgeProps extends BoxProps {
  variant?: keyof typeof VARIANTS
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  return (
    <Container display="inline-flex" maxWidth="100%" {...rest}>
      <Text variant="xs" px={0.5} overflowEllipsis>
        {children}
      </Text>
    </Container>
  )
}

Badge.defaultProps = {
  variant: "defaultDark",
}

const Container = styled(Box)`
  ${variant({ variants: VARIANTS })}
`
