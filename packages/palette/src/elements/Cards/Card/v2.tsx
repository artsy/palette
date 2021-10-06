import React from "react"
import { CardProps } from "./Card"
import { Box } from "../../Box"
import { Flex } from "../../Flex"
import { Image } from "../../Image"
import { Text } from "../../Text"
import { CardTag } from "../CardTag"
/**
 * `Card` is a card with one image one tall image, and text for title and subtitle
 * at the bottom.
 */
export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  status,
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
          alt=""
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

          {subtitle && (
            <Text variant="text" color="white100">
              {subtitle}
            </Text>
          )}
        </Box>

        {status && (
          <CardTag position="absolute" top={1.5} left={1.5}>
            {status}
          </CardTag>
        )}
      </Flex>
    </Box>
  )
}
