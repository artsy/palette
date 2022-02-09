import React from "react"
import { G, Icon, IconProps, Path, Title } from "./Icon"

/** GoogleIcon */
export const GoogleIcon: React.SFC<IconProps> = ({
  title = "Google Icon",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <G
        width="17"
        height="18"
        fill="none"
        viewBox="0 0 17 18"
      >
        <Path
          fill="#4285F4"
          fillRule="evenodd"
          d="M16.759 9.194a9.82 9.82 0 00-.156-1.75H8.551v3.308h4.601a3.933 3.933 0 01-1.706 2.58v2.146h2.763c1.617-1.489 2.55-3.68 2.55-6.284z"
          clipRule="evenodd"
        ></Path>
        <Path
          fill="#34A853"
          fillRule="evenodd"
          d="M8.55 17.55c2.31 0 4.245-.765 5.66-2.07l-2.764-2.146c-.765.513-1.745.816-2.895.816-2.227 0-4.112-1.504-4.784-3.525H.91v2.215a8.547 8.547 0 007.64 4.71z"
          clipRule="evenodd"
        ></Path>
        <Path
          fill="#FBBC05"
          fillRule="evenodd"
          d="M3.766 10.624a5.14 5.14 0 01-.268-1.625c0-.563.097-1.111.268-1.624V5.16H.909A8.547 8.547 0 000 9c0 1.38.33 2.685.91 3.84l2.856-2.216z"
          clipRule="evenodd"
        ></Path>
        <Path
          fill="#EA4335"
          fillRule="evenodd"
          d="M8.55 3.85c1.256 0 2.383.431 3.27 1.278l2.451-2.452C12.791 1.296 10.855.45 8.552.45A8.547 8.547 0 00.91 5.16l2.856 2.216C4.439 5.354 6.324 3.85 8.55 3.85z"
          clipRule="evenodd"
        ></Path>
      </G>
    </Icon>
  )
}
