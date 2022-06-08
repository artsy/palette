import { Text } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"

export const LABEL_VARIANTS = {
  light: {
    backgroundColor: "black10",
    color: "black100",
  },
  dark: {
    backgroundColor: "black100",
    color: "white100",
  },
  brand: {
    backgroundColor: "blue100",
    color: "white100",
  },
}

export type LabelVariant = keyof typeof LABEL_VARIANTS

export interface LabelProps extends BoxProps {
  variant?: LabelVariant
  children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <Container display="inline-flex" maxWidth="100%" {...rest}>
      <Text variant="xs" px={0.5} overflowEllipsis>
        {children}
      </Text>
    </Container>
  )
}

Label.defaultProps = {
  variant: "light",
}

const Container = styled(Box)`
  ${variant({ variants: LABEL_VARIANTS })}
`
