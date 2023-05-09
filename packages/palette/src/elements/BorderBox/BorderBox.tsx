import styled from "styled-components"
import { Box, BoxProps } from "../Box"

export type BorderBoxProps = BoxProps

/**
 * A `div` that has a common border and padding set by default
 * @deprecated: Use `Box` along with props e.g. `border="1px solid" borderColor="black10" p={2}`,
 * as needed.
 */
export const BorderBox = styled(Box)`
  border-width: 1px;
  border-style: solid;
`

BorderBox.displayName = "BorderBox"

BorderBox.defaultProps = {
  borderColor: "black10",
  p: 2,
}
