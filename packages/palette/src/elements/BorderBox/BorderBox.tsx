import styled from "styled-components"
import { Box, BoxProps } from "../Box"

export type BorderBoxProps = BoxProps

/**
 * A `div` that has a common border and padding set by default
 * @deprecated: Use `Box` along with props e.g. `border="1px solid" borderColor="mono10" p={2}`,
 * as needed.
 */
export const BorderBox = styled(Box).attrs<BorderBoxProps>((props) => ({
  borderColor: props.borderColor ?? "mono10",
  p: props.p ?? 2,
}))<BorderBoxProps>`
  border-width: 1px;
  border-style: solid;
`

BorderBox.displayName = "BorderBox"
