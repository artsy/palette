import React from "react"
import { Icon } from "./Icon"

interface IconProps {
  fill?: string
  selected?: boolean
}

/** Icon */
export const DownloadIcon: React.SFC<IconProps> = ({
  fill = "#000",
  ...props
}) => {
  return (
    <Icon
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Download</title>
      <g id="icon_download" fill="none" fillRule="evenodd">
        <path d="M0 0h18v18H0z" />
        <g fill={fill}>
          <path
            fillRule="nonzero"
            d="M9.25 11.84L5.63 8.22l.63-.64 2.54 2.55V3.1h.9v7.03l2.54-2.55.63.64z"
          />
          <path d="M3 10h1v4h10.02v-4h1v5H3z" />
        </g>
      </g>
    </Icon>
  )
}

DownloadIcon.displayName = "Download"
