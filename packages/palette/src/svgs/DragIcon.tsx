import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** DragIcon */
export const DragIcon: React.FC<IconProps> = ({ title = "Drag", ...props }) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 4C7.55228 4 8 3.55228 8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3C6 3.55228 6.44772 4 7 4Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 8C7.55228 8 8 7.55228 8 7C8 6.44772 7.55228 6 7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 16C7.55228 16 8 15.5523 8 15C8 14.4477 7.55228 14 7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44772 16 7 16Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2C10.4477 2 10 2.44772 10 3C10 3.55228 10.4477 4 11 4Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 8C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6C10.4477 6 10 6.44772 10 7C10 7.55228 10.4477 8 11 8Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 12C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11C10 11.5523 10.4477 12 11 12Z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 16C11.5523 16 12 15.5523 12 15C12 14.4477 11.5523 14 11 14C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16Z"
      />
    </Icon>
  )
}
