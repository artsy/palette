import React from "react"
import { color } from "../helpers"
import { Color } from "../Theme"
import { Icon } from "./Icon"

interface IconProps {
  fill?: Color
  /** Apply additional styles to component */
  style?: object
  onClick?: (e: any) => void
}

/**
 * A Check
 */
export const CheckIcon: React.SFC<IconProps> = ({
  fill = "black100",
  style = {},
  onClick = (_e: any) => {
    /* */
  },
  ...props
}) => (
  <Icon
    onClick={e => onClick(e)}
    style={style}
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="none"
      stroke={color(fill as any)}
      strokeWidth="2"
      d="M4 9.7L8.2 14 16 6"
    />
  </Icon>
)
