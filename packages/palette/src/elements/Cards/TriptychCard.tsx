import React from "react"
import { Image, ImageProps } from "../Image"
import { Box, BoxProps } from "../Box"
import { ResponsiveBox } from "../ResponsiveBox"
import { Flex } from "../Flex"
import { Text } from "../Text"

type Images = ImageProps[] | string[]

export interface TriptychCardProps extends BoxProps {
  /** 1, 2, or 3 images */
  images: Images
  title?: string | null
  subtitle?: string | null
  status?: string | null
}

export const isArrayOfStrings = (images: Images): images is string[] =>
  [...images].every((src) => typeof src === "string")

/**
 * `TriptychCard` is a card with a layout one square image on the left,
 * one tall or two square images on the right, and text for title and subtitle
 * at the bottom.
 */

export const TriptychCard: React.FC<TriptychCardProps> = ({
  images,
  title,
  subtitle,
  status,
  ...rest
}) => {
  const imgs: ImageProps[] = (isArrayOfStrings(images)
    ? images.map((src) => ({ src }))
    : images
  ).slice(0, 3)

  return (
    <Box {...rest}>
      <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%" mb={1}>
        <Flex flexDirection="row" width="100%" height="100%">
          {(() => {
            switch (imgs.length) {
              case 1:
                return (
                  <ResponsiveBox
                    aspectWidth={3}
                    aspectHeight={2}
                    maxWidth="100%"
                    bg="black10"
                    borderRight="1px solid"
                    borderColor="white100"
                  >
                    <Image
                      alt=""
                      height="100%"
                      width="100%"
                      style={{ objectFit: "cover" }}
                      {...imgs[0]}
                    />
                  </ResponsiveBox>
                )

              case 2:
                return (
                  <>
                    <ResponsiveBox
                      aspectWidth={1}
                      aspectHeight={1}
                      maxWidth="100%"
                      bg="black10"
                      borderRight="1px solid"
                      borderColor="white100"
                    >
                      <Image
                        alt=""
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover" }}
                        {...imgs[0]}
                      />
                    </ResponsiveBox>

                    <Flex width="33.33%" flexShrink={0}>
                      <ResponsiveBox
                        aspectWidth={1}
                        aspectHeight={2}
                        maxWidth="100%"
                        bg="black10"
                        borderLeft="1px solid"
                        borderColor="white100"
                      >
                        <Image
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ objectFit: "cover" }}
                          {...imgs[1]}
                        />
                      </ResponsiveBox>
                    </Flex>
                  </>
                )
              case 3:
                return (
                  <>
                    <ResponsiveBox
                      aspectWidth={1}
                      aspectHeight={1}
                      maxWidth="100%"
                      bg="black10"
                      borderRight="1px solid"
                      borderColor="white100"
                    >
                      <Image
                        alt=""
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover" }}
                        {...imgs[0]}
                      />
                    </ResponsiveBox>

                    <Flex width="33.33%" flexShrink={0} flexDirection="column">
                      <ResponsiveBox
                        aspectWidth={1}
                        aspectHeight={1}
                        maxWidth="100%"
                        bg="black10"
                        borderLeft="1px solid"
                        borderBottom="1px solid"
                        borderColor="white100"
                      >
                        <Image
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ objectFit: "cover" }}
                          {...imgs[1]}
                        />
                      </ResponsiveBox>

                      <ResponsiveBox
                        aspectWidth={1}
                        aspectHeight={1}
                        maxWidth="100%"
                        bg="black10"
                        borderLeft="1px solid"
                        borderTop="1px solid"
                        borderColor="white100"
                      >
                        <Image
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ objectFit: "cover" }}
                          {...imgs[2]}
                        />
                      </ResponsiveBox>
                    </Flex>
                  </>
                )
            }
          })()}
        </Flex>
      </ResponsiveBox>

      {status && <Text variant="xs">{status}</Text>}

      <Text variant="sm-display">{title}</Text>

      {subtitle && (
        <Text variant="sm-display" color="black60">
          {subtitle}
        </Text>
      )}
    </Box>
  )
}
