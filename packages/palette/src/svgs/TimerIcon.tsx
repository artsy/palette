import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** TimerIcon */
export const TimerIcon: React.FC<IconProps> = ({
  title = "Time remaining",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        d="M9.5 4V2H12V1H6v1h2.5v2a6.5 6.5 0 1 0 1 0zM9 16a5.5 5.5 0 1 1 5.5-5.5A5.51 5.51 0 0 1 9 16zm.5-5.71l2 2-.7.7-2.3-2.28V6.5h1v3.79z"
        fill={color(props.fill!)}
        fillRule="nonzero"
      />
    </Icon>
  )
}
