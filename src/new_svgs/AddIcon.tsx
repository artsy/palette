import React from "react"
import { Icon, IconProps } from "./Icon"

/** AddIcon */
export const AddIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>add</title>
    <path
      d="M15 9.5H9.514V15H8.476V9.5H3V8.48h5.476V3h1.038v5.48H15z"
      fill="#000"
      fillRule="evenodd"
    />
  </Icon>
)
