import React from "react"
import { ResponsiveBox } from "../../ResponsiveBox"
import { Box } from "../../Box"
import { Flex } from "../../Flex"
import { Image, ImageProps } from "../../Image"
import { Text } from "../../Text"
import { SmallCardProps, isArrayOfStrings } from "./SmallCard"

/**
 * `SmallCard` is a card with a layout one square image on the left,
 * one tall or two square images on the right, and text for title and subtitle
 * at the bottom.
 */
export const SmallCard: React.FC<SmallCardProps> = ({
  images,
  title,
  subtitle,
  status,
  ...rest
}) => {
  const imageAttributes: ImageProps[] = isArrayOfStrings(images)
    ? images.map((src) => ({ src }))
    : images

  return (
    <Box {...rest}>
      <ResponsiveBox aspectWidth={3} aspectHeight={2} maxWidth="100%" mb={1}>
        <Flex flexDirection="row" width="100%" height="100%">
          {(() => {
            switch (images.length) {
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
                      {...imageAttributes[0]}
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
                        {...imageAttributes[0]}
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
                          {...imageAttributes[1]}
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
                        {...imageAttributes[0]}
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
                          {...imageAttributes[1]}
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
                          {...imageAttributes[2]}
                        />
                      </ResponsiveBox>
                    </Flex>
                  </>
                )
            }
          })()}
        </Flex>
      </ResponsiveBox>

      {status && (
        <Text variant="xs" textTransform="uppercase">
          {status}
        </Text>
      )}

      <Text variant="md">{title}</Text>

      {subtitle && (
        <Text variant="md" color="black60">
          {subtitle}
        </Text>
      )}
    </Box>
  )
}
