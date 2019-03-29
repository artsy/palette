import React, { FunctionComponent } from "react"
import { styled } from "../../platform/primitives"
import { AvatarProps, BaseAvatar, sizeValue } from "./Avatar.shared"

/** Avatar */
export const Avatar: FunctionComponent<AvatarProps> = ({ ...props }) => {
  return (
    <BaseAvatar renderAvatar={() => <AvatarImage {...props} />} {...props} />
  )
}

/**
 * A circular avatar image component.
 */
const AvatarImage = styled.Image<AvatarProps>`
  width: ${props => sizeValue(props).diameter};
  height: ${props => sizeValue(props).diameter};
  border-radius: ${props => sizeValue(props).diameter};
`
