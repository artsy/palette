import { Color } from "@artsy/palette-tokens/dist/themes/v3"
import React from "react"
import { Box, BoxProps } from "../Box"

export interface ProgressBarProps extends BoxProps {
  percentComplete: number
  highlight?: Color
  showBackground?: boolean
  transition?: string
}

/** ProgressBar */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentComplete,
  highlight = "brand",
  showBackground = true,
  transition = "transform 1s ease",
  ...rest
}) => {
  return (
    <Box
      tabIndex={0}
      role="progressbar"
      aria-valuenow={percentComplete}
      aria-valuemin={0}
      aria-valuemax={100}
      height="2px"
      position="relative"
      overflow="hidden"
      mt={0.5}
      mb={1}
      bg={showBackground ? "black30" : "transparent"}
      {...rest}
    >
      <Box
        bg={highlight}
        width="100%"
        height="100%"
        style={{
          transition,
          transform: `translateX(-${100 - percentComplete}%)`,
          backfaceVisibility: "hidden",
        }}
      />
    </Box>
  )
}
