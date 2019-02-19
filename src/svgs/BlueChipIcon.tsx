import React from "react"
import { Icon } from "./Icon"

/** Icon */
export const BlueChipIcon: React.SFC = props => {
  return (
    <Icon width="25" height="25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h25v25H0z" />
        <g transform="translate(6.25 6.25)" stroke="#000">
          <circle cx="6.25" cy="6.25" r="6.25" />
          <path d="M6.604 3.671a.5.5 0 0 0-.708 0L3.671 5.896a.5.5 0 0 0 0 .708l2.225 2.225a.5.5 0 0 0 .708 0l2.225-2.225a.5.5 0 0 0 0-.708L6.604 3.671z" />
        </g>
      </g>
    </Icon>
  )
}
