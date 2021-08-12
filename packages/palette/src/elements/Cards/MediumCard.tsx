import React from "react"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Image, ImageProps } from "../Image"
import { Text } from "../Text"
import { CardTag } from "./CardTag"
import { CardTagProps } from "./CardTag"

export interface MediumCardProps extends BoxProps {
  image: string | ImageProps
  title: string
  subtitle?: string
  tag?: CardTagProps
}

/**
 * `MediumCard` is a card with one image one tall image, and text for title and subtitle
 * at the bottom.
 */
export const MediumCard: React.FC<MediumCardProps> = ({
  image,
  title,
  subtitle,
  tag,
  ...rest
}) => {
  return (
    <Box width="280px" height="370px" position="relative" {...rest}>
      <Flex
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        borderRadius="4px"
        overflow="hidden"
      >
        <Image
          {...(typeof image === "string" ? { src: image } : image)}
          alt={title}
          height="100%"
          width="auto"
        />

        <Box
          style={{
            background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,1))",
            opacity: 0.15,
          }}
          position="absolute"
          width="100%"
          height="100%"
        />

        <Box position="absolute" bottom={1.5} left={1.5}>
          <Text variant="subtitle" color="white100">
            {title}
          </Text>

          <Text variant="text" color="white100">
            {subtitle}
          </Text>
        </Box>

        {!!tag && <CardTag {...tag} position="absolute" top={1.5} left={1.5} />}
      </Flex>
    </Box>
  )
}
