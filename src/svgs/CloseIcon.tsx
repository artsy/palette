import React from "react"
import { color } from "../helpers"
import { Color } from "../Theme"

interface IconProps {
  fill: Color
}

/**
 * A CloseIcon
 */
export const CloseIcon: React.SFC<IconProps> = ({ fill }) => (
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color(fill)}
      fillRule="nonzero"
      d="M5.03 5.904L.189.986 1.159 0 6 4.919 10.841 0l.97.986L6.97 5.904l5.03 5.11-.97.986L6 6.89.97 12 0 11.014l5.03-5.11z"
    />
  </svg>
)

CloseIcon.defaultProps = {
  fill: "black100",
}
