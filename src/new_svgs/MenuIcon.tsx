import React from "react"
import { Icon, IconProps } from "./Icon"

/** MenuIcon */
export const MenuIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>menu</title>
    <g fill="#000" fillRule="evenodd">
      <path d="M3 3h12.026v1H3zM3 8.512h12.026V9.5H3zM3 13.996h12.026V15H3z" />
    </g>
  </Icon>
)
