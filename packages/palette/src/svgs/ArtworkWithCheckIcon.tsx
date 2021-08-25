import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** ArtworkWithCheck */
export const ArtworkWithCheckIcon: React.FC<IconProps> = ({
  title = "Match and sell",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 125 161">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        d="M58.666 2.908l-26.316 35H9.915a3.526 3.526 0 00-3.526 3.527v103.947a3.526 3.526 0 003.526 3.526h50.691a37.635 37.635 0 01-6.767-8.816H15.205V46.724h85.368v40.377a37.445 37.445 0 018.816 5.006V41.435a3.527 3.527 0 00-3.527-3.527h-20.88l-26.316-35zm0 13.312l-15.47 20.574h30.94L58.665 16.22z"
        clipRule="evenodd"
      />
      <Path
        fill={color(props.fill!)}
        d="M101.337 116.116a3.5 3.5 0 10-4.95-4.95L82.81 124.743l-5.671-5.671a3.5 3.5 0 10-4.95 4.95l10.62 10.621 18.528-18.527z"
      />
      <Path
        fill={color(props.fill!)}
        fillRule="evenodd"
        d="M86.88 91.435c-16.644 0-30.107 13.605-30.107 30.351s13.463 30.351 30.107 30.351 30.107-13.605 30.107-30.351a30.48 30.48 0 00-8.812-21.456 29.986 29.986 0 00-21.295-8.895zm-.003 7.15c12.678 0 22.984 10.371 22.984 23.201s-10.306 23.201-22.984 23.201c-12.677 0-22.983-10.371-22.983-23.201S74.2 98.585 86.877 98.585z"
        clipRule="evenodd"
      />
    </Icon>
  )
}
