import React from "react"
import { color } from "../helpers"
import { G, Icon, IconProps, Path, Title } from "./Icon"

/** AppleIcon */
export const AppleIcon: React.SFC<IconProps> = ({
  title = "Apple Icon",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <G width="14" height="18" viewBox="0 0 14 18">
        <Path fill={color(props.fill!)}
              fill-rule="evenodd"
              d="M9.152 3.208c-.556.692-1.49 1.211-2.235 1.211-.084 0-.168-.01-.22-.021a1.528 1.528 0 01-.032-.303c0-.887.43-1.753.902-2.304C8.165 1.066 9.163.525 9.992.492c.02.098.031.217.031.336 0 .876-.367 1.752-.871 2.38zm-3.65 13.977c-.374.166-.728.323-1.21.323-1.028 0-1.742-.974-2.56-2.164C.777 13.938 0 11.764 0 9.708c0-3.31 2.089-5.063 4.146-5.063.6 0 1.149.227 1.637.429.39.161.742.307 1.05.307.267 0 .6-.136.988-.294.542-.22 1.191-.485 1.919-.485.462 0 2.151.043 3.264 1.687l-.04.028c-.274.186-1.734 1.18-1.734 3.218 0 2.52 2.13 3.418 2.204 3.44l-.013.04c-.07.224-.404 1.29-1.12 2.372-.704 1.039-1.449 2.099-2.561 2.099-.549 0-.898-.16-1.259-.324-.385-.176-.783-.358-1.449-.358-.67 0-1.112.196-1.53.381z" clipRule="evenodd"/>
      </G>
    </Icon>
  )
}
