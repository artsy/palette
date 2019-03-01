import React from "react"
import { Icon, IconProps } from "./Icon"

/** Power Icon */
export const PowerIcon: React.SFC<IconProps> = props => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="#000"
        fillRule="nonzero"
        d="M7 2.813v1.062A5.502 5.502 0 0 0 9 14.5a5.5 5.5 0 0 0 2-10.625V2.813a6.5 6.5 0 1 1-4 0zM8.5 1h1v8.2h-1V1z"
      />
    </Icon>
  )
}
