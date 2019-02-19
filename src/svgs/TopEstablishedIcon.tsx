import React from "react"
import { Icon } from "./Icon"

/** Icon */
export const TopEstablishedIcon: React.SFC = props => {
  return (
    <Icon width="25" height="25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle stroke="#000" cx="12.5" cy="12.5" r="6.25" />
        <path
          d="M10.3 10h4.399a.3.3 0 0 1 .3.3v4.846a.3.3 0 0 1-.451.259L12.65 14.3a.3.3 0 0 0-.302 0l-1.897 1.104a.3.3 0 0 1-.451-.26V10.3a.3.3 0 0 1 .3-.3zm.7 1v3.036l1.5-.941 1.499.94V11H11z"
          fill="#000"
        />
      </g>
    </Icon>
  )
}
