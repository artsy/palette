import React from "react"
import { Icon } from "./Icon"

interface IconProps {
  fill?: string
}

/** Icon */
export const GenomeIcon: React.SFC<IconProps> = ({
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
      <title>Genome</title>
      <g id="icon_genome" fill="none" fillRule="evenodd">
        <path d="M0 0h18v18H0z" />
        <g fill={fill}>
          <path d="M7.975 11c-.053-.327.033-.66.257-1H9a2 2 0 1 0 0-4H6a2 2 0 0 0-.724 3.865 2.636 2.636 0 0 0-.116 1.016A3.001 3.001 0 0 1 6 5h3a3 3 0 1 1 0 6H7.975z" />
          <path d="M9.952 8c.046.418-.027.752-.22 1H9a2 2 0 1 0 0 4h3a2 2 0 0 0 .574-3.916c.092-.322.142-.668.142-.998A3.001 3.001 0 0 1 12 14H9a3 3 0 1 1 0-6h.952z" />
        </g>
      </g>
    </Icon>
  )
}

GenomeIcon.displayName = "Genome"
