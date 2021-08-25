import React from "react"
import { color } from "../helpers"
import { G, Icon, IconProps, Path, Title } from "./Icon"

/** TriangleDownIcon */
export const TriangleDownIcon: React.FC<IconProps> = ({
  title = "Triangle Down",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <G width="11" height="6" viewBox="0 0 11 6" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.5 6L0 0L11 0L5.5 6Z"
          fill={color(props.fill!)}
        />
      </G>
    </Icon>
  )
}
