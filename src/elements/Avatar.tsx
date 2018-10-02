import React, { ImgHTMLAttributes, SFC } from "react"
import { space, SpaceProps } from "styled-system"
import { color } from "../helpers/color"
import { styled as primitives, styledWrapper } from "../platform/primitives"
import { SerifSize } from "../Theme"
import { Flex } from "./Flex"
import { Serif } from "./Typography"

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

const sizeValue = ({ size = "" }) => {
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

export interface AvatarProps extends ImgHTMLAttributes<any>, SpaceProps {
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: "xs" | "sm" | "md"
}

/** An circular Avatar component containing an image or initials */
export const Avatar: SFC<AvatarProps> = ({ src, initials, size = "md" }) => {
  if (src) {
    return <AvatarImage size={size} src={src} />
  } else if (initials) {
    const { diameter, typeSize } = sizeValue({ size })

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

/**
 * A circular avatar image component.
 */
export const AvatarImage = primitives.Image<AvatarProps>`
  width: ${props => sizeValue(props).diameter};
  height: ${props => sizeValue(props).diameter};
  border-radius: ${props => sizeValue(props).diameter};
  ${space};
`

const InitialsHolder = styledWrapper(Flex)`
  background-color: ${color("black10")};
  border-radius: ${props => sizeValue(props).diameter};
  text-align: center;
  overflow: hidden;
`

AvatarImage.displayName = "AvatarImage"
InitialsHolder.displayName = "InitialsHolder"
