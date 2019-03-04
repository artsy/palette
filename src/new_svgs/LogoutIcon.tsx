import React from "react"
import { Icon, IconProps } from "./Icon"

/** LogoutIcon */
export const LogoutIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>Account logout</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="M7 2.813v1.062A5.502 5.502 0 0 0 9 14.5a5.5 5.5 0 0 0 2-10.625V2.813a6.5 6.5 0 1 1-4 0zM8.5 1h1v8.2h-1V1z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </Icon>
  )
}
