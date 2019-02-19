import React from "react"
import { Icon } from "./Icon"

/** Icon */
export const AuctionIcon: React.SFC = props => {
  return (
    <Icon width="25" height="25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#000" fill="none" fillRule="evenodd">
        <path d="M10.977 6.698l4.547 2.625-4.41 7.64-4.547-2.626zM13.385 13.243l4.546 2.625-.5.866-4.546-2.625z" />
      </g>
    </Icon>
  )
}
