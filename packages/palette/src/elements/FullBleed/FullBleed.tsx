import styled from "styled-components"
import { Box, BoxProps } from "../Box"

/** FullBleedProps */
export type FullBleedProps = BoxProps

/**
 * Utility to break out of parent containers
 */
export const FullBleed = styled(Box)``

FullBleed.defaultProps = {
  position: "relative",
  left: "50%",
  right: "50%",
  width: "100vw",
  maxWidth: "100vw",
  marginLeft: "-50vw",
  marginRight: "-50vw",
}
