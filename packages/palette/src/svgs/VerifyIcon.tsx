import React from "react"
import { Icon, IconProps, Path } from "./Icon"

/** VerifyIcon */
export const VerifyIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke="#1023D7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.983 12l2.009 2.017 4.025-4.034"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.958 4.042c.575-.492 1.517-.492 2.1 0l1.317 1.133c.25.217.717.392 1.05.392h1.417c.883 0 1.608.725 1.608 1.608v1.417c0 .325.175.8.392 1.05l1.133 1.316c.492.575.492 1.517 0 2.1l-1.133 1.317c-.217.25-.392.717-.392 1.05v1.417c0 .883-.725 1.608-1.608 1.608h-1.417c-.325 0-.8.175-1.05.392l-1.317 1.133c-.575.492-1.516.492-2.1 0l-1.316-1.133a1.847 1.847 0 00-1.05-.392H7.15a1.615 1.615 0 01-1.608-1.608v-1.425c0-.325-.175-.792-.384-1.042L4.033 13.05c-.483-.575-.483-1.508 0-2.083l1.125-1.325c.209-.25.384-.717.384-1.042V7.167c0-.884.725-1.609 1.608-1.609h1.442c.325 0 .8-.175 1.05-.391l1.316-1.125z"
      />
    </Icon>
  )
}
