import React, { ImgHTMLAttributes } from "react"
import { color } from "../../../helpers"
import { styledWrapper } from "../../../platform/primitives"
import { SerifSize } from "../../../Theme"
import { Flex } from "../../layout"
import { Serif } from "../../Typography"

export interface SizeProps {
  [key: string]: {
    diameter: string
    typeSize: SerifSize
  }
}

export const Size: SizeProps = {
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

type SizeKey = "xs" | "sm" | "md"

export const sizeValue = size => {
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
        size={size}
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

export const InitialsHolder = styledWrapper(Flex)<{ size: SizeKey }>`
  background-color: ${color("black10")};
  border-radius: ${props => sizeValue(props.size).diameter};
  text-align: center;
  overflow: hidden;
`

InitialsHolder.displayName = "InitialsHolder"
