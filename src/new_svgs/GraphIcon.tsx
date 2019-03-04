import React from "react"
import { Icon, IconProps } from "./Icon"

/** GraphIcon */
export const GraphIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>View dashboard</title>
      <path
        d="M4 10h1v5H4v-5zm3-2h1v7H7V8zm3-3h1v10h-1V5zm3-2h1v12h-1V3z"
        fill="#000"
        fillRule="evenodd"
      />
    </Icon>
  )
}
