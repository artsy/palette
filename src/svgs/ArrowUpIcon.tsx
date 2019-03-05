import React from "react"
import { Icon, IconProps } from "./Icon"

/** ArrowUpIcon */
export const ArrowUpIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <title>reveal less</title>
      <path
        d="M15.06 12.94L9 6.88l-6.06 6.06-.88-.88L9 5.12l6.94 6.94z"
        fill="#000"
        fillRule="evenodd"
      />
    </Icon>
  )
}
