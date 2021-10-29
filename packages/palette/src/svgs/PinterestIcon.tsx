import React from "react"
import { Icon, IconProps } from "./Icon"

export const PinterestIcon: React.FC<IconProps> = ({
  title = "Pinterest",
  ...props
}) => {
  return (
    <Icon viewBox="0 0 480.666 480.666" {...props}>
      <title>{title}</title>
      <path d="M240.35.008C107.612.008 0 107.605 0 240.31c0 98.431 59.168 182.967 143.867 220.133-.717-16.795-.157-36.918 4.145-55.17 4.646-19.522 30.957-130.976 30.957-130.976s-7.669-15.345-7.669-38.009c0-35.623 20.637-62.215 46.323-62.215 21.885 0 32.421 16.429 32.421 36.076 0 21.962-13.996 54.85-21.198 85.283-6.016 25.5 12.781 46.301 37.907 46.301 45.545 0 76.221-58.506 76.221-127.781 0-52.66-35.478-92.087-100.006-92.087-72.916 0-118.305 54.359-118.305 115.077 0 20.949 6.142 35.702 15.837 47.127 4.428 5.268 5.051 7.388 3.43 13.405-1.154 4.427-3.773 15.072-4.895 19.28-1.592 6.096-6.516 8.262-12.033 6.033-33.573-13.733-49.192-50.471-49.192-91.814 0-68.279 57.578-150.125 171.736-150.125 91.773 0 152.189 66.377 152.189 137.654 0 94.277-52.434 164.723-129.713 164.723-25.937 0-50.346-14.045-58.701-29.975 0 0-13.965 55.389-16.894 66.065-5.113 18.517-15.089 37.058-24.193 51.491a240.3 240.3 0 0068.116 9.85c132.736 0 240.316-107.595 240.316-240.348 0-132.703-107.58-240.3-240.316-240.3z"></path>
    </Icon>
  )
}