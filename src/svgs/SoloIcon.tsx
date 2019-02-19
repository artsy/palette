import React from "react"
import { Icon } from "./Icon"

/** Icon */
export const SoloIcon: React.SFC = props => {
  return (
    <Icon width="25" height="25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h25v25H0z" />
        <g transform="translate(7.294 4.941)" stroke="#000">
          <path d="M0 13.717V10.86a3 3 0 0 1 3-3h4.195a3 3 0 0 1 3 3v2.856" />
          <circle cx="5.053" cy="2.807" r="2.807" />
        </g>
      </g>
    </Icon>
  )
}
