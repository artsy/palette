import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** FairIcon */
export const FairIcon: React.FC<IconProps> = ({ title = "Fair", ...props }) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        d="M9.533 7.027H14V14h1v1H3v-1h1V7.027h4.467V1.376l4.266 2.29-3.2 1.55v1.811zM8 14v-3.08h2.074V14H13V8.027H5V14h3z"
        fill={color(props.fill!)}
        fillRule="nonzero"
      />
    </Icon>
  )
}
