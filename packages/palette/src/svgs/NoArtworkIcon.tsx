import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** NoArtworkIcon */
export const NoArtworkIcon: React.FC<IconProps> = ({
  title = "No artwork image",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 28 28">
      <Title>{title}</Title>
      <Path
        d="M8.84795 7.39814L14.073 1.55566L19.1548 7.39814H19.4573L23.789 3.06059L24.8889 4.16054L21.6557 7.39814H23.3334V21.3981H7.67469L4.18857 24.889L3.08862 23.7891L5.47629 21.3981H4.6667V7.39814H8.84795ZM9.22814 19.8426H21.7778V8.9537H20.1023L18.5488 10.5093H20.2223V18.287H10.7816L9.22814 19.8426ZM8.58319 18.287L7.02974 19.8426H6.22226V8.9537H17.9039L16.3504 10.5093H7.77781V18.287H8.58319ZM12.335 16.7315H18.6667V12.0648H16.9954L12.335 16.7315ZM14.797 12.0648L10.1366 16.7315H9.33337V12.0648H14.797ZM17.0931 7.39814L14.0567 3.90728L10.9348 7.39814H17.0931Z"
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Icon>
  )
}
