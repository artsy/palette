import React from "react"
import { CardProps } from "./Card"
import { ResponsiveBox } from "../.."
import { TEXT_SHADOW } from "../../.."
import { Box } from "../../Box"
import { Image } from "../../Image"
import { Text } from "../../Text"

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
          background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))"
        />

        <Box
          position="absolute"
          bottom={0}
          left={0}
          width="100%"
          p={2}
          style={{ textShadow: TEXT_SHADOW }}
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
