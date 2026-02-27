import styled from "styled-components"
import { Box, BoxProps } from "../Box"

/** FullBleedProps */
export type FullBleedProps = BoxProps

/**
 * Utility to break out of parent containers
 */
export const FullBleed = styled(Box).attrs<FullBleedProps>((props) => ({
  position: props.position ?? "relative",
  left: props.left ?? "50%",
  right: props.right ?? "50%",
  width: props.width ?? "100vw",
  maxWidth: props.maxWidth ?? "100vw",
  marginLeft: props.marginLeft ?? "-50vw",
  marginRight: props.marginRight ?? "-50vw",
}))<FullBleedProps>``
