import React from "react"
import { Icon, IconProps } from "./Icon"

/** MoreIcon */
export const MoreIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>view more</title>
    <g fill="#000" fillRule="nonzero">
      <path d="M4 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM14 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </g>
  </Icon>
)
