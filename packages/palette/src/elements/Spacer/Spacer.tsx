import React from "react"
import { Box, BoxProps } from "../../elements/Box"

export type SpacerProps = {
  x?: BoxProps["ml"]
  y?: BoxProps["mt"]
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Used to inject space where it's needed.
 */
export const Spacer = ({ x, y, ...restProps }: SpacerProps) => {
  return <Box {...restProps} ml={x} mt={y} />
}

Spacer.displayName = "Spacer"
