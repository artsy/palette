import styled from "styled-components"
import { Box, BoxProps } from "../Box"

/**
 * Flex is Box with display: flex
 */
export type FlexProps = BoxProps

/**
 * Flex is Box with display: flex
 */
export const Flex = styled(Box).attrs<FlexProps>((props) => ({
  display: props.display ?? "flex",
}))<FlexProps>``

Flex.displayName = "Flex"
