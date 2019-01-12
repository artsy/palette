import React from "react"
import { color } from "../helpers"
import { Color } from "../Theme"

interface IconProps {
  stroke: Color
}

/**
 * A Check
 */
export const CheckIcon: React.SFC<IconProps> = ({ stroke }) => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="none"
      stroke={color(stroke)}
      strokeWidth="2"
      d="M4 9.7L8.2 14 16 6"
    />
  </svg>
)

CheckIcon.defaultProps = {
  stroke: "black100",
}
