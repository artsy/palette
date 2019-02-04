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
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill={fill || "none"}
        fillRule="evenodd"
      >
        <g id="icon_more">
          <g id="Group-13">
            <rect
              id="Rectangle"
              fill="#FFFFFF"
              opacity="0.100000001"
              x="0"
              y="0"
              width="18"
              height="18"
            />
            <g
              id="Group-14"
              transform="translate(3.000000, 8.000000)"
              stroke={fill || "#000000"}
            >
              <circle id="Oval" cx="1" cy="1" r="1.5" />
              <circle id="Oval" cx="6" cy="1" r="1.5" />
              <circle id="Oval" cx="11" cy="1" r="1.5" />
            </g>
          </g>
        </g>
      </g>
    </Icon>
  )
}

MoreIcon.displayName = "More"
