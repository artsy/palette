import React from "react"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Image } from "../Image"
import { Sans } from "../Typography"
import { CardTag } from "./CardTag"
import { CardTagProps } from "./CardTag"

export interface MediumCardProps {
  image: string
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
}) => {
  return (
    <Box width="280px" height="370px" position="relative">
      <Flex
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        borderRadius="4px"
        overflow="hidden"
      >
        <Image src={image} alt={title} height="100%" width="auto" />
        <Box
          style={{
            background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,1))",
            opacity: 0.15,
          }}
          position="absolute"
          width="100%"
          height="100%"
        />
        <Box position="absolute" bottom="15px" left="15px">
          <Sans size="5t" weight="regular" color="white100">
            {title}
          </Sans>
          <Sans size="3t" weight="regular" color="white100">
            {subtitle}
          </Sans>
        </Box>
        {!!tag && (
          <CardTag {...tag} position="absolute" top="15px" left="15px" />
        )}
      </Flex>
    </Box>
  )
}
