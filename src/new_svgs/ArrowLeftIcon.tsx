import React from "react"
import { Icon, IconProps } from "./Icon"

/** ArrowLeftIcon */
export const ArrowLeftIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>navigate left</title>
      <path
        d="M12.06 15.94L5.12 9l6.94-6.94.88.88L6.88 9l6.06 6.06z"
        fill="#000"
        fillRule="evenodd"
      />
    </Icon>
  )
}
