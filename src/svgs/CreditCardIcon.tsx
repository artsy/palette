import React from "react"
import { Icon, IconProps } from "./Icon"

/** CreditCardIcon */
export const CreditCardIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props} viewBox="0 0 18 18">
      <title>credit card</title>
      <path
        d="M2 6h14V4H2v2zm0 1v7h14V7H2zm-.5-4h15a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5zM3 9h4v1H3V9z"
        fill="#000"
        fillRule="nonzero"
      />
    </Icon>
  )
}
