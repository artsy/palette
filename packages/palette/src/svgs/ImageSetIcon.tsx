import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

export const ImageSetIcon: React.FC<IconProps> = ({
  title = "Image Set",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 44 44">
      <Title>{title}</Title>
      <Path d="M32 44H0V12h32v32ZM2 42h28V14H2v28Z" fill={color(props.fill!)} />
      <Path d="M38 37h-2V8H7V6h31v31z" fill={color(props.fill!)} />
      <Path d="M44 31h-2V2H13V0h31v31z" fill={color(props.fill!)} />
    </Icon>
  )
}
