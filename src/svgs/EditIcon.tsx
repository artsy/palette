import React from "react"
import { Icon } from "./Icon"

interface IconProps {
  fill?: string
}

/** Icon */
export const EditIcon: React.SFC<IconProps> = ({ fill = "#000", ...props }) => {
  return (
    <Icon
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Edit</title>
      <g id="icon_edit" fill="none" fill-rule="evenodd">
        <path d="M0 0h18v18H0z" />
        <g fill={fill}>
          <path d="M14.02 3.06l2.06 2.42-7.75 6.65H6.16V9.78l7.86-6.72zm-.04 1.23l-6.82 5.84v1.02l.98-.02 6.74-5.78-.9-1.06z" />
          <path d="M3 3h7v1H4v10h10v-4h1v5H3z" />
        </g>
      </g>
    </Icon>
  )
}

EditIcon.displayName = "Edit"
