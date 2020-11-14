import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** UserWithChart */
export const UserWithChartIcon: React.FC<IconProps> = ({
  title = "Insights-driven matching",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 156 161">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill)}
        fillRule="evenodd"
        d="M41.121 18.803a26.716 26.716 0 1137.782 37.782 26.716 26.716 0 01-37.782-37.782zm32.4 5.383a19.105 19.105 0 10-27.018 27.018 19.105 19.105 0 0027.018-27.018z"
        clipRule="evenodd"
      />
      <Path
        fill={color(props.fill)}
        d="M105.681 109.703v-15a19.027 19.027 0 00-19.03-19.028H33.373a19.029 19.029 0 00-19.028 19.029v22.836a3.808 3.808 0 107.611-.188V94.704a11.417 11.417 0 0111.417-11.417h53.28a11.417 11.417 0 0111.417 11.417V109.9a3.809 3.809 0 007.611-.198h.001z"
      />
      <Path
        fill={color(props.fill)}
        d="M140.215 81.074a3.718 3.718 0 014.268 3.07l3.508 21.489a3.718 3.718 0 01-7.338 1.198l-2.146-13.142-29.73 39.195a3.72 3.72 0 01-5.275.664l-26.666-21.193-27.18 35.86a3.718 3.718 0 01-5.926-4.492l29.479-38.892a3.72 3.72 0 015.276-.665l26.666 21.194 26.862-35.413-12.088 1.973a3.717 3.717 0 11-1.198-7.339l21.488-3.507z"
      />
    </Icon>
  )
}
