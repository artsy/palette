import { scale } from "proportional-scale"
import React from "react"
import { Box, BoxProps } from "../Box"

/** ResponsiveBoxProps */
export type ResponsiveBoxProps = Omit<BoxProps, "maxWidth" | "maxHeight"> & {
  aspectWidth: number
  aspectHeight: number
  maxWidth: number
  maxHeight: number
}

/** ResponsiveBox */
export const ResponsiveBox: React.FC<ResponsiveBoxProps> = ({
  aspectWidth,
  aspectHeight,
  maxWidth,
  maxHeight,
  children,
  ...rest
}) => {
  const { width, paddingBottom } = scale({
    width: aspectWidth,
    height: aspectHeight,
    maxWidth,
    maxHeight,
  })

  return (
    <Box
      position="relative"
      width="100%"
      style={{ maxWidth: `${width}px` }}
      {...rest}
    >
      <Box
        position="relative"
        width="100%"
        height={0}
        overflow="hidden"
        paddingBottom={paddingBottom}
      />

      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        {children}
      </Box>
    </Box>
  )
}

ResponsiveBox.displayName = "ResponsiveBox"
