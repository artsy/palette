import React from "react"
import { Icon, IconProps } from "./Icon"

/** EnterIcon */
export const EnterIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>select</title>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h18v18H0z" />
        <path
          d="M4.883 11.244l3.108 3.068-.693.688L3 10.758l4.299-4.23.692.689-3.106 3.056h9.134V3H15v8.244H4.883z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </Icon>
  )
}
