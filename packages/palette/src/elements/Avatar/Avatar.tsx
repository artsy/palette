import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import React, { useState } from "react"
import { splitBoxProps } from "../Box"
import { Flex, FlexProps } from "../Flex"
import { Image, ImageProps } from "../Image"
import { Text } from "../Text"

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
  color: "mono100",
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
export const Avatar: React.FC<React.PropsWithChildren<AvatarProps>> = ({
  src,
  initials,
  size = "md",
  lazyLoad = false,
  ...rest
}) => {
  const [mode, setMode] = useState<"OK" | "Error">("OK")

  const [boxProps, imageProps] = splitBoxProps(rest)

  const { diameter, variant } = TOKENS[size] ?? TOKENS.sm

  return (
    <Flex
      size={diameter}
      bg={TOKENS.bg}
      border={src ? "transparent" : "1px solid"}
      borderColor="mono15"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      flexShrink={0}
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

      {src && mode !== "Error" && (
        <Flex position="absolute" top={0} left={0} width="100%" height="100%">
          <Image
            src={src}
            width="100%"
            height="100%"
            lazyLoad={lazyLoad}
            alt={initials ?? ""}
            onError={() => {
              setMode("Error")
            }}
            {...imageProps}
          />
        </Flex>
      )}
    </Flex>
  )
}
