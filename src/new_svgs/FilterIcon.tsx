import React from "react"
import { Icon, IconProps } from "./Icon"

/** FilterIcon */
export const FilterIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>filter</title>
      <path
        d="M10.006 11v-1h1v3h-1v-1H4v-1h6.006zm-2.01-4v1h-1V5h1v1H14v1H7.996zM6 6v1H4V6h2zm6 6v-1h2v1h-2z"
        fill="#000"
        fillRule="nonzero"
      />
    </Icon>
  )
}
