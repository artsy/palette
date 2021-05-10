import React from "react"
import { useThemeConfig } from "../../Theme"
import { splitBoxProps } from "../Box"
import { Flex, FlexProps } from "../Flex"
import { Image, WebImageProps } from "../Image"
import { Text } from "../Text"
import { V2_TOKENS, V3_TOKENS } from "./tokens"

export interface AvatarProps extends FlexProps, Partial<WebImageProps> {
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: "xxs" | "xs" | "sm" | "md"
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

  const tokens = useThemeConfig({
    v2: V2_TOKENS,
    v3: V3_TOKENS,
  })

  const { diameter, variant } = tokens[size]

  return (
    <Flex
      size={diameter}
      bg={tokens.bg}
      border={src ? "transparent" : "1px solid"}
      borderColor="black10"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      {...boxProps}
    >
      <Text
        variant={variant}
        fontWeight={tokens.fontWeight}
        color={tokens.color}
        lineHeight={1}
      >
        {initials}
      </Text>

      {src && (
        <Flex position="absolute" top={0} left={0}>
          <Image src={src} width="100%" height="100%" {...imageProps} />
        </Flex>
      )}
    </Flex>
  )
}
