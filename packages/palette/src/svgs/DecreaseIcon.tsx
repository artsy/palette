import React, { FC } from "react"
import { color } from "../helpers"
import { G, Icon, IconProps, Path, Title } from "./Icon"

export const DecreaseIcon: FC<IconProps> = ({
  title = "Decrease",
  ...props
}) => (
  <Icon {...props} viewBox="0 0 10 10">
    <Title>{title}</Title>
    <G transform="rotate(180, 5, 5)">
      <Path
        d="M0 4.92701L0.927644 5.83942L4.34137 2.31752V10H5.67718V2.31752L9.07236 5.83942L10 4.92701L5.00928 0L0 4.92701Z"
        fill={color(props.fill!)}
      />
    </G>
  </Icon>
)
