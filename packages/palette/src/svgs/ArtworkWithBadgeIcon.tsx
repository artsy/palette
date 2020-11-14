import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** ArtworkWithBadge */
export const ArtworkWithBadgeIcon: React.FC<IconProps> = ({
  title = "Risk-free sales",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 125 161">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill)}
        fillRule="evenodd"
        d="M59.277 3L32.961 38H10.527A3.526 3.526 0 007 41.526v103.948A3.526 3.526 0 0010.527 149H64.27a29.886 29.886 0 01-6.3-8.816H15.816V46.816h85.368V87.66a39.209 39.209 0 004.077 2.228c1.838.86 3.427 1.401 4.739 1.703V41.526A3.526 3.526 0 00106.474 38h-20.88L59.277 3zm0 13.312L43.808 36.886h30.939l-15.47-20.574z"
        clipRule="evenodd"
      />
      <Path
        fill={color(props.fill)}
        d="M105.226 116.383a3.5 3.5 0 10-4.95-4.95L86.699 125.01l-5.671-5.671a3.5 3.5 0 10-4.95 4.95l10.62 10.621 18.528-18.527z"
      />
      <Path
        fill={color(props.fill)}
        fillRule="evenodd"
        d="M91.669 155.431c.037-.015.074-.031.11-.048.967-.436 4.845-2.406 13.526-7.147 10.197-5.568 13.349-14.493 13.349-23.314v-22.816a3.5 3.5 0 00-4.074-3.452c-3.502.582-7.803-.518-12.076-2.518-4.165-1.95-7.819-4.527-9.864-6.264a3.508 3.508 0 00-4.625 0c-2.046 1.737-5.7 4.314-9.865 6.264-4.273 2-8.573 3.1-12.076 2.518A3.5 3.5 0 0062 102.106v22.816c0 8.821 3.153 17.746 13.35 23.314 8.678 4.74 12.556 6.71 13.524 7.147a3.51 3.51 0 002.795.048zm-1.342-58.47c-2.43 1.8-5.648 3.848-9.21 5.515-3.6 1.686-7.844 3.121-12.117 3.312v19.134c0 6.962 2.31 13.132 9.704 17.17 6.176 3.373 9.795 5.274 11.623 6.205 1.829-.932 5.448-2.832 11.623-6.204 7.395-4.038 9.704-10.209 9.704-17.171v-19.134c-4.273-.191-8.517-1.626-12.117-3.312-3.562-1.667-6.78-3.715-9.21-5.515z"
        clipRule="evenodd"
      />
    </Icon>
  )
}
