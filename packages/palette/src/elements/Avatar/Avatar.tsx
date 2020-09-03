import React, { ImgHTMLAttributes, useState } from "react"
import { borderRadius } from "styled-system"
import { color } from "../../helpers/color"
import { styledWrapper } from "../../platform/primitives"
import { SansSize } from "../../Theme"
import { Flex } from "../Flex"
import { LazyImage } from "../Image/LazyImage"
import { Sans } from "../Typography"

export interface SizeProps {
  [key: string]: {
    diameter: string
    typeSize: SansSize
  }
}

/** Size */
export const Size: SizeProps = {
  xxs: {
    diameter: "30px",
    typeSize: "3",
  },
  xs: {
    diameter: "45px",
    typeSize: "3",
  },
  sm: {
    diameter: "70px",
    typeSize: "6",
  },
  md: {
    diameter: "100px",
    typeSize: "8",
  },
}

type SizeKey = "xxs" | "xs" | "sm" | "md"

/** sizeValue */
export const sizeValue = (size: SizeKey) => {
  switch (size) {
    case "xxs":
      return Size.xxs
    case "xs":
      return Size.xs
    case "sm":
      return Size.sm
    case "md":
    default:
      return Size.md
  }
}

/** InitialsHolder */
export const InitialsHolder = styledWrapper(Flex)`
  background-color: ${color("black10")};
  text-align: center;
  overflow: hidden;
  ${borderRadius}
`

InitialsHolder.displayName = "InitialsHolder"

interface AvatarWebProps extends AvatarProps {
  renderFallback?: (props: { diameter: string }) => JSX.Element
  lazyLoad?: boolean
}

export interface AvatarProps extends ImgHTMLAttributes<any> {
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: SizeKey
}

interface BaseAvatarProps extends AvatarProps {
  renderAvatar: () => JSX.Element
}

/** An circular Avatar component containing an image or initials */
export const BaseAvatar = ({
  src,
  initials,
  size = "md",
  renderAvatar,
}: BaseAvatarProps): JSX.Element => {
  const { diameter, typeSize } = sizeValue(size)

  if (src) {
    return renderAvatar()
  } else if (initials) {
    // Left align for overflow
    const justifyContent = initials.length > 4 ? "left" : "center"

    return (
      <InitialsHolder
        width={diameter}
        height={diameter}
        justifyContent={justifyContent}
        alignItems="center"
        // NOTE: To make a circle in React Native:
        // you have to use a numeric value and can't use "50%"
        borderRadius={diameter}
      >
        <Sans
          size={typeSize}
          color="black60"
          weight="medium"
          lineHeight={parseInt(diameter, 10)}
        >
          {initials}
        </Sans>
      </InitialsHolder>
    )
  } else {
    return null
  }
}

/** An circular Avatar component containing an image or initials */
export const Avatar = ({
  src,
  initials,
  lazyLoad = false,
  size = "md",
  renderFallback,
  onError,
}: AvatarWebProps) => {
  const { diameter } = sizeValue(size)
  const [useFallback, setUseFallback] = useState(false)

  return (
    <BaseAvatar
      src={src}
      initials={initials}
      size={size}
      renderAvatar={() =>
        renderFallback && useFallback ? (
          renderFallback({ diameter })
        ) : (
          <LazyImage
            onError={e => {
              if (onError) {
                onError(e)
              }
              setUseFallback(true)
            }}
            preload={!lazyLoad}
            width={diameter}
            height={diameter}
            borderRadius={diameter}
            src={src}
          />
        )
      }
    />
  )
}
