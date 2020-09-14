import React from "react"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Image, WebImageProps } from "../Image"
import { Text } from "../Text"
import { CardTag } from "./CardTag"
import { CardTagProps } from "./CardTag"

type Images = string[] | WebImageProps[]

export interface SmallCardProps extends BoxProps {
  images: Images
  title: string
  subtitle?: string
  tag?: CardTagProps
}

const isArrayOfStrings = (images: Images): images is string[] =>
  [...images].every(src => typeof src === "string")

/**
 * `SmallCard` is a card with a layout one square image on the left,
 * one tall or two square images on the right, and text for title and subtitle
 * at the bottom.
 */
export const SmallCard: React.FC<SmallCardProps> = ({
  images,
  title,
  subtitle,
  tag,
  ...rest
}) => {
  const imageAttributes: WebImageProps[] = isArrayOfStrings(images)
    ? images.map(src => ({ src }))
    : images

  return (
    <Box width="100%" position="relative" {...rest}>
      <Box width="100%" height="0" pt="67%" position="relative">
        <Flex
          flexDirection="row"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          borderRadius="4px"
          overflow="hidden"
        >
          <Box backgroundColor="black10" width="67%" overflow="hidden" mr="1px">
            <Image
              alt={title}
              height="100%"
              width="auto"
              {...imageAttributes[0]}
            />
          </Box>

          <Flex width="33%" flexDirection="column">
            {images.length < 2 && (
              <Box
                backgroundColor="black10"
                height="100%"
                width="100%"
                ml="1px"
              />
            )}

            {!!images[1] && (
              <Box
                backgroundColor="black10"
                height={!!images[2] ? "50%" : "100%"}
                overflow="hidden"
                ml="1px"
                mb={!!images[2] ? "1px" : "0"}
              >
                <Image
                  alt={title}
                  height="100%"
                  width="auto"
                  {...imageAttributes[1]}
                />
              </Box>
            )}

            {!!images[2] && (
              <Box
                backgroundColor="black10"
                height="50%"
                overflow="hidden"
                ml="1px"
                mt="1px"
              >
                <Image
                  alt={title}
                  height="100%"
                  width="auto"
                  {...imageAttributes[2]}
                />
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>

      <Text mt={1} variant="mediumText">
        {title}
      </Text>

      {!!subtitle && (
        <Text variant="text" color="black60">
          {subtitle}
        </Text>
      )}

      {!!tag && <CardTag {...tag} position="absolute" top={1} left={1} />}
    </Box>
  )
}
