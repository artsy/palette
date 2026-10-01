import React from "react"
import { Color } from "../../themes/types"
import { Box, BoxProps } from "../Box"

export interface ProgressBarProps extends BoxProps {
  percentComplete: number
  highlight?: Color
  showBackground?: boolean
  transition?: string
  "aria-label"?: string
}

/** ProgressBar */
export const ProgressBar: React.FC<
  React.PropsWithChildren<ProgressBarProps>
> = ({
  percentComplete,
  highlight = "brand",
  showBackground = true,
  transition = "transform 1s ease",
  "aria-label": ariaLabel = "Progress",
  ...rest
}) => {
  return (
    <Box
      tabIndex={0}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={percentComplete}
      aria-valuemin={0}
      aria-valuemax={100}
      height="2px"
      position="relative"
      overflow="hidden"
      mt={0.5}
      mb={1}
      bg={showBackground ? "mono30" : "transparent"}
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
