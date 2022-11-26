import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import React from "react"
import styled from "styled-components"
import { splitBoxProps } from "../Box"
import { Flex, FlexProps } from "../Flex"
import { Image, ImageProps } from "../Image"
import { Text } from "../Text"

/**
 * On Safari, border-radius with overflow hidden on an image causes a rendering issue
 * The image shows as a square at first, then the border-radius kicks in and it becomes a circle
 * This is a css hack that solves the issue
 * src: https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
 */
const Container = styled(Flex)`
  -webkit-mask-image: -webkit-radial-gradient(white, black);
`

export interface AvatarProps extends FlexProps, Partial<ImageProps> {
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: "xxs" | "xs" | "sm" | "md"
}

const LENGTHS = {
  xxs: 2,
  xs: 2,
  sm: 3,
  md: 4,
}

const TOKENS = {
  fontWeight: "normal",
  color: "black100",
  bg: "transparent",
  xxs: {
    diameter: 30,
    variant: "xs" as TextVariant,
  },
  xs: {
    diameter: 45,
    variant: "sm-display" as TextVariant,
  },
  sm: {
    diameter: 70,
    variant: "md" as TextVariant,
  },
  md: {
    diameter: 100,
    variant: "lg-display" as TextVariant,
  },
}

/** An circular Avatar component containing an image or initials */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials,
  size = "md",
  lazyLoad = false,
  ...rest
}) => {
  const [boxProps, imageProps] = splitBoxProps(rest)

  const { diameter, variant } = TOKENS[size] ?? TOKENS.sm

  return (
    <Container
      size={diameter}
      bg={TOKENS.bg}
      border={src ? "transparent" : "1px solid"}
      borderColor="black15"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      {...boxProps}
    >
      {initials && (
        <Text
          variant={variant}
          fontWeight={TOKENS.fontWeight}
          color={TOKENS.color}
          lineHeight={1}
        >
          {initials.slice(0, LENGTHS[size])}
        </Text>
      )}

      {src && (
        <Flex position="absolute" top={0} left={0} width="100%" height="100%">
          <Image
            src={src}
            width="100%"
            height="100%"
            lazyLoad={lazyLoad}
            alt={initials ?? ""}
            {...imageProps}
          />
        </Flex>
      )}
    </Container>
  )
}
