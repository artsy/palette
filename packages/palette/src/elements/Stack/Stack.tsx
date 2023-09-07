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
export const Stack = styled(Box)<StackProps>``

Stack.defaultProps = {
  display: "flex",
  flexDirection: "column",
}

Stack.displayName = "Stack"
