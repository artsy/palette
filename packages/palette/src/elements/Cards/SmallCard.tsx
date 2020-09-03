import React from "react"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Image } from "../Image"
import { Spacer } from "../Spacer"
import { Sans } from "../Typography"
import { CardTag } from "./CardTag"
import { CardTagProps } from "./CardTag"

export interface SmallCardProps {
  images: string[]
  title: string
  subtitle?: string
  tag?: CardTagProps
}

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
}) => {
  return (
    <Box width="100%" position="relative">
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
            <Image src={images[0]} alt={title} height="100%" width="auto" />
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
                <Image src={images[1]} alt={title} height="100%" width="auto" />
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
                <Image src={images[2]} alt={title} height="100%" width="auto" />
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
      <Spacer mt={1} />
      <Sans size="3t" weight="medium">
        {title}
      </Sans>
      {!!subtitle && (
        <Sans size="3t" color="black60">
          {subtitle}
        </Sans>
      )}
      {!!tag && <CardTag {...tag} position="absolute" top={1} left={1} />}
    </Box>
  )
}
