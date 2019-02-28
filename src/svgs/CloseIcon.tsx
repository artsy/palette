import React from "react"
import { color } from "../helpers"
import { Color } from "../Theme"
import { Icon, IconProps } from "./Icon"

interface CloseIconProps extends IconProps {
  fill: Color
}

/**
 * A CloseIcon
 */
export const CloseIcon: React.SFC<CloseIconProps> = ({ fill, ...props }) => (
  <Icon width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color(fill)}
      fillRule="nonzero"
      d="M5.03 5.9L.19 1 1.16 0 6 4.92 10.84 0l.97.99L6.97 5.9 12 11.01l-.97.99L6 6.89.97 12 0 11.01l5.03-5.1z"
      {...props}
    />
  </Icon>
)

CloseIcon.defaultProps = {
  fill: "black100",
}
