import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** LightningBolt */
export const LightningBoltIcon: React.FC<IconProps> = ({
  title = "Speed and efficiency",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 125 161">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        d="M57.278 9.978a4 4 0 013.254 3.93v51.82h39.449a4 4 0 013.706 5.503l-32.503 80.18a4 4 0 01-7.707-1.503v-51.82H24.981a4 4 0 01-3.723-5.464l31.552-80.18a4 4 0 014.468-2.466zm-26.425 80.11h36.624a4 4 0 014 4v35.306l22.566-55.666h-37.51a4 4 0 01-4-4V34.997l-21.68 55.091z"
        clipRule="evenodd"
      />
    </Icon>
  )
}
