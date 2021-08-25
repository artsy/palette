import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** WatchingIcon */
export const WatchingIcon: React.FC<IconProps> = ({
  title = "Watching",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 10 12">
      <Title>{title}</Title>
      <Path
        d="M1.337 11.896c.28 0 .424-.156.983-.682l2.417-2.32c.123-.113.188-.145.263-.145.075 0 .15.037.263.145l2.745 2.642c.215.204.381.36.655.36.338 0 .596-.204.596-.693V2.045c0-1.117-.553-1.68-1.665-1.68H2.406C1.299.364.74.927.74 2.044v9.158c0 .489.263.693.596.693z"
        fill={color(props.fill!)}
        fillRule="nonzero"
      />
    </Icon>
  )
}
