import React from "react"
import { Icon, IconProps } from "./Icon"

/** CloseIcon */
export const CloseIcon: React.SFC<IconProps> = props => (
  <Icon {...props}>
    <title>close</title>
    <path
      d="M9.88 9l4.56 4.56-.88.88L9 9.88l-4.56 4.56-.88-.88L8.12 9 3.56 4.44l.88-.88L9 8.12l4.56-4.56.88.88z"
      fill="#000"
      fillRule="evenodd"
    />
  </Icon>
)
