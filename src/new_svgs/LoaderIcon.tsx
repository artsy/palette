import React from "react"
import { Icon, IconProps } from "./Icon"

/** LoaderIcon */
export const LoaderIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>Loading</title>
    <path fill="#000" d="M2 9.55v-1h14v1z" fillRule="nonzero" />
  </Icon>
)
