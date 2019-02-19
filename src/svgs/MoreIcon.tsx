import React from "react"
import { Icon } from "./Icon"

interface MoreIconProps {
  fill?: string
}

/** Icon */
export const MoreIcon: React.SFC<MoreIconProps> = ({
  fill,
  ...props
}: MoreIconProps) => {
  return (
    <Icon
      width="18px"
      height="18px"
      viewBox="0 0 18 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>More</title>
      <g id="Symbols" fill="none" fill-rule="evenodd">
        <path fill="#FFF" opacity=".1" d="M0 0h18v18H0z" />
        <g transform="translate(3 8)" stroke={fill || "#000000"}>
          <circle cx="1" cy="1" r="1.5" />
          <circle cx="6" cy="1" r="1.5" />
          <circle cx="11" cy="1" r="1.5" />
        </g>
      </g>
    </Icon>
  )
}

MoreIcon.displayName = "More"
