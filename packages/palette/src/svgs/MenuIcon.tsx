import React from "react"
import { color } from "../helpers"
import { G, Icon, IconProps, Path, Title } from "./Icon"

/** MenuIcon */
export const MenuIcon: React.FC<IconProps> = ({ title = "Menu", ...props }) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <G fill={color(props.fill!)} fillRule="evenodd">
        <Path d="M3 3h12.026v1H3zM3 8.512h12.026V9.5H3zM3 13.996h12.026V15H3z" />
      </G>
    </Icon>
  )
}
