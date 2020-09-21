import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** PendingCircleIcon */
export const PendingCircleIcon: React.SFC<IconProps> = ({
  title = "Pending",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        d="M7 14.5C10.866 14.5 14 11.366 14 7.5C14 3.63401 10.866 0.5 7 0.5C3.13401 0.5 0 3.63401 0 7.5C0 11.366 3.13401 14.5 7 14.5ZM6.75 4.5C6.75 4.08579 6.41421 3.75 6 3.75C5.58579 3.75 5.25 4.08579 5.25 4.5V8.25C5.25 8.55278 5.43205 8.82586 5.71154 8.94231L8.71154 10.1923C9.09389 10.3516 9.533 10.1708 9.69231 9.78846C9.85162 9.40611 9.67081 8.967 9.28846 8.80769L6.75 7.75V4.5Z"
        fill={color(props.fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}
