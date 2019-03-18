import React, { ImgHTMLAttributes, SFC } from "react"
import { css } from "styled-components"
import { color } from "../../helpers/color"
import { styled as primitives, styledWrapper } from "../../platform/primitives"
import { SerifSize } from "../../Theme"
import { Flex } from "../Flex"
import { LazyImage } from "../LazyImage"
import { Serif } from "../Typography"

/**
 * Spec: TODO
 */

interface SizeProps {
  [key: string]: {
    diameter: string
    typeSize: SerifSize
  }
}

const Size: SizeProps = {
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

const sizeValue = size => {
  switch (size) {
    case "xs":
      return Size.xs
    case "sm":
      return Size.sm
    case "md":
    default:
      return Size.md
  }
}

export interface AvatarProps extends ImgHTMLAttributes<any> {
  /** If an image is missing, show initials instead */
  initials?: string
  lazyLoad?: boolean
  /** The size of the Avatar */
  size?: "xs" | "sm" | "md"
}

/** An circular Avatar component containing an image or initials */
export const Avatar: SFC<AvatarProps> = ({
  src,
  initials,
  lazyLoad = false,
  size = "md",
}) => {
  const { diameter, typeSize } = sizeValue(size)

  if (src) {
    return (
      <LazyImage
        preload={!lazyLoad}
        width={diameter}
        height={diameter}
        borderRadius={diameter}
        src={src}
      />
    )
  } else if (initials) {
    // Left align for overflow
    const justifyContent = initials.length > 4 ? "left" : "center"

    return (
      <InitialsHolder
        width={diameter}
        height={diameter}
        justifyContent={justifyContent}
        alignItems="center"
      >
        <Serif
          size={typeSize}
          color="black60"
          weight="semibold"
          lineHeight={parseInt(diameter, 10)}
        >
          {initials}
        </Serif>
      </InitialsHolder>
    )
  } else {
    return null
  }
}

const BaseAvatarStyles = css<AvatarProps>`
  width: ${props => sizeValue(props).diameter};
  height: ${props => sizeValue(props).diameter};
  border-radius: ${props => sizeValue(props).diameter};
`

/**
 * A circular avatar image component.
 */
export const AvatarImage = primitives.Image<AvatarProps>`
  ${BaseAvatarStyles}
`

const InitialsHolder = styledWrapper(Flex)<AvatarProps>`
  background-color: ${color("black10")};
  border-radius: ${props => sizeValue(props.size).diameter};
  text-align: center;
  overflow: hidden;
`

AvatarImage.displayName = "AvatarImage"
InitialsHolder.displayName = "InitialsHolder"
