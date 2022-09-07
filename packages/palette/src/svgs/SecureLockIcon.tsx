import React from "react"
import { Icon, IconProps, Path } from "./Icon"

/** SecureLockIcon */
export const SecureLockIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.5 9.5V8c0-2.482.75-4.5 4.5-4.5s4.5 2.018 4.5 4.5v1.5M15.75 18.5h-7.5c-3 0-3.75-.75-3.75-3.75v-1.5c0-3 .75-3.75 3.75-3.75h7.5c3 0 3.75.75 3.75 3.75v1.5c0 3-.75 3.75-3.75 3.75z"
      />
      <Path
        fill="#1023D7"
        fillRule="evenodd"
        d="M11.95 11.5c-.992 0-1.75.751-1.75 1.733 0 .751.525 1.387 1.225 1.618V16.122c0 .347.233.578.583.578s.584-.231.584-.578V14.851a1.71 1.71 0 001.108-1.618c0-.982-.758-1.733-1.75-1.733zm0 1.156c.35 0 .583.23.583.577s-.233.578-.583.578-.583-.231-.583-.578c0-.346.291-.577.583-.577z"
        clipRule="evenodd"
      />
    </Icon>
  )
}
