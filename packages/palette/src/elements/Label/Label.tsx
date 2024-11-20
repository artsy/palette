import { Text } from "../Text"
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
