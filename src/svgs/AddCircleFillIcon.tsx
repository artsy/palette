import React from "react"
import { Icon, IconProps } from "./Icon"

/** AddCircleFillIcon */
export const AddCircleFillIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>unfollow</title>
      <path
        d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm.551 7.449H13V9.55H9.551V13H8.45V9.551H5V8.45h3.449V5H9.55v3.449z"
        fill="#000"
        fillRule="nonzero"
      />
    </Icon>
  )
}
