import { paddingBottom, scale } from "proportional-scale"
import React from "react"
import { Box, BoxProps } from "../Box"

/** ResponsiveBoxMaxDimensions */
export type ResponsiveBoxMaxDimensions =
  | {
      maxWidth: number
      maxHeight: number
    }
  | { maxWidth: number }
  | { maxHeight: number }
  | { maxWidth: "100%" }

export interface ResponsiveBoxAspectDimensions {
  aspectWidth: number
  aspectHeight: number
}

const responsiveScale = (
  args: ResponsiveBoxAspectDimensions & ResponsiveBoxMaxDimensions
) => {
  if ("maxWidth" in args && args.maxWidth === "100%") {
    return {
      maxWidth: "100%",
      paddingBottom: paddingBottom({
        width: args.aspectWidth,
        height: args.aspectHeight,
      }),
    }
  }

  const { aspectWidth: width, aspectHeight: height, ...rest } = args
  const scaled = scale({ width, height, ...rest })

  return {
    maxWidth: `${scaled.width}px`,
    paddingBottom: scaled.paddingBottom,
  }
}

/** ResponsiveBoxProps */
export type ResponsiveBoxProps = Omit<BoxProps, "maxWidth" | "maxHeight"> &
  ResponsiveBoxAspectDimensions &
  ResponsiveBoxMaxDimensions

/** ResponsiveBox */
export const ResponsiveBox: React.FC<ResponsiveBoxProps> = ({
  aspectWidth,
  aspectHeight,
  children,
  ...rest
}) => {
  const scaled = responsiveScale({ aspectHeight, aspectWidth, ...rest })

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      style={{
        aspectRatio: `${aspectWidth} / ${aspectHeight}`,
        maxWidth: scaled.maxWidth,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

ResponsiveBox.displayName = "ResponsiveBox"
