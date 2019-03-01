import React from "react"
import { Icon, IconProps } from "./Icon"

/** ArrowDownIcon */
export const ArrowDownIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>reveal more</title>
    <path
      d="M9 12.88L2.06 5.94l.88-.88L9 11.12l6.06-6.06.88.88z"
      fill="#000"
      fillRule="evenodd"
    />
  </Icon>
)
