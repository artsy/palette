import styled from "styled-components"
import { Box, BoxProps } from "../Box"

/** FullBleedProps */
export type FullBleedProps = BoxProps & {
  /**
   * Whether to break out of the parent container. Defaults to `true`.
   *
   * Set to `false` for SSR / pre-measurement renders where the bleed offset
   * isn't known yet — keeping content aligned to the parent container avoids a
   * content shift once the client mounts and the bleed is enabled.
   */
  enabled?: boolean
}

/**
 * Utility to break out of parent containers
 */
export const FullBleed = styled(Box).attrs<FullBleedProps>((props) =>
  props.enabled === false
    ? {}
    : {
        position: props.position ?? "relative",
        left: props.left ?? "50%",
        right: props.right ?? "50%",
        width: props.width ?? "100vw",
        maxWidth: props.maxWidth ?? "100vw",
        marginLeft: props.marginLeft ?? "-50vw",
        marginRight: props.marginRight ?? "-50vw",
      }
).withConfig({
  // `enabled` is a config prop, not a style/DOM attribute — keep it off the
  // rendered element.
  shouldForwardProp: (prop) => prop !== "enabled",
})``
