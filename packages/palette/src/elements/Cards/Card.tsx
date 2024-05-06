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
}

/**
 * `Card` is a card with one image one tall image, and text for title
 * and subtitle at the bottom.
 */
export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  status,
  ...rest
}) => {
  const { theme } = useTheme()

  return (
    <Box maxWidth={280} {...rest}>
      <ResponsiveBox aspectWidth={280} aspectHeight={370} maxWidth="100%">
        <Image
          alt=""
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
          {...(typeof image === "string" ? { src: image } : image)}
        />

        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          background={theme.effects.overlayGradient}
        />

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

          <Text variant="sm-display" color="white100">
            {title}
          </Text>

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
