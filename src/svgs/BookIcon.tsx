import React from "react"
import { Icon } from "./Icon"

/** Icon */
export const BookIcon: React.SFC = props => {
  return (
    <Icon width="25" height="25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h25v25H0z" />
        <g stroke="#000">
          <path d="M17.5 8.616v7.73L12.808 17.5H12.5V9.667l5-1.05zM7.5 8.616v7.73l4.692 1.154h.308V9.667l-5-1.05z" />
        </g>
      </g>
    </Icon>
  )
}
