import { Text } from "../Text"
import * as React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"

export const LABEL_VARIANTS = {
  light: {
    backgroundColor: "mono10",
    color: "mono100",
  },
  dark: {
    backgroundColor: "mono100",
    color: "mono0",
  },
  brand: {
    backgroundColor: "blue100",
    color: "mono0",
  },
}

export type LabelVariant = keyof typeof LABEL_VARIANTS

export interface LabelProps extends BoxProps {
  variant?: LabelVariant
  children: React.ReactNode
}

export const Label: React.FC<React.PropsWithChildren<LabelProps>> = ({
  children,
  variant = "light",
  ...rest
}) => {
  return (
    <Container
      display="inline-flex"
      maxWidth="100%"
      variant={variant}
      {...rest}
    >
      <Text variant="xs" px={0.5} overflowEllipsis>
        {children}
      </Text>
    </Container>
  )
}

const Container = styled(Box)<{ variant: LabelVariant }>`
  ${variant({ variants: LABEL_VARIANTS })}
`
