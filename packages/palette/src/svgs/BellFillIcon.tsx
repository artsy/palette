import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** BellFillIcon */
export const BellFillIcon: React.FC<IconProps> = ({
  title = "Unwatch lot",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <Title>{title}</Title>
      <Path
        d="M14.591 12.229a8.82 8.82 0 0 1-1.653-4.979V5.938a3.938 3.938 0 1 0-7.876 0V7.25a8.82 8.82 0 0 1-1.653 4.979.446.446 0 0 0-.053.464c.074.15.227.245.394.245h2.949a2.336 2.336 0 0 0-.105.656 2.406 2.406 0 0 0 4.812 0 2.336 2.336 0 0 0-.105-.656h2.949c.167 0 .32-.095.394-.245a.446.446 0 0 0-.053-.464zm-4.06 1.365a1.531 1.531 0 1 1-3.062 0c.002-.228.056-.452.157-.656h2.748c.101.204.155.428.157.656z"
        fill={color(props.fill!)}
        fillRule="nonzero"
      />
    </Icon>
  )
}
