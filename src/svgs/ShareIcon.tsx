import React from "react"
import { Icon, IconProps } from "./Icon"

interface ShareIconProps extends IconProps {
  fill?: string
}

/** Icon */
export const ShareIcon: React.SFC<ShareIconProps> = ({ fill = "#000" }) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <title>Share</title>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M8.55 3.82L5.7 6.2a.25.25 0 0 1-.36-.04l-.3-.4a.25.25 0 0 1 .04-.34L8.66 2.3a.5.5 0 0 1 .67.01l.02.02 3.6 3.18a.25.25 0 0 1 .04.33l-.3.4a.25.25 0 0 1-.36.05l-2.8-2.35V8h3.97a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h4.05V3.82zm0 5.18H5v5h8V9H9.53v2.75a.25.25 0 0 1-.25.25H8.8a.25.25 0 0 1-.25-.25V9z"
      />
    </Icon>
  )
}

ShareIcon.displayName = "Share"
