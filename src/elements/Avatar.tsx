// @ts-ignore
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

/**
 * Spec: TODO
 */

const SIZE = { xs: "45px", sm: "70px", md: "100px" }

const sizeValue = ({ size = "" }) => {
  switch (size) {
    case "xs":
      return SIZE.xs
    case "sm":
      return SIZE.sm
    case "md":
    default:
      return SIZE.md
  }
}

export interface AvatarProps extends SpaceProps {
  /** The size of the Avatar */
  size?: "xs" | "sm" | "md"
}

/**
 * A circular avatar image component.
 */
export const Avatar = styled.img.attrs<AvatarProps>({})`
  width: ${props => sizeValue(props)};
  height: ${props => sizeValue(props)};
  border-radius: ${props => sizeValue(props)};
  ${space};
`
