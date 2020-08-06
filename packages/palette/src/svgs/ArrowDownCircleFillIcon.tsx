import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** ArrowDownCircleFillIcon */
export const ArrowDownCircleFillIcon: React.SFC<IconProps> = ({
  title = "Down",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        d="M16 9.5C16 13.366 12.866 16.5 9 16.5C5.13401 16.5 2 13.366 2 9.5C2 5.63401 5.13401 2.5 9 2.5C12.866 2.5 16 5.63401 16 9.5Z"
        fill={color(props.fill)}
      />
      <Path d="M9 12.7L6 7.5H12L9 12.7Z" fill="white" />
    </Icon>
  )
}
