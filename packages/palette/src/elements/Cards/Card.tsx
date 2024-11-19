import React from "react"
import { Image, ImageProps } from "../Image"
import { Box, BoxProps } from "../Box"
import { Text } from "../Text"
import { ResponsiveBox } from "../ResponsiveBox"
import { useTheme } from "../../Theme"

export interface CardProps extends BoxProps {
  image: string | ImageProps | null | undefined
  title?: string | null
  subtitle?: string | null
  status?: string | null
  aspectWidth?: number
  aspectHeight?: number
}

/**
 * `Card` is a card with one image one tall image, and text for title
 * and subtitle at the bottom.
 */
export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  image,
  title,
  subtitle,
  status,
  maxWidth = 280,
  aspectWidth = 280,
  aspectHeight = 370,
  ...rest
}) => {
  const { theme } = useTheme()

  const hasInfo = title || subtitle || status

  return (
    <Box maxWidth={maxWidth} {...rest}>
      <ResponsiveBox
        aspectWidth={aspectWidth}
        aspectHeight={aspectHeight}
        maxWidth="100%"
      >
        <Image
          alt=""
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
          {...(typeof image === "string" ? { src: image } : image)}
        />

        {hasInfo && (
          <Box
            position="absolute"
            width="100%"
            height="50%"
            bottom={0}
            left={0}
            background={theme.effects.overlayGradient}
          />
        )}

        <Box
          position="absolute"
          bottom={0}
          left={0}
          width="100%"
          p={2}
          style={{ textShadow: theme.effects.textShadow }}
        >
          {status && (
            <Text variant="xs" color="white100">
              {status}
            </Text>
          )}

          {title && (
            <Text variant="sm-display" color="white100">
              {title}
            </Text>
          )}

          {subtitle && (
            <Text variant="sm-display" color="black15">
              {subtitle}
            </Text>
          )}
        </Box>
      </ResponsiveBox>
    </Box>
  )
}
