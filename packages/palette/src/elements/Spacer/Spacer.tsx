import React from "react"
import { Box, BoxProps } from "../../elements/Box"

/** Spacer implements Box */
export type SpacerProps = BoxProps & React.HTMLAttributes<HTMLDivElement>

/**
 * A component used to inject space where it's needed
 */
export const Spacer: React.FC<SpacerProps> = (props) => {
  return <Box {...props} />
}

Spacer.displayName = "Spacer"
