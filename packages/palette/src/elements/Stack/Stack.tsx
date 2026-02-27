import styled from "styled-components"
import { Box, BoxProps } from "../Box"
import { ResponsiveValue } from "styled-system"

export type StackProps = BoxProps & {
  gap: ResponsiveValue<string | number>
}

/**
 * `Stack` is `Box` with` display: flex` and `flex-direction: column`.
 * `gap` is required
 */
export const Stack = styled(Box).attrs<StackProps>((props) => ({
  display: props.display ?? "flex",
  flexDirection: props.flexDirection ?? "column",
}))<StackProps>``

Stack.displayName = "Stack"
